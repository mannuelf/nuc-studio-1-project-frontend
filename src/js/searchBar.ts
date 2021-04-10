import _ from 'lodash';
import axios from 'axios';
import { ENDPOINT_GEOCODING, MAPBOX_TOKEN } from './constants';

export const searchBar = async () => {
  const searchForm = document.querySelector('#searchBar') as HTMLFormElement;
  const searchInput = document.querySelector(
    '#searchBar .input'
  ) as HTMLInputElement;

  searchForm.addEventListener('submit', (e) => {
    e.preventDefault();
    searchInput.onkeyup = _.debounce(async (e) => {
      const { value } = e.target;
      const userInput = value.toLowerCase().trim().replace('', '_');
      const mapboxPlace = await axios.get(
        `${ENDPOINT_GEOCODING}/${userInput}.json?limit=2&access_token=${MAPBOX_TOKEN}`
      );
      return mapboxPlace;
    }, 400);
  });
};
