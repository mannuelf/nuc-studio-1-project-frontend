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

// Breakes everything
/*var clickedLatLng = {lat: null, lng: null};

function createPopupContent(values) {
    return function () {
        return "....other data like " + values.data1 + " and " + values.data2 + "..." + clickedLatLng.lat + ', ' + clickedLatLng.lng;
    }
}

function onEachFeature (feature, layer) {
    layer.id = feature.properties.num;
    layer.bindPopup(createPopupContent(feature));
    layer.on('click', onLineClick)
};

var l_encurso = L.geoJson(<%- ordenesl %>, {
    filter: function(feature, layer) {
        return feature.properties.estado == "En curso";
    },
    style: function(feature) {
        return {
            weight: 5,
            color: 'green'
        };
    },
    onEachFeature: onEachFeature
}); */
