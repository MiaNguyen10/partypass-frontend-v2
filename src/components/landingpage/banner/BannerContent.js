import { Box, Button, Stack, styled, Typography, useMediaQuery } from '@mui/material';
import { NavLink } from 'react-router-dom';
// third party
import { motion } from 'framer-motion';
import figmaImg from 'src/assets/images/landingpage/ic_figma.png';
import jsImg from 'src/assets/images/landingpage/ic_js.png';
import reactImg from 'src/assets/images/landingpage/react.png';
import tsImg from 'src/assets/images/landingpage/ic_ts.png';
import muiImg from 'src/assets/images/landingpage/material-ui.png';

const StyledButton = styled(Button)(() => ({
  padding: '13px 48px',
  fontSize: '16px',
}));

const StyledButton2 = styled(Button)(() => ({
  padding: '13px 48px',
  fontSize: '16px',
  borderColor: 'black',
  borderWidth: '2px',
}));

const BannerContent = () => {
  const lgDown = useMediaQuery((theme) => theme.breakpoints.down('lg'));
  return (
    <Box mt={lgDown ? 8 : 0}>
      <motion.div
        initial={{ opacity: 0, translateY: 550 }}
        animate={{ opacity: 1, translateY: 0 }}
        transition={{
          type: 'spring',
          stiffness: 150,
          damping: 30,
        }}
      >
        <Typography
          variant="h1"
          fontWeight={900}
          sx={{
            fontSize: {
              md: '54px',
            },
            lineHeight: {
              md: '60px',
            },
          }}
        >
          Skip the Line,{' '}
        </Typography>
        <Typography
          variant="h1"
          fontWeight={900}
          sx={{
            fontSize: {
              md: '54px',
            },
            lineHeight: {
              md: '60px',
            },
          }}
        >
          Enjoy the Party -
        </Typography>
        <Typography
          variant="h1"
          fontWeight={900}
          sx={{
            fontSize: {
              md: '54px',
            },
            lineHeight: {
              md: '60px',
            },
          }}
        >
          With{' '}
          <Typography
            variant="h1"
            fontWeight={900}
            component="span"
            sx={{
              background: 'linear-gradient(90deg, #5766C7 0%, #AF068E 100%)',
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent',
              fontSize: {
                md: '54px',
              },
              lineHeight: {
                md: '60px',
              },
            }}
          >
            PartyPass!
          </Typography>
        </Typography>
      </motion.div>
      <Box pt={4} pb={3}>
        <motion.div
          initial={{ opacity: 0, translateY: 550 }}
          animate={{ opacity: 1, translateY: 0 }}
          transition={{
            type: 'spring',
            stiffness: 150,
            damping: 30,
            delay: 0.2,
          }}
        >
          <Typography variant="h5" fontWeight={300}>
            Modernize comes with light & dark color skins, well designed dashboards, applications
            and pages.
          </Typography>
        </motion.div>
      </Box>
      <motion.div
        initial={{ opacity: 0, translateY: 550 }}
        animate={{ opacity: 1, translateY: 0 }}
        transition={{
          type: 'spring',
          stiffness: 150,
          damping: 30,
          delay: 0.4,
        }}
      >
        <Stack direction={{ xs: 'column', sm: 'row' }} spacing={2} mt={3}>
          <StyledButton
            variant="contained"
            color="primary"
            to=""
            component={NavLink}
            sx={{ color: 'white', fontWeight: 700 }}
          >
            Join as a Venue
          </StyledButton>

          <StyledButton2
            variant="outlined"
            component={NavLink}
            to=""
            sx={{ color: 'black', fontWeight: 700 }}
          >
            Get the App
          </StyledButton2>
        </Stack>
      </motion.div>
      <motion.div
        initial={{ opacity: 0, translateY: 550 }}
        animate={{ opacity: 1, translateY: 0 }}
        transition={{
          type: 'spring',
          stiffness: 150,
          damping: 30,
          delay: 0.6,
        }}
      >
      <Stack direction="row" spacing={2} mt={3}>
        <img src={muiImg} alt="mui" style={{ width: '23px', height: '22px' }} />
        <img src={figmaImg} alt="figma" style={{ width: '23px', height: '22px' }} />
        <img src={reactImg} alt="react" style={{ width: '23px', height: '22px' }} />
        <img src={jsImg} alt="js" style={{ width: '23px', height: '22px' }} />
        <img src={tsImg} alt="ts" style={{ width: '23px', height: '22px' }} />
      </Stack>
      </motion.div>
    </Box>
  );
};

export default BannerContent;
