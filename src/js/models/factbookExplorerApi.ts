import axios from 'axios';
import { API_BASE_URL } from '../config/constants';
import { Country } from '../global.d';
import { uiInfoBox } from '../services/map';

// fetch and return multiple sets of data
// each endpoint will return its own data
// each endpoint will need it's own api call
// The data should be flat json like object with properties and values
// the mapbox map should call this service and get the data it needs
export const getPopulationLevelsData = async (
  country: Country
): Promise<any> => {
  try {
    const result = await axios.get(`${API_BASE_URL}/population-levels`);

    uiInfoBox.innerHTML = 'Loading data for Population...';

    const { data } = result;
    const countries = data[0];
    const resp = Object.keys(countries)
      .filter((key) => key.includes(country))
      .reduce((obj, key) => {
        obj[key] = countries[key];
        return obj;
      }, {});

    return resp;
  } catch (error) {
    uiInfoBox.innerHTML = `${error}`;
    throw new Error(error);
  } finally {
    console.log('complete');
  }
};

export const getGrossGdpData = async (country: Country): Promise<any> => {
  try {
    const result = await axios.get(`${API_BASE_URL}/gross-gdp`);

    uiInfoBox.innerHTML = 'Loading data for GDP...';

    const { data } = result;
    const countries = data[0];
    const resp = Object.keys(countries)
      .filter((key) => key.includes(country))
      .reduce((obj, key) => {
        obj[key] = countries[key];
        return obj;
      }, {});
    return resp;
  } catch (error) {
    throw new Error(error);
  } finally {
    console.log('complete');
  }
};
