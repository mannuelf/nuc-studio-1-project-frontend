import * as L from 'leaflet/dist/leaflet-src.esm';
import mapboxgl from 'mapbox-gl';
import { config, styleUrl, myToken } from './config';

mapboxgl.accessToken = myToken;

const map = new mapboxgl.Map({
  container: 'map',
  style: styleUrl,
});

// wait for map to load before adjusting it
// https://docs.mapbox.com/help/tutorials/choropleth-studio-gl-pt-2/
map.on('load', function () {
  // make a pointer cursor
  map.getCanvas().style.cursor = 'default';

  // set map bounds to the continental US
  map.fitBounds([
    [-133.2421875, 16.972741],
    [-47.63671875, 52.696361],
  ]);

  // make a pointer cursor
  map.getCanvas().style.cursor = 'default';

  // define layer names
  const layers = [
    '0-10',
    '10-20',
    '20-50',
    '50-100',
    '100-200',
    '200-500',
    '500-1000',
    '1000+',
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

  // create legend
  for (let i = 0; i < layers.length; i++) {
    let layer = layers[i];
    let color = colors[i];
    let item = document.createElement('div');
    let key = document.createElement('span');
    key.className = 'legend-key';
    key.style.backgroundColor = color;

    let value = document.createElement('span');
    value.innerHTML = layer;
    item.appendChild(key);
    item.appendChild(value);
    legend.appendChild(item);
  }

  // change info window on hover
  map.on('mousemove', function (e) {
    const features = map.queryRenderedFeatures();
    console.log(typeof features, features);

    const displayProperties = [
      'type',
      'properties',
      'id',
      'layer',
      'source',
      'sourceLayer',
      'state',
    ];

    // https://docs.mapbox.com/mapbox-gl-js/example/queryrenderedfeatures/
    const displayFeatures = features.map((feat) => {
      let displayFeat = {};

      displayProperties.forEach((prop) => {
        displayFeat[prop] = feat[prop];
      });
      return displayFeat;
    });

    console.log(displayFeatures);

    if (features.length > 0) {
      document.getElementById('pd').innerHTML =
        '<h3><strong>' +
        features[0].properties.name +
        '</strong></h3><p><strong><em>' +
        features[0].properties.density +
        '</strong> people per square mile</em></p>';
    } else {
      document.getElementById('pd').innerHTML = '<p>Hover over a state!</p>';
    }
  });
});
