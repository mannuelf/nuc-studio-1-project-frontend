import * as Polygon from '../config/setPolygons';
import { Country } from '../global.d';

export default function getPolygon(country: Country): any {
  const COUNTRIES = {
    australia: Polygon.AUSTRALIA,
    germany: Polygon.GERMANY,
    luxembourg: Polygon.LUXEMBOURG,
    norway: Polygon.NORWAY,
    sweden: Polygon.SWEDEN,
  };

  const polygonShape = Object.keys(COUNTRIES)
    .filter((key) => key.includes(country))
    .reduce((obj, key) => {
      obj[key] = COUNTRIES[key];
      return obj;
    }, {});

  return polygonShape;
}
