import * as L from "leaflet/dist/leaflet-src.esm";
import { config, myToken } from "./config";

const mainMap = L.map("map").setView([40, 10], 4);

L.tileLayer(`${config.apiMapBoxUrl}`, {
  attribution: config.mapBoxAttribution,
  maxZoom: 18,
  id: "mapbox/streets-v11",
  tileSize: 512,
  zoomOffset: -1,
  accessToken: `${myToken}`,
}).addTo(mainMap);
