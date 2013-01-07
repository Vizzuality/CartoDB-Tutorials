Interactively changing layers using CartoDB.js
== 

##Summary

Here we are going to show you how to toggle different map states based on user actions (i.e. clicking buttons). This tutorial will help you get familiar with integrating your CartoDB hosted data into your websites in a more dynamic way than just single layer maps. Here we will use a single dataset, world populated areas, and then toggle on and off various portions of the data based on clicking a button. 

## Getting started

I have provided a sample HTML document in the examples zipfile, [download it here](https://raw.github.com/Vizzuality/CartoDB-Tutorials/master/cartodb-js/data/examples.zip), called tutorial-5-template.html. Download the zipfile, make a copy of tutorial-5-template.html and call it 'tutorial-5.html'. Now open this file in your web browser.

You should see a blank map and some buttons. Success! You can play around, but you should notice that the buttons don't do anything! Yet. That is fine. Now, open tutorial-5.html in your code editor and let's get started.


#### Data

For this tutorial, we are going to use the Populated Places dataset from naturalearthdata.com. It is the same dataset we have used in the previous tutorials, so you can use the same table again if you already have it. To get it, all you have to do is log in to your CartoDB dashboard. Click 'Common data' below the 'Create a new table' button in the right-hand column. In the window that pops-up, click 'Populated places'. CartoDB will build your new table and take you to it when finished. 

## Adding your first CartoDB layer

You should now be comfortable with the method of adding layers to your CartoDB map. You will need your API URL for your populated places map in CartoDB. You can find it by navigating in your CartoDB account to the populated places table you just created, clicking the Map Tab, then clicking Share, and finally clicking 'API' in the upper right of the window. Copy the link and replace the *layerUrl* below, 

```js
    var layerUrl = 'http://viz2.cartodb.com/api/v1/viz/3029/viz.json';

    var layerOptions = {
              query: "SELECT * FROM {{table_name}}",
              tile_style: "#{{table_name}}{marker-fill: #F84F40; marker-width: 8; marker-line-color: white; marker-line-width: 2; marker-clip: false; marker-allow-overlap: true;} "
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

Paste the entire block above into your HTML file below where the MapBox layer is aded to the map. Go ahead and save your tutorial-5.html file. Open it, or refresh it in your browser. You should now see the points of all the populated places in the world. 

![Populated places](http://i.imgur.com/tXeSR.png)

#### Wiring up buttons

Now we want to create actions for the buttons on our map. To do so, we are going to use a little JQuery. CartoDB.js uses JQuery already, and when it detects that you haven't loaded it, it makes it available for your use. That way there is no need to duplicate library imports, but don't worry, it will respect any JQuery version you optionally load elsewhere. 

So now, we need two things, the first is going to be a function to run everytime one of our buttons is pushed. Copy and paste the below into your code right beneith where we created our CartoDB layers. 

```js
    $('.button').click(function(){
      $('.button').removeClass('selected'); $(this).addClass('selected');
      LayerActions[$(this).attr('id')]();
    })
```

If you save your file and now refresh your map you'll notice only a small change, our buttons should now change style when you click them, indicating which is selected. This is a start. The piece that is missing is rest of the code to run this line,

```js
   LayerActions[$(this).attr('id')]();
```

The above is looking for an object with elements named the same as our button IDs. This is a handy way for storing our instructions for each button. Let's add the LayerActions object,

```js
    var LayerActions = {
      all: function(){
          layers[0].setQuery("SELECT * FROM {{table_name}}");
          return true;
        },
      capitals: function(){
          layers[0].setQuery("SELECT * FROM {{table_name}} WHERE featurecla = 'Admin-0 capital'");
          return true;
        },
      megacities: function(){
          layers[0].setQuery("SELECT * FROM {{table_name}} WHERE megacity = 1");
          return true;
        }
    }
```

Add the above to your code, save it, and refresh your map. You should now see that the buttons are working to update your map. But why?

## Toggling functions

There are a few ways to toggle data using CartoDB.js. If you are using a single table, one of the easiest ways is to just update the SQL or CartoCSS of the layer already in view. That is waht we do with the ```LayerActions``` functions above. When the button, ```Megacities``` is clicked, we run the following,

```js
   layers[0].setQuery("SELECT * FROM {{table_name}} WHERE megacity = 1");
```

The above updates our layer with new SQL asking only for points where ```megacity= = 1```. We could also use ```setCartoCSS``` to update a style, or if we need to update both at the same time we could do something like the following,

```js
   layers[0].setOptions({
      query: "SELECT * FROM {{table_name}} WHERE megacity = 1",
      tile_style: "#{{table_name}}{ marker-fill: black; }"
    });
```

Another way to toggle layers is to load two layers at the same time and then use ```layer.show()``` and ```layer.hide()``` functions to add and remove them from the map. This is best used if you have multiple datasets on the same map.



