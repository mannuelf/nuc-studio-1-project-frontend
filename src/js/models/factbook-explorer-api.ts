import axios from 'axios';
import { API_BASE_URL } from '../config/constants';

// fetch and return multiple sets of data
// each endpoint will return its own data
// each endpoint will need it's own api call
// The data should be flat json like object with properties and values
// the mapbox map should call this service and get the data is needs

// interface describes the shape of the data we get back from the API call.
// this helps us when coding because your IDE will tell if you try to use
// a property that does not exist, we write less bugs this way, i love typescript.
interface IYears {
  '2002': number;
  '2003': number;
  '2004': number;
  '2005': number;
  '2006': number;
  '2007': number;
  '2008': number;
  '2009': number;
  '2010': number;
  '2011': number;
  '2012': number;
  '2013': number;
  '2014': number;
}

interface IData {
  data: {
    australia: IYears;
  };
}

export const getPopulationLevelsData = async (): Promise<IData> => {
  try {
    const result = await axios.get(`${API_BASE_URL}/population-levels`);
    const { data } = result;
    return { data };
  } catch (error) {
    throw new Error(error);
  }
};

export const getGrossGdpData = async (): Promise<IData> => {
  try {
    const result = await axios.get(`${API_BASE_URL}/gross-gdp`);
    const { data } = result;
    return { data };
  } catch (error) {
    throw new Error(error);
  }
};
