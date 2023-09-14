import axios from 'axios';
import { ENDPOINT_GEOCODING, MAPBOX_TOKEN } from '../config/constants';
import { Country, Ibbox } from '../global.d';

/*
 * This does reverse geocoding on a given string.
 * user searches "Germany" etc & the GEOCODING API will return
 * an object that has 4 GPS coordinates in an array.
 * The map will zoom to that location by default the map loads up on NORWAY,
 * this can be changed.
 * */
export default async function getBboxCoordinates(
  country: Country,
): Promise<Ibbox> {
  try {
    let bbox = [];
    const resp = await axios.get(
      `${ENDPOINT_GEOCODING}/${country}.json?limit=1&access_token=${MAPBOX_TOKEN}`,
    );
    const [bboxCoordinates] = resp.data.features;
    bbox = bboxCoordinates.bbox;
    return bbox;
  } catch (error) {
    throw new Error(error);
  } finally {
    console.log('complete');
  }
}
