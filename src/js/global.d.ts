/*
 * bbox is an array of 5 GPS coordinates from MapBox
 * https://www.typescriptlang.org/docs/handbook/2/objects.html
 * */
export interface Ibbox {
  bbox: [number, number, number, number];
}

/*
 * state for API fetching
 * https://www.typescriptlang.org/docs/handbook/enums.html
 */
export enum ServerResponse {
  OK = 200,
  FOUND = 302,
  BAD_REQUEST = 400,
  UNAUTHORISED = 401,
  FORBIDDEN = 403,
  NOT_FOUND = 404,
  BAD_GATEWAY = 502,
  SERVICE_UNAVAILABLE = 503,
}
