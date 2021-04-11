import axios from 'axios';
import {MAPBOX_TOKEN, ENDPOINT_GEOCODING} from '../config/constants';

export default async function getBboxCoordinates() {
  let bbox = []; // mapboxs name for gpscoords
  const searchForm = document.querySelector('#searchBar'); // get the search bar

  searchForm.addEventListener('submit', async (e: any): Promise<IbboxGps> => {
    e.preventDefault();
    const [searchInput] = e.currentTarget;
    const userInput = searchInput.value.toLowerCase().replace('', '_');
    const response = await axios.get(`${ENDPOINT_GEOCODING}/${userInput}.json?limit=2&access_token=${MAPBOX_TOKEN}`); // api call to mapbox
    const [bboxCoordinates] = response.data.features; // get pgs coord out of api
    searchInput.value = ''; // clear the input text
    bbox = bboxCoordinates.bbox;
  }
  return bbox;
}

