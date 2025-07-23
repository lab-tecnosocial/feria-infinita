import { useState } from 'react';
import { useMap } from 'react-leaflet';
import { FormControl, Select, MenuItem, Box, Typography } from '@mui/material';
import L from 'leaflet';

const CITIES = {
  'Todas': { center: [-17.5, -68.5], zoom: 5 },
  'El Alto': { center: [-16.495, -68.169], zoom: 10 },
  'Cochabamba': { center: [-17.404, -66.153], zoom: 10 },
  'Arica': { center: [-18.460, -70.287], zoom: 10 }
};

export default function CitySelector() {
  const [selectedCity, setSelectedCity] = useState('Todas');
  const map = useMap();

  const handleCityChange = (event) => {
    const cityName = event.target.value;
    setSelectedCity(cityName);
    
    if (CITIES[cityName] && map) {
      const { center, zoom } = CITIES[cityName];
      
      // Use native flyTo with optimized settings for smooth animation
      map.flyTo(center, zoom, {
        duration: 1.5,           // Faster animation
        easeLinearity: 0.15,     // Smoother easing
        noMoveStart: true        // Prevents interruptions
      });
    }
  };

  return (
    <Box 
      className="city-selector-container"
      sx={{
        position: 'absolute',
        top: 20,
        right: 20,
        zIndex: 1000,
        backgroundColor: 'rgba(255, 255, 255, 0.95)',
        borderRadius: 2,
        padding: 2,
        boxShadow: '0 2px 10px rgba(0,0,0,0.1)',
        minWidth: 200
      }}
    >
      <Typography variant="subtitle2" sx={{ marginBottom: 1, color: '#512876', fontWeight: 'bold' }}>
        Seleccionar Ciudad
      </Typography>
      <FormControl fullWidth size="small">
        <Select
          value={selectedCity}
          onChange={handleCityChange}
          sx={{
            '& .MuiOutlinedInput-root': {
              '& fieldset': {
                borderColor: '#512876',
              },
              '&:hover fieldset': {
                borderColor: '#7ED321',
              },
              '&.Mui-focused fieldset': {
                borderColor: '#4A90E2',
              },
            },
          }}
        >
          <MenuItem value="Todas">🌍 Todas las ciudades</MenuItem>
          <MenuItem value="El Alto">🏔️ El Alto (La Paz)</MenuItem>
          <MenuItem value="Cochabamba">🌄 Cochabamba</MenuItem>
          <MenuItem value="Arica">🌊 Arica (Chile)</MenuItem>
        </Select>
      </FormControl>
    </Box>
  );
}