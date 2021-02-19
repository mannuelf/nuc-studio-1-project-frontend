import * as L from "leaflet/dist/leaflet-src.esm";

const myToken = `pk.eyJ1IjoibWFubnVlbGYiLCJhIjoiY2tsYzZvNDZsMG05ZjJwcDB1OGg0MXJ2NiJ9.g5VNTSuAnyZ45zg9lsZgOg`;
const config = {
  apiMapBoxUrl: `https://api.mapbox.com/styles/v1/{id}/tiles/{z}/{x}/{y}?access_token=${myToken}`,
  mapBoxAttribution: `Map data &copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors, Imagery © <a href="https://www.mapbox.com/">Mapbox</a>`,
};

const mainMap = L.map("map").setView([40, 10], 4);

L.tileLayer(`${config.apiMapBoxUrl}`, {
  attribution: config.mapBoxAttribution,
  maxZoom: 18,
  id: "mapbox/streets-v11",
  tileSize: 512,
  zoomOffset: -1,
  accessToken: `${myToken}`,
}).addTo(mainMap);
