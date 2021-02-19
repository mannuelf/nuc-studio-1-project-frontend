L.mapbox.accessToken =
  "pk.eyJ1Ijoic2lsZW50OTgiLCJhIjoiY2toNHB1Y3FqMDJ0ZTJ4bXg5bW9uYW96dyJ9.ytYNRy4WL7oEZeR43Wc2Jw";

var map = L.mapbox
  .map("map")
  .setView([40, -74.5], 9)
  .addLayer(
    L.mapbox.styleLayer("mapbox://styles/silent98/ckh4pwud40y9119lg23u9yjh6")
  );
