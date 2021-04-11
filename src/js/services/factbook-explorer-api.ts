import axios from 'axios';
import { API_BASE_URL } from '../config/constants';

// fetch and return multiple sets of data
// each endpoint will return its own data
// each endpoint will need it's own api call
// The data should be flat json like object with properties and values
// the mapbox map should call this service and get the data is needs

export const getPopulationLevelsData = async () => {
  try {
    const result = await axios.get(`${API_BASE_URL}/population-levels`);
    const { data } = result;
    return { data };
  } catch (error) {
    console.log(error);
    throw Error(error);
  }
};

export const getGrossGdpData = async () => {
  try {
    const result = await axios.get(`${API_BASE_URL}/gross-gdp`);
    const { data } = result;
    return { data };
  } catch (error) {
    console.log(error);
    throw Error(error);
  }
};
