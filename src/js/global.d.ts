/*
 * bbox is an array of 5 GPS coordinates from MapBox
 * https://www.typescriptlang.org/docs/handbook/2/objects.html
 * */
export interface Ibbox {
  bbox: [number, number, number, number];
}

// interface describes the shape of the data we get back from the API call.
// this helps us when coding because your IDE will tell if you try to use
// a property that does not exist, we write less bugs this way, i love typescript.
export interface IYears {
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

export interface IData {
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

export type Country = {
  country: string;
};

/*
 * state for API fetching
 * https://www.typescriptlang.org/docs/handbook/enums.html
 */
export enum ApiResponse {
  OK = 200,
  FOUND = 302,
  BAD_REQUEST = 400,
  UNAUTHORISED = 401,
  FORBIDDEN = 403,
  NOT_FOUND = 404,
  BAD_GATEWAY = 502,
  SERVICE_UNAVAILABLE = 503,
}
