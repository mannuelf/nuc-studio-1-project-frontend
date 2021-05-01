/*
 * Import all modules required to enable map functionality.
 * */
import mapboxgl from 'mapbox-gl';
import { getPopulationLevelsData } from '../models/factbookExplorerApi';
import { getGrossGdpData } from '../models/factbookExplorerApi';
import getPolygon from '../models/getPolygon';
import getGeocoding from '../models/getGeocoding';
import createLegend from '../components/createLegend';
import { MAPBOX_STYLE_URI, MAPBOX_TOKEN } from '../config/constants';

export const uiInfoBox = document.querySelector('#ui-features') as HTMLElement;
export const uiTable = document.querySelector('#ui-table-data') as HTMLElement;

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
getGeocoding();

/*
 * MapBox Service
 * export as module to allow use from any module.
 * */
export default async function MapBoxService(): Promise<void> {
  let currentCountry = '';
  let fetchFactbookExplorerApiDataPop = {};
  let fetchFactbookExplorerApiDataGdp = {};
  let country = '';

  /*
   * default location set to Norway,
   * TODO: use GEOLOCATION API to automate this
   */
  const defaultLocation: [number, number, number, number] = [
    4.40079698619525,
    57.906609500058,
    31.2678854952283,
    71.2176742998415,
  ];

  map.on('load', async () => {
    /*
     * pass default GPS > map loads with something even
     * if user has not searched. set map bounds to a continent
     */
    map.fitBounds(defaultLocation);
    map.getCanvas().style.cursor = 'default';
    createLegend();

    // change info window on click
    map.on('click', async (e) => {
      const features = map.queryRenderedFeatures(e.point);
      const displayProperties = ['type', 'properties', 'id', 'layer', 'source'];

      // https://docs.mapbox.com/mapbox-gl-js/example/queryrenderedfeatures/
      // returns all data for country,city,place from mapbbox
      const displayFeatures = features.map((feat) => {
        const displayFeat = {};
        displayProperties.forEach((prop) => {
          displayFeat[prop] = feat[prop];
        });
        console.log(displayFeat);
        return displayFeat;
      });

      const [selectedCountry] = displayFeatures;

      if (selectedCountry.id !== undefined) {
        country = selectedCountry.properties.name_en.toLowerCase();
      }

      /*
       * GET data from our API service on Heroku
       * const getPopulationLevels = await getPopulationLevelsData();
       * const getGrossGdp = await getGrossGdpData();
       * use API calls
       * * */
      const renderPopulationLevels = async (country) => {
        const data = await getPopulationLevelsData(country);
        return data;
      };

      const renderGrossGdpData = async (country) => {
        const data = await getGrossGdpData(country);
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
       * API call to python backend to get country specific data.
       * displayFeatures is data gotten from mapbox
       * */

      const cachedFeatures = displayFeatures;

      const changeInfoToPop = (country: string) => {
        console.log('working 1');
        uiInfoBox.innerHTML = `
            <h1 class="is-size-3">${country}</h1>
            <h2 class="is-size-5">Population levels</h2>
            <p>Growth year on year in Thousands</p>
            <div class="table-results">
              ${renderTableRow(country) ? renderTableRow(country) : ''}
            </div>
        `;
      };
      const changeInfoToGDP = (country: string) => {
        uiInfoBox.innerHTML = `
            <h1 class="is-size-3">${country}</h1>
            <h2 class="is-size-5">Gross Domestic Product</h2>
            <p>Something</p>
            <div class="table-results">
              ${renderTableRow(country) ? renderTableRow(country) : ''}
            </div>
        `;
      };
      const showPopulation = async () => {
        fetchFactbookExplorerApiDataPop = await renderPopulationLevels(country);
        console.log(fetchFactbookExplorerApiDataPop);
        cachedFeatures.push(fetchFactbookExplorerApiDataPop);
        const [, renderCountry] = cachedFeatures;
        changeInfoToPop(country);
      };
      const showGdp = async () => {
        fetchFactbookExplorerApiDataGdp = await renderGrossGdpData(country);
        console.log(fetchFactbookExplorerApiDataGdp);
        cachedFeatures.push(fetchFactbookExplorerApiDataGdp);
        const [, renderCountry] = cachedFeatures;
        changeInfoToGDP(country);
      };

      const renderTableRow = (country: string) => {
        const tableData = renderCountry[country];
        uiTable.innerHTML = '';
        console.log("working 2")
        for (let prop in tableData) {
          const item = document.createElement('div');
          item.classList.add('table-cell');

          const heading = document.createElement('span');
          heading.classList.add('table-header');

          const value = document.createElement('span');
          value.classList.add('table-data');

          heading.innerHTML = prop;
          value.innerHTML = tableData[prop];

          item.appendChild(heading);
          item.appendChild(value);

          uiTable?.appendChild(item);
        }
      };

      document.getElementById('pop').addEventListener('click', showPopulation);
      document.getElementById('gdp').addEventListener('click', showGdp);

      /*
       *
       * Teardown map polygon, to enable render new polygone
       * */
      if (currentCountry !== '' && currentCountry !== country) {
        map.removeLayer('outline');
        map.removeLayer(currentCountry);
        map.removeSource(currentCountry);
      }

      // set local var to clicked country.
      currentCountry = country;

      // Add a new layer to visualize the polygon.
      map.addLayer({
        id: country,
        type: 'fill',
        source: country, // reference the data source
        layout: {},
        paint: {
          'fill-color': '#E31A1C', // color for fill
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
          'line-color': '#800026',
          'line-width': 3,
        },
      });
    });
  });
}
