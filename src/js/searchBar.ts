import _ from 'lodash';
import axios from 'axios';
import { ENDPOINT_GEOCODING } from './constants';

export const searchBar = async () => {
  const searchInput = document.querySelector('#searchBar .input');
  const userInput = searchInput.value;

  searchInput.onkeyup = (e) => {
    console.log('result', e);
  };

  const mapboxPlace = await axios.get(
    `${ENDPOINT_GEOCODING}/${userInput}.json`
  );
};
