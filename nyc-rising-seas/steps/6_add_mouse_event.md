Popups, add a mouse event back to the map
== 

## Add the popup library to the Javascript included in your header

    <script type="text/javascript" src="js/libs/cartodb-popup-min.js"></script>

## Create a Leaflet popup object above your Leaflet map object

	var popup = new L.CartoDBPopup();

## Swap in new functions for the empty featureOver,featureOut,featureClick functions

    featureOver: function(ev,latlng,pos,data) {
      document.body.style.cursor = "pointer";
    },
    featureOut: function() {
      document.body.style.cursor = "default";
    },
    featureClick: function(ev,latlng,pos,data) {

      if (typeof( window.event ) != "undefined" ) {
        // IE
        ev.cancelBubble=true;
      } else {
        // Rest
        ev.preventDefault();
        ev.stopPropagation();
      }
      
      // Set popup content
      popup.setContent(data);

      // Set latlng
      popup.setLatLng(latlng);

      // Show it!
      map.openPopup(popup);
    },

##See it here

http://vizzuality.github.com/CartoDB-Tutorials/nyc-rising-seas/html/6_add_mouse_event.html