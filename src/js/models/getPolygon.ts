import * as Polygon from '../config/polygons';
import { Country } from '../global.d';

export default function getPolygon(country: Country): any {
  const COUNTRIES = {
    australia: Polygon.AUSTRALIA,
    finland: Polygon.FINLAND,
    germany: Polygon.GERMANY,
    luxembourg: Polygon.LUXEMBOURG,
    norway: Polygon.NORWAY,
    'south-africa': Polygon.SOUTHAFRICA,
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
