import { useEffect } from 'react';
import { useMap } from 'react-leaflet';
import L from 'leaflet';
import '@elfalem/leaflet-curve';

const CITIES = {
  'El Alto': { center: [-16.495, -68.169], color: '#4A90E2' }, // Blue
  'Cochabamba': { center: [-17.404, -66.153], color: '#7ED321' }, // Green  
  'Arica': { center: [-18.460, -70.287], color: '#F5A623' } // Yellow
};

export default function SpiralLines() {
  const map = useMap();

  useEffect(() => {
    if (!map) return;

    const spiralLayers = [];

    // Create custom pane for spiral lines to ensure they stay visible
    if (!map.getPane('spiralPane')) {
      const spiralPane = map.createPane('spiralPane');
      spiralPane.style.zIndex = 400;
      spiralPane.style.pointerEvents = 'none';
    }

    // Create simple arcs between cities: El Alto → Cochabamba → Arica
    const connections = [
      { from: 'El Alto', to: 'Cochabamba', color: '#4A90E2' },
      { from: 'Cochabamba', to: 'Arica', color: '#7ED321' }
    ];

    connections.forEach((connection, index) => {
      const startPoint = CITIES[connection.from].center;
      const endPoint = CITIES[connection.to].center;

      // Calculate single control point for simple arc
      const midLat = (startPoint[0] + endPoint[0]) / 2;
      const midLng = (startPoint[1] + endPoint[1]) / 2;

      // Create perpendicular offset for arc
      const deltaLat = endPoint[0] - startPoint[0];
      const deltaLng = endPoint[1] - startPoint[1];

      // Perpendicular vector - flip direction based on arc index for spiral effect
      let perpLat, perpLng;
      if (index === 0) {
        // First arc (El Alto → Cochabamba): curve upward (north)
        perpLat = deltaLng * 0.3;
        perpLng = -deltaLat * 0.3;
      } else {
        // Second arc (Cochabamba → Arica): curve downward (south)
        perpLat = deltaLng * 0.3;
        perpLng = deltaLat * 0.3;
      }

      const controlPoint = [midLat + perpLat, midLng + perpLng];

      // Create simple arc using quadratic curve
      const arc = L.curve([
        'M', startPoint,
        'Q', controlPoint, endPoint
      ], {
        color: connection.color,
        weight: 4,
        opacity: 0.8,
        className: 'spiral-arc',
        // Fix zoom disappearing issue
        pane: 'spiralPane',
        interactive: false,
        // Ensure visibility across all zoom levels
        bubblingMouseEvents: false
      });

      spiralLayers.push(arc);
    });

    // Add arcs to map with staggered animation
    spiralLayers.forEach((layer, index) => {
      setTimeout(() => {
        layer.addTo(map);
      }, index * 800); // Delay between arcs
    });

    // Cleanup function
    return () => {
      spiralLayers.forEach(layer => {
        if (map.hasLayer(layer)) {
          map.removeLayer(layer);
        }
      });
    };
  }, [map]);

  return null;
}