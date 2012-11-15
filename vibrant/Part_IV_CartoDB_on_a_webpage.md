Part IV - Webpage of Biodiversity Data  |  ViBRANT Workshop
== 

This tutorial will walk you through a set of basic steps to build basic to advanced maps using CartoDB for your website.

Keep in mind that you can always use the iframe option to embed your maps, but here we are going to show you the more flexible and powerful way of doing it with the cartodb.js library. 

## Data sources

##### Kew GBIF records from Papua New Guinea

 * https://viz2.cartodb.com/tables/papua_new_guinea.shp

#### Protected Planet Papua New Guinea sites

 * https://viz2.cartodb.com/tables/papua_new_guinea_pa.shp

## Playing with the data

Upload the GBIF records to your account and take a look at the map you get

![gbif records](http://i.imgur.com/Lpmsc.png)

Go back to you dashboard and upload the protected areas. When it finishes take a look at your map for this table. It should look something like this,

![protected areas](http://i.imgur.com/hTJvL.png)

I've used the style editor to change the style of my protected areas a bit, 

![protected areas new style](http://i.imgur.com/tBHSE.png)

## Create a gridded density of the GBIF data

Go back to the table you created of your GBIF data. Switch to the Map View. Next, click the Style editor icon on the right side of the map and click the icon with the multicolored hexigons. 

![style editor](http://i.imgur.com/2JjXt.png)

Next, let's change a few parameters to make a bit nicer of a map. First, I like the color ramp, but I'm going to drop the opacity down to 0.6. Next, I'm going to reduce the size down to 3. In the end, your map should look something like this,

![hexagrid](http://i.imgur.com/cKRkt.png)

## Editing the webpage

You can download an HTML template that will help get you started, here,

 * https://raw.github.com/Vizzuality/CartoDB-Tutorials/master/vibrant/template.html

You can open the locally stored file directly in your browser to see what it displays. For now, it should be some New Hampshire elections data, but 
If you open it up in your editor now, you can start playing with some of the settings. One of the first things we should change is what area the map centers on when you load it. This information is given on line number 27 where it says,

    center: [44, -71.6], 

That latitude-longitude pair is somewhere near the center of New Hampshire. Replace the line with the following (a point in Papua New Guinea),

    center: [-6.314993,143.95555],

Save the file. If you now refresh the page where you loaded accident_density.html in your web browser, you should see the map is now centered on Papua New Guinea. I also changed the zoom on 28 to be 6,

    zoom: 6

Save it again. 

## Adding your data to the map

The next step is to get your data on the map. You can do this really easily but going back to the Map View of the papua_new_guinea_pa
 table you already created. Once on the map, click the 'share' button directly above the map. If it warns you to make you table public, go ahead and click the button to do so. Click the button in the upper-right of the pop-up window that says, 'API'. From there you will get a URL. If you click the button to the right of the string it will copy the string to your clipboard (where Cut & Paste values are stored).

Next, go back to your file editor where you opened the HTML file. On line 37 you will find a variable called, layerUrl. This is where the New Hampshire elections data was being loaded. Remove the string inside the quotes and replace it with the string you just copied from CartoDB. Mine looks like,

  var layerUrl = 'http://staging20.cartodb.com/api/v1/viz/502/viz.json';

Save the file. Now head back over to your browser and refresh the page where you loaded accident_density.html. You should see your protected areas! 

![mapped protected areas](http://i.imgur.com/jZwNX.png)

## Adding a second layer

To add a second layer, you need to create a copy of the code segment where we setup the layer, those can be found on 40-43 and are like this,

    cartodb.createLayer(map, layerUrl)
     .on('done', function(layer) {
      map.addLayer(layer);
    });

We are just going to make a second copy right after the first! So now from lines 40-47 it looks like this

    cartodb.createLayer(map, layerUrl)
     .on('done', function(layer) {
      map.addLayer(layer);
    });
    cartodb.createLayer(map, layerUrl)
     .on('done', function(layer) {
      map.addLayer(layer);
    });

If you save it now and take a look, you wont see much change. What it is doing now is loading our protected areas twice! To fix this, add a line between the two copies we made with a new var for layerUrl_b, as follows,

    cartodb.createLayer(map, layerUrl)
     .on('done', function(layer) {
      map.addLayer(layer);
    });
    var layerUrl_b = "";
    cartodb.createLayer(map, layerUrl)
     .on('done', function(layer) {
      map.addLayer(layer);
    });

Also, change the second object so it uses layerUrl_b instead of layerUrl, as follows, 

    cartodb.createLayer(map, layerUrl)
     .on('done', function(layer) {
      map.addLayer(layer);
    });
    var layerUrl_b = "";
    cartodb.createLayer(map, layerUrl_b)
     .on('done', function(layer) {
      map.addLayer(layer);
    });

The last thing you have to do is go back to your CartoDB table where you created the hexagon grid of species from GBIF in Papua New Guinea. Click 'share' and get the API link like we did before for the protected areas. Add it in the quotes for layerUrl_b,

    cartodb.createLayer(map, layerUrl)
     .on('done', function(layer) {
      map.addLayer(layer);
    });
    var layerUrl_b = "http://staging20.cartodb.com/api/v1/viz/501/viz.json";
    cartodb.createLayer(map, layerUrl_b)
     .on('done', function(layer) {
      map.addLayer(layer);
    });

Finally, save your file and refresh your browser to take a look!

![final map](http://i.imgur.com/9zuwA.png)


or head [back to workshop](/Vizzuality/CartoDB-Tutorials/tree/master/vibrant)

or 

Next section - [CartoDB BONUS](/Vizzuality/CartoDB-Tutorials/tree/master/vibrant/Part_V_BONUS.md)

