Sort data by distance from user with CartoDB.js
== 

##Summary

This tutorial is going to build off many things you have seen in other tutorials, including geospatial SQL functions, CartDB.js techniques, and some basic CartoCSS techniques. In the end, we will build a simple map that finds the viewers location using a browser based Location API, and then queries for the closest big cities to that user. There is also a simple user-interface that lets the user select how many nearbye cities they want to see. Some features of this tutorial will rely on a modern browser. 

## Getting started

I have provided a sample HTML document in the examples zipfile, [download it here](https://raw.github.com/Vizzuality/CartoDB-Tutorials/master/cartodb-js/data/examples.zip), it is called tutorial-6-template.html. Download the zipfile, make a copy of tutorial-6-template.html and call it 'tutorial-6.html'. Now open this file in your web browser.

You should see a blank map and some buttons. Success! You can play around, but you should notice that the buttons don't do anything! Yet. That is fine. Now, open tutorial-5.html in your code editor and let's get started.


#### Data

For this tutorial, we are going to use the Populated Places dataset from naturalearthdata.com. It is the same dataset we have used in the previous tutorials, so you can use the same table again if you already have it. To get it, all you have to do is log in to your CartoDB dashboard. Click 'Common data' below the 'Create a new table' button in the right-hand column. In the window that pops-up, click 'Populated places'. CartoDB will build your new table and take you to it when finished. 

## Adding your first CartoDB layer

You should now be comfortable with the method of adding layers to your CartoDB map. You will need your API URL for your populated places map in CartoDB. You can find it by navigating in your CartoDB account to the populated places table you just created, clicking the Map Tab, then clicking Share, and finally clicking 'API' in the upper right of the window. Copy the link and replace the *layerUrl* below, 

```js
    var layerUrl = 'http://viz2.cartodb.com/api/v1/viz/3029/viz.json';

    var layerOptions = {
        query: "SELECT * FROM {{table_name}} LIMIT 2000"
    }

    var layers = [];
    cartodb.createLayer(map, layerUrl, layerOptions)
     .on('done', function(layer) {
      map.addLayer(layer);
      layers.push(layer);
    }).on('error', function() {
      //log the error
    });
```

Paste the entire block above into your HTML file below where the MapBox layer is aded to the map. Go ahead and save your tutorial-6.html file. Open it, or refresh it in your browser. You should now see the points of all the populated places in the world. 

## Detecting a user's location

This feature is not part of CartoDB, but instead is supported by most modern browsers. You may find it useful in some of your development, so we thought we would show you some basic functionality here. 

We are going to add the following block of code to our JavaScript, 

```js
    // credit: http://html5doctor.com/finding-your-position-with-geolocation/
    function detectUserLocation(){
      if (navigator.geolocation) {
        var timeoutVal = 10 * 1000 * 1000;
        navigator.geolocation.watchPosition(
          mapToPosition, 
          alertError,
          { enableHighAccuracy: true, timeout: timeoutVal, maximumAge: 0 }
        );
      }
      else {
        alert("Geolocation is not supported by this browser");
      }
      function alertError(error) {
        var errors = { 
          1: 'Permission denied',
          2: 'Position unavailable',
          3: 'Request timeout'
        };
        alert("Error: " + errors[error.code]);
      }
    }
```

This function is going to first ask the user permission to get their location, and then if successful run a new function, ```mapToPosition``` with the results. So we need a ```mapToPosition``` function. Above the ```detectUserLocation``` function add this,

```
    function mapToPosition(position){
      lon = position.coords.longitude;
      lat = position.coords.latitude;
      map.setView(new L.LatLng(lat,lon), 7);
      new L.CircleMarker([lat,lon],{radius: 4}).addTo(map);
    }
```

The final thing we need to do to make this work, is run the ```detectUserLocation``` function. We can run it after the layer first loads. So change our layer loading function as follows,

```
    cartodb.createLayer(map, layerUrl, layerOptions)
     .on('done', function(layer) {
      map.addLayer(layer);
      layers.push(layer);
      detectUserLocation();
    }).on('error', function() {
      //log the error
    });
```

Save your tutorial-5.html file and reload your browser. Your browser should now ask your permission to track your location. After you accept, it should draw a small marker where you are located and zoom in a bit. There is a [known issue](http://stackoverflow.com/questions/5423938/html-5-geo-location-prompt-in-chrome) running this as a local file in your Chrome browser.

## Updating our visualization with new data

Next we are going to want to update our visualization to do something interesting with the user's location data. For this tutorial, we are going to query for the nearest N populated places to the user. Add the following function to your JavaScript,

```js
    var lon, lat;
    var total = 10;
    function updateQuery(){
      layers[0].setOptions({
        query: "WITH cities AS (SELECT cartodb_id, the_geom, the_geom_webmercator, name FROM {{table_name}} ORDER BY the_geom <-> ST_SetSRID(ST_MakePoint("+lon+","+lat+"),4326) ASC LIMIT "+total+") SELECT null as cartodb_id, ST_MakeLine(ST_Transform(ST_SetSRID(ST_MakePoint("+lon+","+lat+"),4326),3857),the_geom_webmercator) as the_geom_webmercator, null as name FROM cities UNION ALL SELECT cartodb_id, the_geom_webmercator, name FROM cities",
        tile_style: "#{{table_name}}{[mapnik-geometry-type = 1]{text-name: [name]; text-face-name: 'DejaVu Sans Book'; text-size: 12; text-fill: #000; text-allow-overlap: false; text-halo-fill: #FFF; text-halo-radius: 2;} [mapnik-geometry-type = 2]{line-color: white; line-opacity: 0.5;} } "
      });
    }
```

This new function is going to do a few things for us. First of all, it is going to update the query being run on the dataset. Now, asking for only the nearest 10 (stored in the variable ```total```) populated places to the person. That is done with this portion of the query,

```sql 
    SELECT cartodb_id, the_geom, the_geom_webmercator, name FROM {{table_name}} ORDER BY the_geom <-> ST_SetSRID(ST_MakePoint(lon,lat),4326) ASC LIMIT total
```

The ```lon,lat``` variables are being set by our function that locates the user and our ```total``` variable defaults to 10. We are also adding a few stylistic flares. We add a bit of SQL that creates a line from the user location to the populated place, 

```sql
    ST_MakeLine(ST_Transform(ST_SetSRID(ST_MakePoint("+lon+","+lat+"),4326),3857),the_geom_webmercator) as the_geom_webmercator
```

Now we'll have both the location of the city and a nice line to connect it to our center location. In our CartoCSS we use two different styles, one for markers and one for lines so we can draw it all on the same map. 

We still need to run the ```updateQuery``` function. To do so, let's update our ```mapToPosition``` function to run ```updateQuery``` when new coordinates are determined. Rewrite it as follows,

```
    function mapToPosition(position){
      lon = position.coords.longitude;
      lat = position.coords.latitude;
      updateQuery();
      map.setView(new L.LatLng(lat,lon), 7);
      new L.CircleMarker([lat,lon],{radius: 4}).addTo(map);
    }
```

Simple! Now, save your file and reload it in your browser again. You should see something like this,

![working](http://i.imgur.com/dhkAr.png)

## Wiring up click events

Now we want to create actions for the buttons on our map. To do so, we are going to use a little JQuery. CartoDB.js uses JQuery already, and when it detects that you haven't loaded it, it makes it available for your use. That way there is no need to duplicate library imports, but don't worry, it will respect any JQuery version you optionally load elsewhere. 

We only need to do two things, update our ```total``` variable based on the button clicked and then run ```updateQuery``` to change the number of populated places displayed on the map. Copy and paste the below into your JavaScript code. 

```js
    $('.button').click(function(){
      $('.button').removeClass('selected'); $(this).addClass('selected');
      total = $(this).attr('id');
      updateQuery();
    })
```

That's it! Save your file again and refresh your browser. You should now find that your four buttons are active. If you click 100 you will find the nearest 1000 populated places to you. 


