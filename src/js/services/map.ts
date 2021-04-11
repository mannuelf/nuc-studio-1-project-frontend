import axios from 'axios';
import mapboxgl from 'mapbox-gl';
import { getPopulationLevelsData, getGrossGdpData } from '../models/factbook-explorer-api';
import { NORWAY as polyShapeNorway } from '../config/countries';
import {
  MAPBOX_TOKEN,
  MAPBOX_STYLE_URI,
  ENDPOINT_GEOCODING,
} from '../config/constants';

export default async function MapBoxService() {
  /**
    * GET data from our API
    * **/
  const getPopulationLevels = await getPopulationLevelsData();
  const getGrossGdp = await getGrossGdpData();

  mapboxgl.accessToken = MAPBOX_TOKEN;

  const map = new mapboxgl.Map({
    container: 'map',
    style: MAPBOX_STYLE_URI,
    zoom: 0,
    center: [0.0, 0.0],
  });

  map.on('load', async () => {
    /* *
     * https://docs.mapbox.com/help/tutorials/choropleth-studio-gl-pt-1
     * https://docs.mapbox.com/help/tutorials/choropleth-studio-gl-pt-2
     *
     * This function does reverse geocoding on a string input. user searches
     * USE, Germany etc & the GEOCODING API will return an object that has
     * 4 GPS coordinates.
     *
     * The GPS coords are then passed to the map.fitBounds(bboxCoordinates.bbox)
     * function. The map will zoom to that location.
     *
     * by default the map loads up on NORWAY, this can be changed.
     * */

    // make a pointer cursor
    map.getCanvas().style.cursor = 'default';
    
    const defaultLocation = [
      4.40079698619525, 57.906609500058,
      31.2678854952283,71.2176742998415
    ]; // default location set to Norway, we should use GEOLOCATION API to automate this

    let bbox = [];
    const getBboxCoordinates = () => {
      const searchForm = document.querySelector('#searchBar');
      
      searchForm.addEventListener('submit', async (e: any): Promise<IbboxGps> => {
        e.preventDefault();
        const [searchInput] = e.currentTarget;
        const userInput = searchInput.value.toLowerCase().replace('', '_');
        
        const response = await axios.get(`
          ${ENDPOINT_GEOCODING}/${userInput}.json?limit=2&access_token=${MAPBOX_TOKEN}
        `); // api call to mapbox

        const [bboxCoordinates] = response.data.features; // get pgs coord out of api
      
        bbox = bboxCoordinates.bbox; // assign new coordinates into bbox
        map.fitBounds(bboxCoordinates.bbox); // set the map with user searched locatio
        searchInput.value = ''; // clear the input text
        return bboxCoordinates.bbox;
      }
    }

    bbox = getBboxCoordinates(); // call search form, on enter capture
    const bboxGps = bbox ? bbox : defaultLocation; // pass default GPS so map loads with something even if user has not searched.
    map.fitBounds(bboxGps);  // set map bounds to a continent

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

      /*
       * Renders the white box on top right of screen
       * */
      if (features.length > 0) {
        document.getElementById(
          'ui-info-box'
        ).innerHTML = `<h3>${features[0].properties.name}</h3>
        <p><strong>${features[0].properties.density}</strong> people per square mile</p>`;
      } else {
        document.getElementById('ui-info-box').innerHTML =
          '<p>Hover over a state!</p>';
      }

      /*document.getElementById('ui-all-features').innerHTML = JSON.stringify(
        displayFeatures, 
        null,
        2
      );*/
    });

    /**
     * Draw Polygon around country borders
     * We will have to do this for ever country using https://geojson.io/,
     * Mapbox does have an API to automate this, but it costs money.
     **/
    // Add a data source containing GeoJSON data.
    map.addSource('Norway', {
      type: 'geojson',
      data: {
        type: 'Feature',
        geometry: {
          type: 'Polygon',
          'coordinates': [polyShapeNorway] // These coordinates outline Norway.
        },
      },
    });

    // Add a new layer to visualize the polygon.
    map.addLayer({
      id: 'Norway',
      type: 'fill',
      source: 'Norway', // reference the data source
      layout: {},
      paint: {
        'fill-color': '#2a9d8f', // color for fill
        'fill-opacity': 0.3,
      },
    });

    // Add a black outline around the polygon.
    map.addLayer({
      id: 'outline',
      type: 'line',
      source: 'Norway',
      layout: {},
      paint: {
        'line-color': '#F66990',
        'line-width': 2,
      },
    });

  });
}
