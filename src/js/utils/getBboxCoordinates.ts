import axios from 'axios';
import { ENDPOINT_GEOCODING, MAPBOX_TOKEN } from '../config/constants';
import { Ibbox } from '../global.d';

export default async function getBboxCoordinates(country): Promise<Ibbox> {
  try {
    let bbox = [];
    const response = await axios.get(
      `${ENDPOINT_GEOCODING}/${country}.json?limit=1&access_token=${MAPBOX_TOKEN}`
    );
    const [bboxCoordinates] = response.data.features;
    bbox = bboxCoordinates.bbox;
    return bbox;
  } catch (error) {
    throw new Error(error);
  }
}
