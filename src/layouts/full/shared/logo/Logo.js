import { styled } from '@mui/material';
import { useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import logo from 'src/assets/images/logos/partypass-logo.svg';

const Logo = () => {
  const customizer = useSelector((state) => state.customizer);
  const LinkStyled = styled(Link)(() => ({
    height: customizer.TopbarHeight,
    width: customizer.isCollapse ? '40px' : '180px',
    overflow: 'hidden',
    display: 'block',
  }));

  if (customizer.activeDir === 'ltr') {
    return (
      <LinkStyled
        to="/"
        style={{
          display: 'flex',
          alignItems: 'center',
        }}
      >
        {customizer.activeMode === 'dark' ? (
          <img
            src={logo}
            width={customizer.isCollapse ? '40px' : '180px'}
            height={customizer.TopbarHeight}
          />
        ) : (
          <img
            src={logo}
            width={customizer.isCollapse ? '40px' : '180px'}
            height={customizer.TopbarHeight}
          />
        )}
      </LinkStyled>
    );
  }
  return (
    <LinkStyled
      to="/"
      style={{
        display: 'flex',
        alignItems: 'center',
      }}
    >
      {customizer.activeMode === 'dark' ? (
        <img
          src={logo}
          width={customizer.isCollapse ? '40px' : '180px'}
          height={customizer.TopbarHeight}
        />
      ) : (
        <img
          src={logo}
          width={customizer.isCollapse ? '40px' : '180px'}
          height={customizer.TopbarHeight}
        />
      )}
    </LinkStyled>
  );
};

export default Logo;
