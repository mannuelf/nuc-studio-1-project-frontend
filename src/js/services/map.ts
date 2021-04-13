import mapboxgl from 'mapbox-gl';
import {
  getPopulationLevelsData,
  getGrossGdpData,
} from '../models/factbook-explorer-api';
import { searchBar } from '../utils/searchBar';
import { NORWAY as polyShapeNorway } from '../config/countries';
import { MAPBOX_TOKEN, MAPBOX_STYLE_URI } from '../config/constants';

mapboxgl.accessToken = MAPBOX_TOKEN;

// new up an instance of MapBox map and export it for other modules to use.
export const map = new mapboxgl.Map({
  container: 'map',
  style: MAPBOX_STYLE_URI,
  zoom: 0,
  center: [0.0, 0.0],
});

// Call to searchBar function, enable search for user, must hit enter key.
searchBar();

export default async function MapBoxService(): Promise<void> {
  /*
   * GET data from our API service on Heroku
   * */
  const getPopulationLevels = await getPopulationLevelsData();
  const getGrossGdp = await getGrossGdpData();

  // use API calls
  getPopulationLevels();
  getGrossGdp();

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
      4.40079698619525,
      57.906609500058,
      31.2678854952283,
      71.2176742998415,
    ]; // default location set to Norway, we should use GEOLOCATION API to automate this

    // pass default GPS so map loads with something even if user has not searched.
    map.fitBounds(defaultLocation); // set map bounds to a continent

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
    const legend = document.querySelector('#legend');

    for (let i = 0; i < layers.length; i += 1) {
      const layer = layers[i];
      const color = colors[i];
      const item = document.createElement('div');
      const key = document.createElement('span');
      key.className = 'legend-key';
      key.style.backgroundColor = color;

      const value = document.createElement('span');
      value.innerHTML = layer;
      item.appendChild(key);
      item.appendChild(value);
      legend.appendChild(item);
    }

    // change info window on hover
    map.on('mousemove', (e) => {
      const country = e.target;
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
        const displayFeat = {};

        displayProperties.forEach((prop) => {
          displayFeat[prop] = feat[prop];
        });
        return displayFeat;
      });

      /*
       * Renders the white box on top right of screen
       * */
      const infoBox = document.querySelector('ui-info-box') as HTMLElement;
      if (features.length > 0) {
        infoBox.innerHTML = `<h3>${
          features[0] ? features[0].properties.name : ''
        }</h3>
          <p><strong>${features[0] ? features[0].density : ''}</strong> 
          people living in the country.</p>
        `;
      } else {
        infoBox.innerHTML = '<p>Hover over a country!</p>';
      }

      document.getElementById('ui-all-features').innerHTML = JSON.stringify(
        displayFeatures,
        null,
        2,
      );
    });

    /*
     * Draw Polygon around country borders
     * We will have to do this for ever country using https://geojson.io/,
     * Mapbox does have an API to automate this, but it costs money.
     */
    // Add a data source containing GeoJSON data.
    map.addSource('Norway', {
      type: 'geojson',
      data: {
        type: 'Feature',
        geometry: {
          type: 'Polygon',
          coordinates: [polyShapeNorway], // These coordinates outline Norway.
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
