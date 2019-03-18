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

    var control = L.Routing.control({
        waypoints: [
            L.latLng(47.246587, -122.438830),
            L.latLng(47.318017, -122.542970)
        ],
        routeWhileDragging: true
        units: 'imperial',
    }).addTo(map);
