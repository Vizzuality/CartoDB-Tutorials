Include a CartoDB layer
== 

##Below is the function you'll need to see this live

    function initialize() {
      // starting latitude and longitude for our map
      var position = new L.LatLng(36.204824, 138.252924);
      
      // starting zoom
      var zoom = 14; 

      // is our Leaflet map object
      var map = new L.Map('map').setView(position, zoom)
        , mapboxUrl = 'http://{s}.tiles.mapbox.com/v3/cartodb.map-u6vat89l/{z}/{x}/{y}.png' // the url pattern for our basemap, many options available
        , basemap = new L.TileLayer(mapboxUrl, {
        	maxZoom: 18, 
        	attribution: "Powered by Leaflet and Mapbox"
        	});
      map.addLayer(basemap,true);
    }

##See it here

http://vizzuality.github.com/CartoDB-Tutorials/nyc-rising-seas/html/2_add_blocks.html