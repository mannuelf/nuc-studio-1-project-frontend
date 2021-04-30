import * as Polygon from '../config/polygons';
import { Country } from '../global.d';

export default function getPolygon(country: Country): any {
  const COUNTRIES = {
    australia: Polygon.AUSTRALIA,
    finland: Polygon.FINLAND,
    germany: Polygon.GERMANY,
    lesotho: Polygon.LESOTHO,
    luxembourg: Polygon.LUXEMBOURG,
    norway: Polygon.NORWAY,
    /* Becuase of the MapBox we can not use a dash between South and Afrika
     * Is it possible to change the object
     * name inside of JSON to "south afrika"?
     * Same problem with other 2+ name Countries
     */
    'south africa': Polygon.SOUTHAFRICA,
    sweden: Polygon.SWEDEN,
    greenland: Polygon.GREENLAND,
    andorra: Polygon.ANDORRA,
    russia: Polygon.RUSSIA,
    montenegro: Polygon.MONTENEGRO,
    india: Polygon.INDIA,
    austria: Polygon.AUSTRIA,
    brazil: Polygon.BRAZIL,
    canada: Polygon.CANADA,
    'united states': Polygon.UNITEDSTATES,
    mexico: Polygon.MEXICO,
    belgium: Polygon.BELGIUM,
    chile: Polygon.CHILE,
    china: Polygon.CHINA,
    denmark: Polygon.DENMARK,
    france: Polygon.FRANCE,
  };

  const polygonShape = Object.keys(COUNTRIES)
    .filter((key) => key.includes(country))
    .reduce((obj, key) => {
      obj[key] = COUNTRIES[key];
      return obj;
    }, {});

  return polygonShape;
}
