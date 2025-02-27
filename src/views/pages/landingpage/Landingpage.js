import PageContainer from 'src/components/container/PageContainer';


// components
import Banner from '../../../components/landingpage/banner/Banner';
import C2a2 from '../../../components/landingpage/c2a/C2a2';
import DemoSlider from '../../../components/landingpage/demo-slider/DemoSlider';
import Features from '../../../components/landingpage/features/Features';
import Frameworks from '../../../components/landingpage/frameworks/Frameworks';
import LpHeader from '../../../components/landingpage/header/Header';
import Testimonial from '../../../components/landingpage/testimonial/Testimonial';
import Benefits from '../../../components/landingpage/benefits/Benefits';


const Landingpage = () => {
  return (
    <PageContainer title="Landing Page" description="This is Landing Page">
      <LpHeader />
      <Banner />
      <DemoSlider />
      <Benefits />
      <Frameworks />
      <Testimonial /> 
      <Features />
      <C2a2 />
    </PageContainer>
  );
};

export default Landingpage;
