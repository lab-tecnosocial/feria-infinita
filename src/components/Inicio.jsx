
import Box from '@mui/material/Box';
import Link from '@mui/material/Link';
import Typography from '@mui/material/Typography';
import Mapa from './Mapa';
import Proyecto from './Proyecto';
import { Routes, Route } from 'react-router';
import Header from './Header';
export default function Inicio() {
  return (
    <>
      <Header />
      <main>
        <Routes>
          <Route path="/" element={<Mapa />} />
          <Route path="/proyecto" element={<Proyecto />} />
        </Routes>
      </main>
      <Box className='footer'>
        <Typography variant="subtitle2" color="inherit" align="center" gutterBottom >

        </Typography>
      </Box>
    </>
  );
}


