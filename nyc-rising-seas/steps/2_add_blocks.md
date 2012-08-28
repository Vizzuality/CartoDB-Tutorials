Include a CartoDB layer
== 

##Below is the function you'll need to see this live
    
    var username = "viz2"; //change this to your username
    var table_name = "nycb2000" // the name of our census blocks table

    // Create an object for our new layer
    var nyc_elevation = new L.CartoDBLayer({
      map: map,
      user_name: username,
      table_name: table_name,
      // the SQL query you will use to refine data (we will need this later)
      query: "SELECT * FROM {{table_name}}",
      // you can use tile_style to override any style you have stored on CartoDB
      // but here we are going to use the choropleth we made before
      //tile_style: "#{{table_name}}{polygon-fill:#E25B5B}",
      // the below functions will be used later for mouse events
      featureOver: function(){},
      featureOut: function(){},
      featureClick: function(){},
      // what we want for our our infowindows
      interactivity: "cartodb_id, boroname, elevation",
      auto_bound: false, // don't change the location of the map to show the data
      debug: true // shows errors in the dev console
    });

    // Adding layer to map
    map.addLayer(nyc_elevation);

##See it here

http://vizzuality.github.com/CartoDB-Tutorials/nyc-rising-seas/html/2_add_blocks.html