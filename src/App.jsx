import './App.css';
import Inicio from './components/Inicio';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import { BrowserRouter } from 'react-router';


function App() {
  const theme = createTheme({
    palette: {
      primary: {
        main: "#512876",
      },
      secondary: {
        main: "#f5f5f5",
      },
    },
    typography: {
      fontFamily: [
        'Montserrat',
        'sans-serif',
      ].join(','),
      fontSize: 16,
      h1: {
        fontFamily: 'Bungee, sans-serif',
      },
      h2: {
        fontFamily: 'Bungee, sans-serif',
      },
    }
  }
  );
  return (
    <ThemeProvider theme={theme}>
      <BrowserRouter basename={import.meta.env.BASE_URL}>
        <Inicio />
      </BrowserRouter>
    </ThemeProvider>
  );
}

export default App;
