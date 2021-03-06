
var overlay;
var map;
var deviceReady = false;

USGSOverlay.prototype = new google.maps.OverlayView();



function initialize() {

  var myLatLng = new google.maps.LatLng(61.2035,25.12);
  
  var mapOptions = {
	zoom: 16,
	center: myLatLng,
	streetViewControl: false,
	zoomControl: false,
	mapTypeControl: false,
	mapTypeId: google.maps.MapTypeId.ROADMAP
  };

  var mapDiv = document.getElementById("map");
  map = new google.maps.Map(mapDiv,mapOptions);

  var swBound = new google.maps.LatLng(61.19900,25.106391);
  var neBound = new google.maps.LatLng(61.207966,25.130622);
  var bounds = new google.maps.LatLngBounds(swBound, neBound);

  var srcImage = 'img/ilves13kartta_v3.png';
  overlay = new USGSOverlay(bounds, srcImage, map);
  deviceReady = true;
}




// markkerin lisäys
function addMarker(latLng){
  console.log("Entering addMarker()");
  var markerOptions = new google.maps.Marker({
	map: map,
	position: latLng,
	title:'Olen tässä',
	clickable:true
	});

  var marker = new google.maps.Marker(markerOptions);
  var infoWindowOptions = {
   position: latLng
  };

  var infoWindow = new google.maps.InfoWindow(infoWindowOptions);
  google.maps.event.addListener(marker, "click", function(){
   infoWindow.open(map);
  });
  console.log("Exiting addMarker()");
}



function USGSOverlay(bounds, image, map) {

  // Now initialize all properties.
  this.bounds_ = bounds;
  this.image_ = image;
  this.map_ = map;

  // We define a property to hold the image's div. We'll
  // actually create this div upon receipt of the onAdd()
  // method so we'll leave it null for now.
  this.div_ = null;

  // Explicitly call setMap on this overlay
  this.setMap(map);
}


USGSOverlay.prototype.onAdd = function() {

  // Note: an overlay's receipt of onAdd() indicates that
  // the map's panes are now available for attaching
  // the overlay to the map via the DOM.

  // Create the DIV and set some basic attributes.
  var div = document.createElement('div');
  div.style.borderStyle = 'none';
  div.style.borderWidth = '0px';
  div.style.position = 'absolute';

  // Create an IMG element and attach it to the DIV.
  var img = document.createElement('img');
  img.src = this.image_;
  img.style.width = '100%';
  img.style.height = '100%';
  img.style.position = 'absolute';
  img.style.opacity = '1';
  div.appendChild(img);

  // Set the overlay's div_ property to this DIV
  this.div_ = div;

  // We add an overlay to a map via one of the map's panes.
  // We'll add this overlay to the overlayLayer pane.
  var panes = this.getPanes();
  panes.overlayLayer.appendChild(div);
}


USGSOverlay.prototype.draw = function() {

  // Size and position the overlay. We use a southwest and northeast
  // position of the overlay to peg it to the correct position and size.
  // We need to retrieve the projection from this overlay to do this.
  var overlayProjection = this.getProjection();

  // Retrieve the southwest and northeast coordinates of this overlay
  // in latlngs and convert them to pixels coordinates.
  // We'll use these coordinates to resize the DIV.
  var sw = overlayProjection.fromLatLngToDivPixel(this.bounds_.getSouthWest());
  var ne = overlayProjection.fromLatLngToDivPixel(this.bounds_.getNorthEast());

  // Resize the image's DIV to fit the indicated dimensions.
  var div = this.div_;
  div.style.left = sw.x + 'px';
  div.style.top = ne.y + 'px';
  div.style.width = (ne.x - sw.x) + 'px';
  div.style.height = (sw.y - ne.y) + 'px';
}

USGSOverlay.prototype.onRemove = function() {
  this.div_.parentNode.removeChild(this.div_);
  this.div_ = null;
}


// onSuccess Geolocation
//
function onSuccess(position) {
	/**
	var element = document.getElementById('geolocation');
	element.innerHTML = 'Latitude: '           + position.coords.latitude              + '<br />' +
						'Longitude: '          + position.coords.longitude             + '<br />' +
						'Altitude: '           + position.coords.altitude              + '<br />' +
						'Accuracy: '           + position.coords.accuracy              + '<br />' +
						'Altitude Accuracy: '  + position.coords.altitudeAccuracy      + '<br />' +
						'Heading: '            + position.coords.heading               + '<br />' +
						'Speed: '              + position.coords.speed                 + '<br />' +
						'Timestamp: '          + position.timestamp          + '<br />';

	*/
	
	var whereAmI = new google.maps.LatLng(position.coords.latitude, position.coords.longitude);
	// var missaLeiri = new google.maps.LatLng(61.2035,25.12);
	addMarker(whereAmI);
	map.setCenter(whereAmI);
	//alert('Sijaintisi juuri ny: ' + position.coords.latitude + ', ' + position.coords.longitude );
	//alert("getCurrentPosition ok");
}


// onError Callback receives a PositionError object
function onError(error) {
	alert('getCurrentPosition error - code: '    + error.code    + '\n' +  'message: ' + error.message + '\n');
}


  	    
function missaOlen() {
	if (deviceReady) {
		if (navigator.geolocation) {
			navigator.geolocation.getCurrentPosition(onSuccess, onError);
   		} else {
   		  alert('Selaimesi ei tue paikannusta =(');
   		}
   	} else {
   		alert('GPS ei ole valmis =(');
    }
}





google.maps.event.addDomListener(window, 'load', initialize);









	

