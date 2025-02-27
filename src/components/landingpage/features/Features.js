import ExpandLessIcon from '@mui/icons-material/ExpandLess';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import {
  Box,
  Collapse,
  Container,
  Grid,
  IconButton,
  List,
  ListItem,
  ListItemText,
  Typography,
} from '@mui/material';
import { useState } from 'react';
import FeaturesTitle from './FeaturesTitle';

const faqData1 = [
  {
    id: 1,
    question: 'How does PartyPass improve event entry?',
    answer: () => {
      return (
        <Typography>
          PartyPass replaces{' '}
          <Typography component="span" fontWeight="bold">
            manual ticketing with QR code-based entry,
          </Typography>{' '}
          reducing long lines and speeding up check-ins. It also{' '}
          <Typography component="span" fontWeight="bold">
            automates locker allocation,
          </Typography>{' '}
          eliminating the hassle of physical tokens.
        </Typography>
      );
    },
  },
  {
    id: 2,
    question: 'Can venue managers track ticket sales and check-ins in real time?',
    answer: () => {
      return (
        <Typography>
          Yes! PartyPass provides{' '}
          <Typography component="span" fontWeight="bold">
            a live dashboard
          </Typography>{' '}
          where venue managers can{' '}
          <Typography component="span" fontWeight="bold">
            monitor ticket sales, check-in status, and locker usage,
          </Typography>{' '}
          all in real time.
        </Typography>
      );
    },
  },
  {
    id: 3,
    question: 'Is PartyPass secure for payments and data?',
    answer: () => {
      return (
        <Typography>
          Absolutely. PartyPass uses{' '}
          <Typography component="span" fontWeight="bold">
            secure digital payments
          </Typography>{' '}
          and encrypts user data to{' '}
          <Typography component="span" fontWeight="bold">
            protect transactions and personal information.
          </Typography>
        </Typography>
      );
    },
  },
];

const faqData2 = [
  {
    id: 4,
    question: 'Can customers buy tickets in advance or for any date?',
    answer: () => {
      return (
        <Typography>
          Yes! Users can purchase tickets{' '}
          <Typography component="span" fontWeight="bold">
            in advance
          </Typography>{' '}
          and use them whenever they like, offering{' '}
          <Typography component="span" fontWeight="bold">
            flexibility without a fixed date requirement.
          </Typography>
        </Typography>
      );
    },
  },
  {
    id: 5,
    question: 'How does PartyPass help reduce staffing costs?',
    answer: () => {
      return (
        <Typography>
          By automating ticketing, check-ins, and locker assignments,{' '}
          <Typography component="span" fontWeight="bold">
            venues need fewer staff members
          </Typography>{' '}
          to manage the entry process, cutting operational costs.
        </Typography>
      );
    },
  },
  {
    id: 6,
    question: 'Is PartyPass only for clubs, or can other events use it?',
    answer: () => {
      return (
        <Typography>
          PartyPass is{' '}
          <Typography component="span" fontWeight="bold">
            scalable for any event-based venue,
          </Typography>{' '}
          including{' '}
          <Typography component="span" fontWeight="bold">
            concerts, festivals, and private parties,
          </Typography>{' '}
          making it a versatile solution for all event organizers.
        </Typography>
      );
    },
  },
];

const Features = () => {
  const [openId, setOpenId] = useState(null);

  const handleToggle = (id) => {
    setOpenId(openId === id ? null : id);
  };

  return (
    <Box py={6}>
      <Container maxWidth="lg">
        <FeaturesTitle />
        <Box mt={6}>
          <Grid container spacing={{ xs: 0, lg: 3 }}>
            {/* First Column */}
            <Grid item xs={12} lg={6}>
              <List>
                {faqData1.map((faq) => (
                  <Box
                    key={faq.id}
                    sx={{
                      mb: 2,
                      borderRadius: '12px',
                      overflow: 'hidden',
                      boxShadow: openId === faq.id ? '0 4px 10px rgba(0,0,0,0.1)' : 'none',
                      transition: '0.3s',
                    }}
                  >
                    {/* Question Section */}
                    <ListItem
                      button
                      onClick={() => handleToggle(faq.id)}
                      sx={{
                        backgroundColor: openId === faq.id ? '#F8FAFC' : '#fff',
                        padding: '16px',
                        borderRadius: '12px',
                        border: '1px solid #E2E8F0',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'space-between',
                        width: '100%',
                      }}
                    >
                      <Box
                        sx={{
                          display: 'flex',
                          alignItems: 'center',
                          gap: '10px',
                          width: '100%',
                        }}
                      >
                        <Typography
                          sx={{
                            width: '30px',
                            height: '30px',
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'center',
                            backgroundColor: openId === faq.id ? '#3B82F6' : '#E5E7EB',
                            color: openId === faq.id ? '#fff' : '#374151',
                            fontWeight: 'bold',
                            borderRadius: '50%',
                          }}
                        >
                          {faq.id < 10 ? `0${faq.id}` : faq.id}
                        </Typography>
                        <ListItemText
                          primary={faq.question}
                          sx={{ color: '#111827', fontWeight: 'bold', flex: 1 }}
                        />
                        <IconButton>
                          {openId === faq.id ? (
                            <ExpandLessIcon sx={{ color: '#3B82F6' }} />
                          ) : (
                            <ExpandMoreIcon sx={{ color: '#9CA3AF' }} />
                          )}
                        </IconButton>
                      </Box>
                    </ListItem>
                    {/* Answer Section (Collapsible) */}
                    <Collapse in={openId === faq.id} timeout="auto" unmountOnExit>
                      <Box
                        sx={{
                          padding: '16px',
                          backgroundColor: '#F8FAFC',
                          borderRadius: '0 0 12px 12px',
                          color: '#374151',
                          width: '100%',
                          border: '1px solid #E2E8F0',
                          borderTop: 'none',
                        }}
                      >
                        {typeof faq.answer === 'function' ? faq.answer() : faq.answer}
                      </Box>
                    </Collapse>
                  </Box>
                ))}
              </List>
            </Grid>
            {/* Second Column */}
            <Grid item xs={12} lg={6}>
              <List>
                {faqData2.map((faq) => (
                  <Box
                    key={faq.id}
                    sx={{
                      mb: 2,
                      borderRadius: '12px',
                      overflow: 'hidden',
                      boxShadow: openId === faq.id ? '0 4px 10px rgba(0,0,0,0.1)' : 'none',
                      transition: '0.3s',
                    }}
                  >
                    {/* Question Section */}
                    <ListItem
                      button
                      onClick={() => handleToggle(faq.id)}
                      sx={{
                        backgroundColor: openId === faq.id ? '#F8FAFC' : '#fff',
                        padding: '16px',
                        borderRadius: '12px',
                        border: '1px solid #E2E8F0',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'space-between',
                        width: '100%',
                      }}
                    >
                      <Box
                        sx={{
                          display: 'flex',
                          alignItems: 'center',
                          gap: '10px',
                          width: '100%',
                        }}
                      >
                        <Typography
                          sx={{
                            width: '30px',
                            height: '30px',
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'center',
                            backgroundColor: openId === faq.id ? '#3B82F6' : '#E5E7EB',
                            color: openId === faq.id ? '#fff' : '#374151',
                            fontWeight: 'bold',
                            borderRadius: '50%',
                          }}
                        >
                          {faq.id < 10 ? `0${faq.id}` : faq.id}
                        </Typography>
                        <ListItemText
                          primary={faq.question}
                          sx={{ color: '#111827', fontWeight: 'bold', flex: 1 }}
                        />
                        <IconButton>
                          {openId === faq.id ? (
                            <ExpandLessIcon sx={{ color: '#3B82F6' }} />
                          ) : (
                            <ExpandMoreIcon sx={{ color: '#9CA3AF' }} />
                          )}
                        </IconButton>
                      </Box>
                    </ListItem>
                    {/* Answer Section (Collapsible) */}
                    <Collapse in={openId === faq.id} timeout="auto" unmountOnExit>
                      <Box
                        sx={{
                          padding: '16px',
                          backgroundColor: '#F8FAFC',
                          borderRadius: '0 0 12px 12px',
                          color: '#374151',
                          width: '100%',
                          border: '1px solid #E2E8F0',
                          borderTop: 'none',
                        }}
                      >
                        {typeof faq.answer === 'function' ? faq.answer() : faq.answer}
                      </Box>
                    </Collapse>
                  </Box>
                ))}
              </List>
            </Grid>
          </Grid>
        </Box>
      </Container>
    </Box>
  );
};

export default Features;
