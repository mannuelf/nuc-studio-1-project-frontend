import * as Country from '../config/countryPolygons';
import { Country } from '../global.d';

export default function getPolygon(country: Country): any {
  const COUNTRIES = {
    australia: Country.AUSTRALIA,
    germany: Country.GERMANY,
    luxembourg: Country.LUXEMBOURG,
    norway: Country.NORWAY,
    sweden: Country.SWEDEN,
  };

  const polygonShape = Object.keys(COUNTRIES)
    .filter((key) => key.includes(country))
    .reduce((obj, key) => {
      obj[key] = COUNTRIES[key];
      return obj;
    }, {});

  return polygonShape;
}
