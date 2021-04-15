/*
 * Import all modules required to enable map functionality.
 * */
import mapboxgl from 'mapbox-gl';
import { getPopulationLevelsData } from '../models/factbookExplorerApi';
import getPolygon from '../models/getPolygon';
import searchBar from '../models/searchBar';
import createLegend from '../components/createLegend';
import {
  ABOUT_MESSAGE,
  MAPBOX_STYLE_URI,
  MAPBOX_TOKEN,
} from '../config/constants';

mapboxgl.accessToken = MAPBOX_TOKEN;

/*
 * New up an instance of MapBox map,
 * export it for other modules to use
 */
export const map = new mapboxgl.Map({
  container: 'map',
  style: MAPBOX_STYLE_URI,
  zoom: 0,
  center: [0.0, 0.0],
});

/*
 * Init search bar.
 * User must hit enter. TODO: search on keyup
 */
searchBar();

/*
 * MapBox Service
 * export as module to allow use from any module.
 * */
export default async function MapBoxService(): Promise<void> {
  const uiFeatures = document.querySelector('#ui-features') as HTMLElement;

  /*
   * default location set to Norway,
   * TODO: use GEOLOCATION API to automate this
   */
  const defaultLocation = [
    4.40079698619525,
    57.906609500058,
    31.2678854952283,
    71.2176742998415,
  ];

  map.on('load', async () => {
    map.getCanvas().style.cursor = 'default';

    let currentCountry = '';
    let factbookExplorerApiData = {};

    /*
     * pass default GPS > map loads with something even
     * if user has not searched. set map bounds to a continent
     */
    map.fitBounds(defaultLocation);

    createLegend();

    // change info window on click
    map.on('click', async (e) => {
      const features = map.queryRenderedFeatures(e.point);
      const displayProperties = ['type', 'properties', 'id', 'layer', 'source'];

      // https://docs.mapbox.com/mapbox-gl-js/example/queryrenderedfeatures/
      const displayFeatures = features.map((feat) => {
        const displayFeat = {};
        displayProperties.forEach((prop) => {
          displayFeat[prop] = feat[prop];
        });
        return displayFeat;
      });

      const [selectedCountry] = displayFeatures;
      const country = selectedCountry?.properties.name_en.toLowerCase();

      /*
       * Draw Polygon around country borders
       * We will have to do this for ever country using https://geojson.io/,
       * Mapbox does have an API to automate this, but it costs money.
       *
       * GET data from our API service on Heroku
       * const getPopulationLevels = await getPopulationLevelsData();
       * const getGrossGdp = await getGrossGdpData();
       * use API calls
       * * */
      const renderPopulationLevels = async (country) => {
        const data = await getPopulationLevelsData(country);
        return data;
      };

      const setPolygons = getPolygon(country);

      // https://docs.mapbox.com/mapbox-gl-js/example/geojson-polygon/
      map.addSource(country, {
        type: 'geojson',
        data: {
          type: 'FeatureCollection',
          features: [
            {
              type: 'Feature',
              geometry: {
                type: 'Polygon',
                coordinates: [setPolygons[country]],
              },
              properties: {},
            },
          ],
        },
      });

      /*
       * API call to python backend to get country specifi data.
       * */
      const cachedFeatures = displayFeatures;
      factbookExplorerApiData = await renderPopulationLevels(country);
      cachedFeatures.push(factbookExplorerApiData);
      const [, renderCountry] = cachedFeatures;
      console.log('>', renderCountry.country);

      const renderTableHeader = () => {
        for (let [key, value] of Object.entries(renderCountry[country]) {
          console.log(key);
          return `<td>${key}</td>`
        }
      }

      const renderTableRow = () => {
        for (let [key, value] of Object.entries(renderCountry[country]) {
          return `<td>${value}</td>`
        }
      }

      uiFeatures.innerHTML = `
          <h1 class="is-size-3">${country}</h1>
          <h2 class="is-size-5">Population levels</h2>
          <p>Growth year on year in Thousands</p>
          <div class="table-data">
            <table class="table">
              <thead>
                <tr>
                  <th>${renderTableHeader()}</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  ${renderTableRow()}
                </tr>
              </tbody>
            </table>
          </div>
      `;

      /*
       *
       * Teardown map polygon, to enable render new polygone
       * */
      if (currentCountry !== '' && currentCountry !== country) {
        map.removeLayer('outline');
        map.removeLayer(currentCountry);
        map.removeSource(currentCountry);
      }

      currentCountry = country;

      // Add a new layer to visualize the polygon.
      map.addLayer({
        id: country,
        type: 'fill',
        source: country, // reference the data source
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
        source: country,
        layout: {},
        paint: {
          'line-color': '#F66990',
          'line-width': 3,
        },
      });
    });
  });
}
