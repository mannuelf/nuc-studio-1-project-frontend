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
  country: string;
  id: number;
}

interface IData {
  data: {
    australia: IYears;
    austria: IYears;
    belgium: IYears;
    brazil: IYears;
    canada: IYears;
    chile: IYears;
    china: IYears;
    'check-republic': IYears;
    denmark: IYears;
    estonia: IYears;
    'eu-28': IYears;
    finland: IYears;
    france: IYears;
    germany: IYears;
    greece: IYears;
    hungary: IYears;
    iceland: IYears;
    india: IYears;
    indonesia: IYears;
    ireland: IYears;
    israel: IYears;
    italy: IYears;
    japan: IYears;
    korea: IYears;
    luxembourg: IYears;
    mexico: IYears;
    netherlands: IYears;
    zealand: IYears;
    norway: IYears;
    oecd: IYears;
    poland: IYears;
    portugal: IYears;
    'russian-federation': IYears;
    'slovak-republic': IYears;
    slovenia: IYears;
    'south-africa': IYears;
    spain: IYears;
    sweden: IYears;
    switzerland: IYears;
    turkey: IYears;
    'united-kingdom': IYears;
    'united-states': IYears;
  };
}

export const getPopulationLevelsData = async (country): Promise<IData> => {
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
    });
  } catch (error) {
    throw new Error(error);
  }
};

export const getGrossGdpData = async (country): Promise<IData> => {
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
  }
};
