import _ from 'lodash';
import axios from 'axios';
import { ENDPOINT_GEOCODING, MAPBOX_TOKEN } from '../config/constants';
import { map } from '../services/map';

interface Ibbox {
  bbox: [number, number, number, number];
}

export const searchBar = async (): Promise<Ibbox> => {
  const searchForm = document.querySelector('#searchBar') as HTMLFormElement;

  searchForm.addEventListener('submit', async (e: any): Promise<Ibbox> => {
    e.preventDefault();
    let bbox = [];
    const [searchInput] = e.currentTarget;
    const userInput = searchInput.value.toLowerCase().replace('', '_');
    const response = await axios.get(`
      ${ENDPOINT_GEOCODING}/${userInput}.json?limit=2&access_token=${MAPBOX_TOKEN}
    `); // api call to mapbox
    const [bboxCoordinates] = response.data.features; // get pgs coord out of api
    bbox = bboxCoordinates.bbox; // assign new coordinates into bbox
    map.fitBounds(bbox); // set the map with user searched location
    searchInput.value = ''; // clear the input text
  
    return bbox;
  }
};
