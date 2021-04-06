import * as L from 'leaflet/dist/leaflet-src.esm';
import mapboxgl from 'mapbox-gl/dist/mapbox-gl';
import { config, myToken } from './config';

mapboxgl.accessToken = myToken;

const map = new mapboxgl.Map({
  container: 'map',
  style: 'mapbox://styles/mapbox/streets-v11',
});

map.on('load', () => {
  // make a pointer cursor
  map.getCanvas().style.cursor = 'default';

  // set map bounds to the continental US
  map.fitBounds([
    [-133.2421875, 16.972741],
    [-47.63671875, 52.696361],
  ]);

  map.getCanvas().style.cursor = 'default';

  const layers = [
    '0-10',
    '10-20',
    '20-50',
    '50-100',
    '100-200',
    '200-500',
    '500-1000',
    '10000+',
  ];

  const colors = [
    '#FFEDA0',
    '#FED976',
    '#FEB24C',
    '#FD8D3C',
    '#FC4E2A',
    '#E31A1C',
    '#BD0026',
    '#800026',
  ];

  // add legend
  for (let i = 0; i < layers.length; i++) {
    const layer = layers[i];
    const color = colors[i];
    const item = document.createElement('div');
    const key = document.createElement('span');
    key.className = 'legend-key';
    key.style.backgroundColor = color;

    let value = document.createElement('span');
    value.innerHTML = layer;
    item.appendChild(key);
    item.appendChild(value);
    legend.appendChild(item);
  }

  // change info window on hover
  map.on('mousemove', (e) => {
    const states = map.queryRenderedFeatures(e.point, {
      layers: ['statedata'],
    });
    if (states.length > 0) {
      document.getElementById('pd').innerHTML =
        '<h3><strong>' +
        states[0].properties.name +
        '</strong></h3><p><strong><em>' +
        states[0].properties.density +
        '</strong> people per square mile</em></p>';
    } else {
      document.getElementById('pd').innerHTML = '<p>Hover over a state!</p>';
    }
  });
});
