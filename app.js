function initialize() {

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
  var map = new google.maps.Map(document.getElementById("map_canvas"), mapOptions);
  map.mapTypes.set('map_style', styledMap);
  map.setMapTypeId('map_style');

  var borders = _(data.China).map(function (dots) {
    return dots.map(function (dot) {
      return new google.maps.LatLng(dot[0], dot[1]);
    });
  });

  // borders.each(function (index) {
  //   var marker = new google.maps.Marker({
  //       position: this,
  //       map: map
  //   });
  //   var infowindow = new google.maps.InfoWindow({
  //       content: index.toString() + ': ' + this.lat() + ', ' + this.lng()
  //   });
  //   google.maps.event.addListener(marker, 'click', function() {
  //     infowindow.open(map, marker);
  //   });
  // });

  var border = new google.maps.Polygon({
    paths: borders,
    strokeColor: "#000",
    strokeOpacity: 1,
    strokeWeight: 1,
    fillColor: '#555555',
    fillOpacity: 0.8
  });
  border.setMap(map);

  var geocoder = new google.maps.Geocoder();
  geocoder.geocode( { 'address': 'China'}, function(results, status) {
    if (status == google.maps.GeocoderStatus.OK) {
      map.setCenter(results[0].geometry.location);
      map.fitBounds(results[0].geometry.bounds);
    } else {
      alert("Geocode was not successful for the following reason: " + status);
    }
  });

}