Part V - BONUS  |  ViBRANT Workshop
== 

Now, let's quickly take the map we created in IV and turn it into a bit more of an interactive tool.

## Add a third layer

After line 48 we are going to add a 3rd copy of the cartodb.createLayer code, so now it should look something like this,

    // add your layer to the map
    cartodb.createLayer(map, layerUrl)
     .on('done', function(layer) {
      map.addLayer(layer);
    });
    var layerUrl_b = "http://staging20.cartodb.com/api/v1/viz/501/viz.json";
    cartodb.createLayer(map, layerUrl_b)
     .on('done', function(layer) {
      map.addLayer(layer);
    });
    cartodb.createLayer(map, layerUrl_b)
     .on('done', function(layer) {
      map.addLayer(layer);
    });

This would get us 2 copies of the hexagon grid. But we are going to modify the 3rd copy a bit. Now, instead of ending after the load, we are going to tell it to hide itself, as follows,

    cartodb.createLayer(map, layerUrl_b)
     .on('done', function(layer) {
      map.addLayer(layer);
      layer.hide();
    });

We are going to also store this layer to a variable so we can access it later. So add a line above it var points_layer and then store the layer to that variable,

    var points_layer;
    cartodb.createLayer(map, layerUrl_b)
     .on('done', function(layer) {
      map.addLayer(layer);
      layer.hide();
      layer.setCartoCSS("#{{table_name}}{ marker-fill:purple; marker-allow-overlap: true }");
      points_layer = layer;
    });

Great!

## Add interactivity to our hexagons

Lines 40-43 should be our untouched hexagon layer and look something like this,

    cartodb.createLayer(map, layerUrl)
     .on('done', function(layer) {
      map.addLayer(layer);
    });

Now, update them with click callback functions like this,

    cartodb.createLayer(map, layerUrl)
     .on('done', function(layer) {
      map.addLayer(layer);
      layer.on('featureClick', function(e, pos, latlng, data) {
        points_layer.setQuery("SELECT * FROM {{table_name}} WHERE ST_Intersects(the_geom, (SELECT the_geom FROM papua_new_guinea_pa_ WHERE cartodb_id = "+data.cartodb_id+"))");
        points_layer.show()
      });
    });

Save your file and take a look. That is the basics of how to interact with multiple layers!

![final map](http://i.imgur.com/9zuwA.png)


