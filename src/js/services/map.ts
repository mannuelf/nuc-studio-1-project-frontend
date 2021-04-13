import mapboxgl from 'mapbox-gl';
import {
  getGrossGdpData,
  getPopulationLevelsData,
} from '../models/factbook-explorer-api';

import { searchBar } from '../utils/searchBar';
import { NORWAY as polyShapeNorway } from '../config/countries';
import { ABOUT_MESSAGE, MAPBOX_STYLE_URI, MAPBOX_TOKEN } from '../config/constants';
import { renderNorway } from './map-ui-norway';

mapboxgl.accessToken = MAPBOX_TOKEN;

// new up an instance of MapBox map and export it for other modules to use.
export const map = new mapboxgl.Map({
  container: 'map',
  style: MAPBOX_STYLE_URI,
  zoom: 0,
  center: [0.0, 0.0],
});

// Call to searchBar user must hit enter key not on keyup (yet).
searchBar();

export default async function MapBoxService(): Promise<void> {
  const uiAllFeatures = document.getElementById('ui-all-features') as HTMLElement;
  const infoBox = document.getElementById('ui-info-box') as HTMLElement;

  const defaultLocation = [
    4.40079698619525,
    57.906609500058,
    31.2678854952283,
    71.2176742998415,
  ]; // default location set to Norway, we should use GEOLOCATION API to automate this

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

    // pass default GPS so map loads with something even if user has not searched.
    // set map bounds to a continent
    map.fitBounds(defaultLocation);

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
 
    /*
     * Draw Polygon around country borders
     * We will have to do this for ever country using https://geojson.io/,
     * Mapbox does have an API to automate this, but it costs money.
     *
     * GET data from our API service on Heroku
     * const getPopulationLevels = await getPopulationLevelsData();
     * const getGrossGdp = await getGrossGdpData();
     * use API calls
     * */
    const renderPopulationLevels = async () => {
      const { data } = await getPopulationLevelsData();
      return data.norway;
    };

    // change info window on click
    map.on('click', async (e) => {
      const features = map.queryRenderedFeatures(e.point);

      const displayProperties = [
        'type',
        'properties',
        'id',
        'layer',
        'source',
      ];
      
      console.log("FEATURES:", features);

      features.map(async (feat) => {
        const countryName = feat.properties?.name_en.toLowerCase();
        console.log("countryName", countryName)
        const renderPopulationLevels = async () => {
          const { data } = await getPopulationLevelsData();
          console.log("renderPopulationLevels", data.countryName)
          return data.countryName;
        };

        map.addSource(feat.properties.name_en.toUpperCase(), {
          type: 'geojson',
          data: {
            type: 'FeatureCollection',
            features: [
              {
                type: 'Feature',
                geometry: {
                  type: 'Polygon',
                  coordinates: [polyShapeNorway], // These coordinates outline Norway.
                },
                properties: {
                  description: ABOUT_MESSAGE,
                  data: await renderPopulationLevels();
                },
              },
            ],
          },
        });

        // Add a new layer to visualize the polygon.
        map.addLayer({
          id: feat.id,
          type: 'fill',
          source: feat.source, // reference the data source
          layout: {},
          paint: {
            'fill-color': '#2a9d8f', // color for fill
            'fill-opacity': 0.3,
          },
        });

        // Add an outline around the polygon.
        map.addLayer({
          id: 'outline',
          type: 'line',
          source: feat.source,
          layout: {},
          paint: {
            'line-color': '#F66990',
            'line-width': 3,
          },
        });

        console.log('>>', feat)
      });

      const renderCountryDescription = (props) => {
        console.log('🚀', props);
        infoBox.innerHTML = `
          <h1 class="is-size-3 has-text-semibold">
            ${props ? props.layer.source : '' }
          </h1>
          <p class="is-size-6">
            ${props ? props.properties.description : ''}
          </p>`;
      }

      const [selectedCountry,] = features;
      renderCountryDescription(selectedCountry);
      // https://docs.mapbox.com/mapbox-gl-js/example/queryrenderedfeatures/
    });
  });
}
