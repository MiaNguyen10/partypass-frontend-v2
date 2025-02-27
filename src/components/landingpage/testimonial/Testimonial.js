import { Box, Card, CardContent, Container, Rating, Stack, Typography } from '@mui/material';
import TestimonialTitle from './TestimonialTitle';

import verified_buyer_tick from 'src/assets/images/landingpage/verified_buyer.png';
import AnimationFadeIn from '../animation/Animation';
//Carousel slider for product
import Slider from 'react-slick';
import 'slick-carousel/slick/slick-theme.css';
import 'slick-carousel/slick/slick.css';
import './testimonial.css';
import { useSelector } from 'react-redux';

const SliderData = [
  {
    title: 'Mikko L.',
    subtitle: 'Features Club-Goer',
    subtext:
      'PartyPass makes my nights out so much easier! No more waiting in the cold, and I love that I can store my jacket hassle-free with automatic lockers. It’s a must-have for nightlife!',
  },
  {
    title: 'Sara V.',
    subtitle: 'Event Enthusiast',
    subtext:
      'I used to dread long lines at clubs, but with PartyPass, I just scan my phone and walk in. Super convenient and fast – I won’t go back to manual tickets!',
  },
  {
    title: 'Juha K.',
    subtitle: 'Club Owner at Musta Harka',
    subtext:
      'Managing club entry has never been this efficient. PartyPass helped us cut wait times by half and reduced staffing costs. Our guests love the seamless experience, and we love the real-time data tracking!',
  },
  {
    title: 'Mikko L.',
    subtitle: 'Features Club-Goer',
    subtext:
      'PartyPass makes my nights out so much easier! No more waiting in the cold, and I love that I can store my jacket hassle-free with automatic lockers. It’s a must-have for nightlife!',
  },
  {
    title: 'Sara V.',
    subtitle: 'Event Enthusiast',
    subtext:
      'I used to dread long lines at clubs, but with PartyPass, I just scan my phone and walk in. Super convenient and fast – I won’t go back to manual tickets!',
  },
  {
    title: 'Juha K.',
    subtitle: 'Club Owner at Musta Harka',
    subtext:
      'Managing club entry has never been this efficient. PartyPass helped us cut wait times by half and reduced staffing costs. Our guests love the seamless experience, and we love the real-time data tracking!',
  },
];

const Testimonial = () => {
  const customizer = useSelector((state) => state.customizer);
  const settings = {
    className: 'testimonial-slider',
    dots: true,
    arrows: false,
    infinite: true,
    speed: 500,
    slidesToShow: 3,
    slidesToScroll: 1,
    responsive: [
      {
        breakpoint: 1160,
        settings: {
          slidesToShow: 2,
        },
      },
      {
        breakpoint: 800,
        settings: {
          slidesToShow: 1,
        },
      },
    ],
  };

  return (
    <Box pt={14} pb={11}>
      <Container maxWidth="lg">
        <TestimonialTitle />
        <Box mt={5}>
          <AnimationFadeIn>
            <Slider {...settings}>
              {SliderData.map((slider, index) => (
                <Box p="10px" key={index}>
                  <Card
                    sx={{ p: 0, position: 'relative', width: '340px', height: '290px' }}
                    elevation={customizer.isCardShadow ? 9 : 0}
                    variant={!customizer.isCardShadow ? 'outlined' : undefined}
                  >
                    <CardContent>
                      <Stack direction="row">
                        <Box>
                          <Typography variant="h6">{slider.title}</Typography>
                          <Typography color="textSecondary" variant="subtitle1">
                            {slider.subtitle}
                          </Typography>
                        </Box>
                        <Box ml="auto" flexDirection="column" display="flex">
                          <Stack direction="row" alignItems="center" gap={1}>
                            <img
                              src={verified_buyer_tick}
                              alt="verified buyer"
                              style={{ width: '15px' }}
                            />
                            <Typography color="textSecondary" variant="subtitle1">
                              Verified Buyer
                            </Typography>
                          </Stack>
                          <Rating
                            size="small"
                            name="simple-controlled"
                            value={5}
                            readOnly
                            sx={{ marginLeft: '20px', marginTop: '5px' }}
                          />
                        </Box>
                      </Stack>
                      <Typography fontSize="15px" color="textSecondary" mt={3}>
                        {slider.subtext}
                      </Typography>
                    </CardContent>
                  </Card>
                </Box>
              ))}
            </Slider>
          </AnimationFadeIn>
        </Box>
      </Container>
    </Box>
  );
};

export default Testimonial;
