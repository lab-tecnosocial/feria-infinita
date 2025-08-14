
import Box from '@mui/material/Box';
import Link from '@mui/material/Link';
import Typography from '@mui/material/Typography';
import Mapa from './Mapa';
import Proyecto from './Proyecto';
import { Routes, Route, useLocation } from 'react-router';
import Header from './Header';
export default function Inicio() {
  const location = useLocation();
  const isMapRoute = location.pathname === '/';

  return (
    <div style={{
      height: '100vh',
      display: 'flex',
      flexDirection: 'column'
    }}>
      <Header />
      <main style={{
        height: isMapRoute ? 'calc(100vh - 6vh - 80px)' : 'auto', // 6vh header + 80px footer
        minHeight: isMapRoute ? 'calc(100vh - 6vh - 80px)' : 'calc(100vh - 6vh - 80px)',
        position: 'relative',
        overflow: isMapRoute ? 'hidden' : 'auto'
      }}>
        <Routes>
          <Route path="/" element={<Mapa />} />
          <Route path="/proyecto" element={<Proyecto />} />
        </Routes>
      </main>
      <Box className='footer'>
        {/* Footer con los logos */}
        <footer style={{
          width: '100%',
          height: '80px',
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          gap: '2rem',
          padding: '1.5rem 0',
          background: 'rgba(255,255,255,0.9)',
          zIndex: 1000,
          borderTop: '1px solid rgba(0,0,0,0.1)'
        }}>
          <img src="/feria-infinita/logo_outro.png" alt="Logo Outro" style={{ height: '50px', objectFit: 'contain' }} />
          <img src="/feria-infinita/logo_lab.png" alt="Logo Lab" style={{ height: '50px', objectFit: 'contain' }} />
        </footer>
      </Box>
    </div>
  );
}


