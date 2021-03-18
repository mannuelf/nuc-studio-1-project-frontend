const mymap = L.map("mapid").setView([40, 10], 4);

L.tileLayer(
  "https://api.maptiler.com/maps/basic/{z}/{x}/{y}.png?key=hoLGIxuie3cF9jQ7nX7M",
  {
    attribution:
      'Map data &copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors, Imagery © <a href="https://www.mapbox.com/">Mapbox</a>',
    maxZoom: 18,
    id: "mapbox/streets-v11",
    tileSize: 512,
    zoomOffset: -1,
    accessToken:
      "pk.eyJ1Ijoic2lsZW50OTgiLCJhIjoiY2toNHB1Y3FqMDJ0ZTJ4bXg5bW9uYW96dyJ9.ytYNRy4WL7oEZeR43Wc2Jw",
  }
).addTo(mymap);
