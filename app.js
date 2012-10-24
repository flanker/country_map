var countryChanged = function (e) {
  updateMap(e.target.value);
};

var updateMap = function (country) {

  if (border !== undefined) {
    border.setMap(null);
  }

  var borders = _(data[country]).map(function (borderLines) {
    var borderLine = borderLines[0];
    return borderLine.map(function (latLng) {
      return new google.maps.LatLng(latLng[1], latLng[0]);
    });
  });

  border = new google.maps.Polygon({
    paths: borders,
    strokeColor: "#000",
    strokeOpacity: 1,
    strokeWeight: 1,
    fillColor: '#555555',
    fillOpacity: 1
  });
  border.setMap(map);


  geocoder.geocode( { 'address': country}, function(results, status) {
    if (status == google.maps.GeocoderStatus.OK) {
      map.setCenter(results[0].geometry.location);
      map.fitBounds(results[0].geometry.bounds);
    } else {
      alert("Geocode was not successful for the following reason: " + status);
    }
  });

};

var map;
var border;
var geocoder;

var initialize = function () {

  var INIT_COUNTRY = 'China';

  var selector = document.getElementById('selector');
  for (var country in data) {
    var option = document.createElement('option');
    option.innerText = country;
    selector.appendChild(option);
  }
  selector.value = INIT_COUNTRY;
  selector.onchange = countryChanged;

  var styles = [
    {featureType: "all", stylers: [{ color: "#888888" }]},
    {featureType: "all", elementType: "labels", stylers: [{ visibility: "off" }]},
    {featureType: "water", stylers: [{ color: "#ffffff" }]}
  ];

  var styledMap = new google.maps.StyledMapType(styles, {name: "Styled Map"});

  var mapOptions = {
    draggable: false,
    scrollwheel: false,
    disableDoubleClickZoom: true,
    disableDefaultUI: true,
    mapTypeControlOptions: {mapTypeIds: ['map_style']}
  };

  map = new google.maps.Map(document.getElementById("map_canvas"), mapOptions);
  map.mapTypes.set('map_style', styledMap);
  map.setMapTypeId('map_style');

  geocoder = new google.maps.Geocoder();

  updateMap(INIT_COUNTRY);

};