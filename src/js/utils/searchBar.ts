import _ from 'lodash';
import axios from 'axios';
import { ENDPOINT_GEOCODING, MAPBOX_TOKEN } from '../config/constants';
import { map } from '../services/map';

export const searchBar = async () => {
  let bbox = [];
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
 };
