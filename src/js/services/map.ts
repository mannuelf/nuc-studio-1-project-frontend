import axios from 'axios';
import FactBookExplorerApi from './factbook-explorer-api';
import mapboxgl from 'mapbox-gl';
import {
  MAPBOX_TOKEN,
  MAPBOX_STYLE_URI,
  ENDPOINT_GEOCODING,
} from '../config/constants';
import {NORWAY} from '../config/countries';

export default function MapBoxService() {
  // Init MapBox Service.

  mapboxgl.accessToken = MAPBOX_TOKEN;

  const map = new mapboxgl.Map({
    container: 'map',
    style: MAPBOX_STYLE_URI,
    zoom: 0,
    center: [-70.50, 40.50]
  });

  // https://docs.mapbox.com/help/tutorials/choropleth-studio-gl-pt-2/
  // this code is code version of https://docs.mapbox.com/help/tutorials/choropleth-studio-gl-pt-1/
  map.on('load', () => {
    const defaultLocation = NORWAY;
    const searchForm = document.querySelector('#searchBar');
    
    const bboxCoordinates = (e: IbboxGps) => {
      searchForm.addEventListener('submit', async (e: any): Promise<IbboxGps> => {
        e.preventDefault();
        const [searchInput] = e.currentTarget;
        const userInput = searchInput.value.toLowerCase().replace('', '_');
        const response = await axios.get(`${ENDPOINT_GEOCODING}/${userInput}.json?limit=2&access_token=${MAPBOX_TOKEN}`); // api call to mapbox
        const [bboxCoordinates] = response.data.features; // get pgs coord out of api
        map.fitBounds(bboxCoordinates.bbox); // set the map with user searched locatio
        searchInput.value = ''; // clear the input text
        return bboxCoordinates.bbox;
      }
    }

    // make a pointer cursor
    map.getCanvas().style.cursor = 'default';

    const bboxGps = bboxCoordinates() ? bboxCoordinates : defaultLocation;

    // set map bounds to a continent
    map.fitBounds(bboxGps);

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
}
