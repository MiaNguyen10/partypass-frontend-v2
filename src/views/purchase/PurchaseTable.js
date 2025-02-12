import {
  Box,
  FormControlLabel,
  InputAdornment,
  Paper,
  Stack,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TablePagination,
  TableRow,
  TableSortLabel,
  TextField,
  Toolbar,
} from '@mui/material';
import { visuallyHidden } from '@mui/utils';
import { IconSearch } from '@tabler/icons';
import PropTypes from 'prop-types';
import { useEffect, useState } from 'react';
import CustomSwitch from '../../components/forms/theme-elements/CustomSwitch';

/** Helper functions for sorting **/
function descendingComparator(a, b, orderBy) {
  if (b[orderBy] < a[orderBy]) return -1;
  if (b[orderBy] > a[orderBy]) return 1;
  return 0;
}

function getComparator(order, orderBy) {
  return order === 'desc'
    ? (a, b) => descendingComparator(a, b, orderBy)
    : (a, b) => -descendingComparator(a, b, orderBy);
}

function stableSort(array, comparator) {
  const stabilizedThis = array.map((el, index) => [el, index]);
  stabilizedThis.sort((a, b) => {
    const order = comparator(a[0], b[0]);
    if (order !== 0) return order;
    return a[1] - b[1];
  });
  return stabilizedThis.map((el) => el[0]);
}

/** EnhancedTableHead component **/
const EnhancedTableHead = (props) => {
  const { order, orderBy, onRequestSort, headCells } = props;
  const createSortHandler = (property) => (event) => {
    onRequestSort(event, property);
  };

  return (
    <TableHead>
      <TableRow>
        {headCells.map((headCell) => (
          <TableCell
            key={headCell.id}
            align={headCell.numeric ? 'right' : 'left'}
            padding={headCell.disablePadding ? 'none' : 'normal'}
            sortDirection={orderBy === headCell.id ? order : false}
          >
            <TableSortLabel
              active={orderBy === headCell.id}
              direction={orderBy === headCell.id ? order : 'asc'}
              onClick={createSortHandler(headCell.id)}
            >
              {headCell.label}
              {orderBy === headCell.id ? (
                <Box component="span" sx={visuallyHidden}>
                  {order === 'desc' ? 'sorted descending' : 'sorted ascending'}
                </Box>
              ) : null}
            </TableSortLabel>
          </TableCell>
        ))}
      </TableRow>
    </TableHead>
  );
};

EnhancedTableHead.propTypes = {
  headCells: PropTypes.array.isRequired,
  onRequestSort: PropTypes.func.isRequired,
  order: PropTypes.oneOf(['asc', 'desc']).isRequired,
  orderBy: PropTypes.string.isRequired,
  rowCount: PropTypes.number.isRequired,
};

/** EnhancedTableToolbar component **/
const EnhancedTableToolbar = (props) => {
  const { searchTerm, handleSearch, searchPlaceholder } = props;

  return (
    <Toolbar
      sx={{
        pl: { sm: 2 },
        pr: { xs: 1, sm: 1 },
      }}
    >
      <Stack
        direction="row"
        justifyContent="space-between"
        alignItems="center"
        sx={{ width: '100%' }}
      >
        <TextField
          InputProps={{
            startAdornment: (
              <InputAdornment position="start">
                <IconSearch size="1.1rem" />
              </InputAdornment>
            ),
          }}
          placeholder={searchPlaceholder || 'Search'}
          size="small"
          onChange={handleSearch}
          value={searchTerm}
        />
      </Stack>
    </Toolbar>
  );
};

EnhancedTableToolbar.propTypes = {
  searchTerm: PropTypes.string.isRequired,
  handleSearch: PropTypes.func.isRequired,
  searchPlaceholder: PropTypes.string,
};

/** The reusable PurchaseTable component **/
const PurchaseTable = ({
  headCells,
  rows,
  keyField = 'id',
  initialOrderBy,
  searchPredicate,
  searchPlaceholder,
}) => {
  // Sorting, pagination, selection, and density state
  const [order, setOrder] = useState('asc');
  const [orderBy, setOrderBy] = useState(
    initialOrderBy || (headCells.length > 0 ? headCells[0].id : ''),
  );
  const [page, setPage] = useState(0);
  const [dense, setDense] = useState(false);
  const [rowsPerPage, setRowsPerPage] = useState(5);
  const [searchTerm, setSearchTerm] = useState('');
  const [displayRows, setDisplayRows] = useState(rows);

  // Update the displayed rows if the parent-provided rows change
  useEffect(() => {
    setDisplayRows(rows);
  }, [rows]);

  // Filter rows based on searchTerm using the provided predicate or a default filter
  const handleSearch = (event) => {
    const value = event.target.value;
    setSearchTerm(value);
    if (value === '') {
      setDisplayRows(rows);
    } else {
      const predicate =
        searchPredicate ||
        ((row, searchVal) =>
          Object.values(row)
            .filter((val) => typeof val === 'string')
            .some((val) => val.toLowerCase().includes(searchVal.toLowerCase())));
      const filtered = rows.filter((row) => predicate(row, value));
      setDisplayRows(filtered);
      setPage(0);
    }
  };

  // Sorting handler
  const handleRequestSort = (event, property) => {
    const isAsc = orderBy === property && order === 'asc';
    setOrder(isAsc ? 'desc' : 'asc');
    setOrderBy(property);
  };

  // Pagination handlers
  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };
  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  // Toggle dense padding
  const handleChangeDense = (event) => {
    setDense(event.target.checked);
  };

  const emptyRows = page > 0 ? Math.max(0, (1 + page) * rowsPerPage - displayRows.length) : 0;
  const compositeKey = (row) => `${row.user_name}-${row.purchase_date}`;

  return (
    <Box>
      <EnhancedTableToolbar
        searchTerm={searchTerm}
        handleSearch={handleSearch}
        searchPlaceholder={searchPlaceholder}
      />
      <Paper variant="outlined" sx={{ mx: 2, mt: 1 }}>
        <TableContainer>
          <Table sx={{ minWidth: 750 }} size={dense ? 'small' : 'medium'}>
            <EnhancedTableHead
              headCells={headCells}
              order={order}
              orderBy={orderBy}
              onRequestSort={handleRequestSort}
              rowCount={displayRows.length}
            />
            <TableBody>
              {stableSort(displayRows, getComparator(order, orderBy))
                .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                .map((row) => {
                  const id = row[keyField] || compositeKey(row); // Fallback to compositeKey if needed
                  return (
                    <TableRow hover role="checkbox" tabIndex={-1} key={id}>
                      {headCells.map((headCell, index) => (
                        <TableCell key={index} align={headCell.numeric ? 'right' : 'left'}>
                          {headCell.render ? headCell.render(row) : row[headCell.id]}
                        </TableCell>
                      ))}
                    </TableRow>
                  );
                })}
              {emptyRows > 0 && (
                <TableRow style={{ height: (dense ? 33 : 53) * emptyRows }}>
                  <TableCell colSpan={headCells.length + 1} />
                </TableRow>
              )}
            </TableBody>
          </Table>
        </TableContainer>
        <TablePagination
          rowsPerPageOptions={[5, 10, 25]}
          component="div"
          count={displayRows.length}
          rowsPerPage={rowsPerPage}
          page={page}
          onPageChange={handleChangePage}
          onRowsPerPageChange={handleChangeRowsPerPage}
        />
      </Paper>
      <Box ml={2}>
        <FormControlLabel
          control={<CustomSwitch checked={dense} onChange={handleChangeDense} />}
          label="Dense padding"
        />
      </Box>
    </Box>
  );
};

PurchaseTable.propTypes = {
  headCells: PropTypes.array.isRequired,
  rows: PropTypes.array.isRequired,
  keyField: PropTypes.string,
  initialOrderBy: PropTypes.string,
  searchPredicate: PropTypes.func,
  searchPlaceholder: PropTypes.string,
};

export default PurchaseTable;
