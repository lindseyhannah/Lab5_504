//This increases the discoverability of the map by letting the user know that they can add start and end points by clicking the map
//Changing the cursor to a crosshair, as done using a CSS class, also helps the user understand they can pinpoint a location better than the standard grab hand cursor
window.onload = function(){
alert("Click anywhere on the map to set a start and end point for routing");
}
	//set the map tile
	var OpenStreetMap_DE = L.tileLayer('https://{s}.tile.openstreetmap.de/tiles/osmde/{z}/{x}/{y}.png', {
		maxZoom: 18,
		attribution: '&copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a>'
	});
    //create map variable and set the zoom/coordinates.  Add to map tile 
	var map = new L.map("map", {
		center:new L.LatLng(47.24, -122.44),
		zoom: 11
	});
    map.addLayer(OpenStreetMap_DE);
    //Leaflet Routing controls and geocoder
    var control= L.Routing.control({
        waypoints: [
        	null
            //L.latLng(47.246587, -122.438830),
            //L.latLng(47.258024,  -122.444725),
            //L.latLng(47.318017, -122.542970)
        ],
        geocoder: L.Control.Geocoder.nominatim(),
        routeWhileDragging: true,
        reverseWaypoints: true,
        router: L.Routing.mapbox('pk.eyJ1IjoibG1oYW5uYWgiLCJhIjoiY2p0ZXEwbXlhMWtzcTN5b2I3MDVyNG00MCJ9.Sajhgv5OHLfXBiyZdRb9IA'),
        units: 'imperial',
    }).addTo(map);
//Creates the button for the start and end point setting 
function createButton(label, container) {
    var btn = L.DomUtil.create('button', '', container);
    btn.setAttribute('type', 'button');
    btn.innerHTML = label;
    return btn;
};

//function that resets view to geolocation 
function pointhome(e){
		    
		var home= map.locate({
		    setView: true,  
		    timeout: 15000, 
		    watch: false,
		    });

};
//function that when map.locate is intiiated, places a circle icon and popup at user location
//Marker object is hidden with pop up so I used a circle
map.on('locationfound', function(e){
	L.circle(e.latlng).addTo(map);
	var geoloc= L.popup()
		.setContent("You are here")
		.setLatLng(e.latlng)
		.addTo(map);
});
//Sets start and end button functions to place waypoints at clicked location
map.on('click', function(e) {

    var container = L.DomUtil.create('div'),

        startBtn = createButton('Start from this location', container),
        destBtn = createButton('Go to this location', container);

		L.popup()
        	.setContent(container)
       		.setLatLng(e.latlng)
        	.openOn(map);

        L.DomEvent.on(startBtn, 'click', function() {
		             control.spliceWaypoints(0, 1, e.latlng);
		             map.closePopup();
		         });

		L.DomEvent.on(destBtn, 'click', function() {
		             control.spliceWaypoints(-1, 1, e.latlng);
		             map.closePopup();
		         });
 	    
});


