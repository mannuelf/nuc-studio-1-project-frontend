import axios from 'axios';
import { 
  ENDPOINT_GEOCODING,
  MAPBOX_TOKEN 
} from '../config/constants';
import { map } from '../services/map';
import { Ibbox } from '../global.d';

export let bBoxCoords = [];

export default async function getGeocoding() {
  const searchForm = document.querySelector('#searchBar') as HTMLFormElement;

  searchForm.addEventListener('submit', async (e: any): Promise<Ibbox> => {
    e.preventDefault();
    let bbox = [];
    const [searchInput] = e.currentTarget;
    const userInput = searchInput.value.toLowerCase().replace('', '_');
    const response = await axios.get(`
      ${ENDPOINT_GEOCODING}/${userInput}.json?limit=2&access_token=${MAPBOX_TOKEN}
    `);
    // get pgs coord out of api
    const [bboxCoordinates] = response.data.features;
    bbox = bboxCoordinates.bbox;
    bBoxCoords = bboxCoordinates.bbox;
    // set the map with user searched location
    map.fitBounds(bbox);
    // clear the input text
    searchInput.value = '';
    return bbox;
  }
}
