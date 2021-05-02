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
    spain: Polygon.SPAIN,
    portugal: Polygon.PORTUGAL,
    italy: Polygon.ITALY,
    netherlands: Polygon.NETHERLANDS,
    czechia: Polygon.CZECHREPUBLIC,
    estonia: Polygon.ESTONIA,
    greece: Polygon.GREECE,
    hungary: Polygon.HUNGARY,
    iceland: Polygon.ICELAND,
    ireland: Polygon.IRELAND,
    poland: Polygon.POLAND,
    israel: Polygon.ISRAEL,
    japan: Polygon.JAPAN,
    'new zealand': Polygon.NEWZEALAND,
    switzerland: Polygon.SWITZERLAND,
    turkey: Polygon.TURKEY,
    'united kingdom': Polygon.UNITEDKINGDOM,
    slovenia: Polygon.SLOVENIA,
    slovakia: Polygon.SLOVAKIA,
    serbia: Polygon.SERBIA,
    'bosnia and herzegovina': Polygon.BOSNIAANDHERZEGOVINA,
    croatia: Polygon.CROATIA,
  };

  const polygonShape = Object.keys(COUNTRIES)
    .filter((key) => key.includes(country))
    .reduce((obj, key) => {
      obj[key] = COUNTRIES[key];
      return obj;
    }, {});

  return polygonShape;
}