import {
  Box,
  Button,
  FormControlLabel,
  IconButton,
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
  Tooltip,
  Typography,
} from '@mui/material';
import { alpha } from '@mui/material/styles';
import { visuallyHidden } from '@mui/utils';
import { IconFilePlus, IconSearch, IconTrash } from '@tabler/icons';
import PropTypes from 'prop-types';
import { useEffect, useState } from 'react';

// Replace these with your own components or MUI alternatives if needed.
import CustomCheckbox from '../forms/theme-elements/CustomCheckbox';
import CustomSwitch from '../forms/theme-elements/CustomSwitch';
import FormDialog from './FormDialog';

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
  const { onSelectAllClick, order, orderBy, numSelected, rowCount, onRequestSort, headCells } =
    props;
  const createSortHandler = (property) => (event) => {
    onRequestSort(event, property);
  };

  return (
    <TableHead>
      <TableRow>
        <TableCell padding="checkbox">
          <CustomCheckbox
            color="primary"
            checked={rowCount > 0 && numSelected === rowCount}
            onChange={onSelectAllClick}
            inputProps={{
              'aria-label': 'select all rows',
            }}
          />
        </TableCell>
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
  numSelected: PropTypes.number.isRequired,
  onRequestSort: PropTypes.func.isRequired,
  onSelectAllClick: PropTypes.func.isRequired,
  order: PropTypes.oneOf(['asc', 'desc']).isRequired,
  orderBy: PropTypes.string.isRequired,
  rowCount: PropTypes.number.isRequired,
};

/** EnhancedTableToolbar component **/
const EnhancedTableToolbar = (props) => {
  const {
    numSelected,
    searchTerm,
    handleSearch,
    searchPlaceholder,
    handleCreateBtn,
    handleDeleteBtn,
    AddBtnTitle,
  } = props;

  return (
    <Toolbar
      sx={{
        pl: { sm: 2 },
        pr: { xs: 1, sm: 1 },
        ...(numSelected > 0 && {
          bgcolor: (theme) =>
            alpha(theme.palette.primary.main, theme.palette.action.activatedOpacity),
        }),
      }}
    >
      {numSelected > 0 ? (
        <Typography sx={{ flex: '1 1 100%' }} color="inherit" variant="subtitle2" component="div">
          {numSelected} selected
        </Typography>
      ) : (
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
          <Stack direction="row" alignItems="center" spacing={1}>
            <Button
              variant="text"
              startIcon={<IconFilePlus size="1.8rem" />}
              onClick={handleCreateBtn}
            >
              {AddBtnTitle}
            </Button>
          </Stack>
        </Stack>
      )}

      {numSelected > 0 && (
        <Tooltip title="Delete">
          <IconButton onClick={handleDeleteBtn}>
            <IconTrash width="18" />
          </IconButton>
        </Tooltip>
      )}
    </Toolbar>
  );
};

EnhancedTableToolbar.propTypes = {
  numSelected: PropTypes.number.isRequired,
  searchTerm: PropTypes.string.isRequired,
  handleSearch: PropTypes.func.isRequired,
  searchPlaceholder: PropTypes.string,
  AddBtnTitle: PropTypes.string,
  handleCreateBtn: PropTypes.func,
  handleDeleteBtn: PropTypes.func,
};

/** The reusable EnhancedTable component **/
const EnhancedTable = ({
  headCells,
  rows,
  keyField = 'id',
  initialOrderBy,
  searchPredicate,
  searchPlaceholder,
  handleCreateBtn,
  keyDelete,
  AddBtnTitle,
}) => {
  // Sorting, pagination, selection, and density state
  const [order, setOrder] = useState('asc');
  const [orderBy, setOrderBy] = useState(
    initialOrderBy || (headCells.length > 0 ? headCells[0].id : ''),
  );
  const [selected, setSelected] = useState([]);
  const [page, setPage] = useState(0);
  const [dense, setDense] = useState(false);
  const [rowsPerPage, setRowsPerPage] = useState(5);
  const [searchTerm, setSearchTerm] = useState('');
  const [displayRows, setDisplayRows] = useState(rows);
  const [openDialog, setOpenDialog] = useState(false);

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

  // Handle select all checkbox
  const handleSelectAllClick = (event) => {
    if (event.target.checked) {
      const newSelecteds = displayRows.map((n) => n[keyField]);
      setSelected(newSelecteds);
      return;
    }
    setSelected([]);
  };

  // Handle clicking a single row for selection
  const handleClick = (event, id) => {
    const selectedIndex = selected.indexOf(id);
    let newSelected = [];

    if (selectedIndex === -1) {
      newSelected = newSelected.concat(selected, id);
    } else if (selectedIndex === 0) {
      newSelected = newSelected.concat(selected.slice(1));
    } else if (selectedIndex === selected.length - 1) {
      newSelected = newSelected.concat(selected.slice(0, -1));
    } else if (selectedIndex > 0) {
      newSelected = newSelected.concat(
        selected.slice(0, selectedIndex),
        selected.slice(selectedIndex + 1),
      );
    }
    setSelected(newSelected);
  };

  //handle open delete dialog
  const handleDeleteBtn = () => {
    setOpenDialog(true);
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

  const isSelected = (id) => selected.indexOf(id) !== -1;
  const emptyRows = page > 0 ? Math.max(0, (1 + page) * rowsPerPage - displayRows.length) : 0;

  return (
    <Box>
      <EnhancedTableToolbar
        numSelected={selected.length}
        searchTerm={searchTerm}
        handleSearch={handleSearch}
        searchPlaceholder={searchPlaceholder}
        handleCreateBtn={handleCreateBtn}
        handleDeleteBtn={handleDeleteBtn}
        AddBtnTitle={AddBtnTitle}
      />
      <Paper variant="outlined" sx={{ mx: 2, mt: 1 }}>
        <TableContainer>
          <Table sx={{ minWidth: 750 }} size={dense ? 'small' : 'medium'}>
            <EnhancedTableHead
              headCells={headCells}
              numSelected={selected.length}
              order={order}
              orderBy={orderBy}
              onSelectAllClick={handleSelectAllClick}
              onRequestSort={handleRequestSort}
              rowCount={displayRows.length}
            />
            <TableBody>
              {stableSort(displayRows, getComparator(order, orderBy))
                .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                .map((row, index) => {
                  const id = row[keyField];
                  const isItemSelected = isSelected(id);
                  const labelId = `enhanced-table-checkbox-${index}`;

                  return (
                    <TableRow
                      hover
                      onClick={(event) => handleClick(event, id)}
                      role="checkbox"
                      aria-checked={isItemSelected}
                      tabIndex={-1}
                      key={id}
                      selected={isItemSelected}
                    >
                      <TableCell padding="checkbox">
                        <CustomCheckbox
                          color="primary"
                          checked={isItemSelected}
                          inputProps={{
                            'aria-labelledby': labelId,
                          }}
                        />
                      </TableCell>
                      {headCells.map((headCell) => (
                        <TableCell key={headCell.id} align={headCell.numeric ? 'right' : 'left'}>
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
      <FormDialog
        openDialog={openDialog}
        setOpenDialog={setOpenDialog}
        selected={selected}
        keyDelete={keyDelete}
        setSelected={setSelected}
      />
    </Box>
  );
};

EnhancedTable.propTypes = {
  headCells: PropTypes.array.isRequired,
  rows: PropTypes.array.isRequired,
  keyField: PropTypes.string,
  initialOrderBy: PropTypes.string,
  searchPredicate: PropTypes.func,
  searchPlaceholder: PropTypes.string,
  handleCreateBtn: PropTypes.func,
  keyDelete: PropTypes.string.isRequired,
  AddBtnTitle: PropTypes.string,
};

export default EnhancedTable;
