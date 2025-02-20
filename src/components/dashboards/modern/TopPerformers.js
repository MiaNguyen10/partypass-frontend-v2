import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Typography,
} from '@mui/material';
import { useSelector } from 'react-redux';
import { getAnalytics } from '../../../store/reducers/dashboard/dashboardSlice';
import DashboardCard from '../../shared/DashboardCard';

const TopPerformers = () => {
  // for select
  // const [month, setMonth] = React.useState('1');
  const analytics = useSelector(getAnalytics);

  // const handleChange = (event) => {
  //   setMonth(event.target.value);
  // };

  return (
    <DashboardCard
      title="Upcoming Events"
      // action={
      //   <CustomSelect
      //     labelId="month-dd"
      //     id="month-dd"
      //     size="small"
      //     value={month}
      //     onChange={handleChange}
      //   >
      //     <MenuItem value={1}>March 2022</MenuItem>
      //     <MenuItem value={2}>April 2022</MenuItem>
      //     <MenuItem value={3}>May 2022</MenuItem>
      //   </CustomSelect>
      // }
    >
      <TableContainer>
        <Table
          aria-label="simple table"
          sx={{
            whiteSpace: 'nowrap',
          }}
        >
          <TableHead>
            <TableRow>
              <TableCell>
                <Typography variant="subtitle2" fontWeight={600}>
                  Name
                </Typography>
              </TableCell>
              <TableCell>
                <Typography variant="subtitle2" fontWeight={600}>
                  Date
                </Typography>
              </TableCell>
              <TableCell>
                <Typography variant="subtitle2" fontWeight={600}>
                  Venue
                </Typography>
              </TableCell>
              <TableCell>
                <Typography variant="subtitle2" fontWeight={600}>
                  Ticket Price
                </Typography>
              </TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {analytics &&
              analytics.upcomingEvents &&
              analytics.upcomingEvents.map((event, index) => (
                <TableRow key={index}>
                  <TableCell>
                    <Typography variant="subtitle2" fontWeight={600}>
                      {event.eventName}
                    </Typography>
                  </TableCell>
                  <TableCell>
                    <Typography color="textSecondary" variant="subtitle2" fontWeight={400}>
                      {new Date(event.eventDate).toLocaleDateString()}
                    </Typography>
                  </TableCell>
                  <TableCell>
                    <Typography color="textSecondary" variant="subtitle2" fontWeight={400}>
                      {event.venue}
                    </Typography>
                  </TableCell>
                  <TableCell>
                    <Typography variant="subtitle2">${event.ticketPrice}</Typography>
                  </TableCell>
                </TableRow>
              ))}
          </TableBody>
        </Table>
      </TableContainer>
    </DashboardCard>
  );
};

export default TopPerformers;
