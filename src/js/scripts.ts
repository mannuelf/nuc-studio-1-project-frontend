import mapboxgl from 'mapbox-gl';
import {
  MAPBOX_TOKEN,
  MAPBOX_STYLE_URI,
  ENDPOINT_GEOCODING,
} from './constants';
import { setNavBar } from './setNavBar';
import axios from 'axios';

window.addEventListener('DOMContentLoaded', () => {
  setNavBar();
});

mapboxgl.accessToken = MAPBOX_TOKEN;

const map = new mapboxgl.Map({
  container: 'map',
  style: MAPBOX_STYLE_URI,
});

// https://docs.mapbox.com/help/tutorials/choropleth-studio-gl-pt-2/
// this code is code version of https://docs.mapbox.com/help/tutorials/choropleth-studio-gl-pt-1/
map.on('load', () => {
  const defaultLocation = [-83.442922, 42.261212, -83.324045, 42.334184];

  const searchForm = document.querySelector('#searchBar');

  const bboxCoordinates = () => {
    searchForm.addEventListener('submit', async (e: any): Promise<any> => {
      e.preventDefault();
      const searchInput = e.currentTarget[0];
      const userInput = searchInput.value.toLowerCase().replace('', '_');
      const response = await axios.get(`${ENDPOINT_GEOCODING}/${userInput}.json?limit=2&access_token=${MAPBOX_TOKEN}`);
      const bboxCoordinates = response.data.features[0]
      // set the map with user searched location
      map.fitBounds(bboxCoordinates.bbox)
      return bboxCoordinates.bbox || false;
    }
  }

  // make a pointer cursor
  map.getCanvas().style.cursor = 'default';

  const setMapUserEntered = bboxCoordinates() ? bboxCoordinates : defaultLocation;
  
  // set map bounds to a continent
  map.fitBounds(setMapUserEntered);

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
  let legend = document.querySelector('#legend');

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

    if (features.length > 0) {
      document.getElementById(
        'ui-info-box'
      ).innerHTML = `<h3>${features[0].properties.name}</h3>
        <p><strong>${features[0].properties.density}</strong> people per square mile</p>`;
    } else {
      document.getElementById('ui-info-box').innerHTML =
        '<p>Hover over a state!</p>';
    }
  });
});
