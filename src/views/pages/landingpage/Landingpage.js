import PageContainer from 'src/components/container/PageContainer';

// components
import Banner from '../../../components/landingpage/banner/Banner';
import C2a2 from '../../../components/landingpage/c2a/C2a2';
import DemoSlider from '../../../components/landingpage/demo-slider/DemoSlider';
import Features from '../../../components/landingpage/features/Features';
import Frameworks from '../../../components/landingpage/frameworks/Frameworks';
import LpHeader from '../../../components/landingpage/header/Header';
import Testimonial from '../../../components/landingpage/testimonial/Testimonial';
import { Box } from '@mui/material';
import BenefitsForClubGoers from '../../../components/landingpage/benefits/BenefitsForClubGoers';
import BenefitsForVenues from '../../../components/landingpage/benefits/BenefitsForVenues';

const Landingpage = () => {
  return (
    <PageContainer title="Landing Page" description="This is Landing Page">
      <LpHeader /> {/* This is the header component */}
      <section id="about">
        <Banner /> {/* This is the about component */}
      </section>
      <section id="features">
        <DemoSlider /> {/* This is the feature component */}
      </section>
      <Box
        pb="140px"
        overflow="hidden"
        sx={{
          pt: {
            sm: '60px',
            lg: '0',
          },
        }}
      >
        <section id="club-goers">
          <BenefitsForClubGoers /> {/* This is the benefits for club goers component */}
        </section>
        <section id="venues">
          <BenefitsForVenues /> {/* This is the benefits for venues component */}
        </section>
      </Box>
      <Frameworks />
      <Testimonial />
      <section id="faq">
        <Features /> {/* This is the FAQ component */}
      </section>
      <C2a2 />
    </PageContainer>
  );
};

export default Landingpage;
