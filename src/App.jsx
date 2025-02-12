import { useRoutes } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { ThemeSettings } from './theme/Theme';
import RTL from './layouts/full/shared/customizer/RTL';
import ScrollToTop from './components/shared/ScrollToTop';
import Router from './routes/Router';
import { CssBaseline, ThemeProvider } from '@mui/material';
import { PermissionProvider } from './middlewares/PermissionProvider/PermissionProvider';

function App() {
  const routing = useRoutes(Router);
  const theme = ThemeSettings();
  const customizer = useSelector((state) => state.customizer);

  return (
    <ThemeProvider theme={theme}>
      <PermissionProvider>
        <RTL direction={customizer.activeDir}>
          <CssBaseline />
          <ScrollToTop>{routing}</ScrollToTop>
        </RTL>
      </PermissionProvider>
    </ThemeProvider>
  );
}

export default App;
