import axios from 'axios';
import { API_BASE_URL } from '../config/constants';
import { Country } from '../global.d';

// fetch and return multiple sets of data
// each endpoint will return its own data
// each endpoint will need it's own api call
// The data should be flat json like object with properties and values
// the mapbox map should call this service and get the data is needs
export const getPopulationLevelsData = async (
  country: Country
): Promise<any> => {
  try {
    const result = await axios.get(`${API_BASE_URL}/population-levels`);
    const { data } = result;
    const allData = data[0];
    Object.keys(allData)
      .filter((key) => key.includes(country))
      .reduce((obj, key) => {
        obj[key] = allData[key];
        return obj;
      }, {});
  } catch (error) {
    throw new Error(error);
  } finally {
    console.log('complete');
  }
};

export const getGrossGdpData = async (country: Country): Promise<any> => {
  try {
    const result = await axios.get(`${API_BASE_URL}/gross-gdp`);
    const { data } = result;
    const allData = data[0];
    Object.keys(allData)
      .filter((key) => key.includes(country))
      .reduce((obj, key) => {
        obj[key] = allData[key];
        return obj;
      }, {});
  } catch (error) {
    throw new Error(error);
  } finally {
    console.log('complete');
  }
};
