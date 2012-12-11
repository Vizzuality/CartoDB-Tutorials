Map two layers with CartoDB.js
== 

##Summary

In this tutorial, we are going to show you how to add two layers to your maps at the same time. This is useful if you want to build an application that needs to show different features on the map or if you want to let users toggle layers on your maps. If you are new to CartoDB.js and have not yet had a chance to go through our first tutorial, Creating a basic map, we recommend you start there first. 

## Getting started

I have provided a sample HTML document in the examples zipfile, [download it here](https://raw.github.com/Vizzuality/CartoDB-Tutorials/master/cartodb-js/data/examples.zip), called template.html. Download the zipfile, make a copy of template.html and call it 'tutorial-4.html'. Now open this file in your web browser.

What you should see is a blank, black, canvas. Success! Now, open tutorial-4.html in your code editor. Let's take a look at a couple important things.


#### Data

For this tutorial, we are going to use the Populated Places dataset from naturalearthdata.com. It is the same dataset we have used in the previous tutorials, so you can use the same table again if you already have it. To get it, all you have to do is log in to your CartoDB dashboard. Click 'Common data' below the 'Create a new table' button in the right-hand column. In the window that pops-up, click 'Populated places'. CartoDB will build your new table and take you to it when finished. 

We are going to use a second dataset in this tutorial, of world borders. You can find this dataset in the same menu of common datasets in your CartoDB dashboard.

## Adding your first CartoDB layer

Just like we did in the first tutorial, we are going to add a layer to our map by using the Viz JSON link available from your CartoDB dasboard. You can find it by navigating in your CartoDB account to the world borders table we just created, clicking the Map Tab, then clicking Share, and finally clicking 'API' in the upper right of the window. Copy the link and replace the *layerUrl* below, 

```js
var map;
function init(){
  // initiate leaflet map
  map = new L.Map('cartodb-map', { 
    center: [0,0],
    zoom: 2
  })

  var layerUrl = 'http://viz2.cartodb.com/api/v1/viz/2971/viz.json';

  cartodb.createLayer(map, layerUrl)
   .on('done', function(layer) {
    map.addLayer(layer);
  }).on('error', function() {
    //log the error
  });
}
```

Go ahead and save your tutorial-4.html file. Open it, or refresh it in your browser. You should now see a map of countries around the world. 

![world borders](http://i.imgur.com/IRDYm.png)

#### Turning off interactivity

Sometimes it will be important for you to ensure that there is no interactivity layer for your data. In this case, we are planning on adding a second layer over the world borders, so we don't want any interactivity on our world borders layer. This can be achieved by simply dropping it as follows, 

```js
  cartodb.createLayer(map, layerUrl)
   .on('done', function(layer) {
    map.addLayer(layer);
    layer.interaction.remove();
    layer.interaction = null;
  }).on('error', function() {
    //log the error
  });
```

The two new lines remove any interactivity we have defined in our admin console. This will ensure that the web-page is slowed down by tracking mouse clicks on this layer or downloading unneeded data. 

## Adding a second layer

Adding a second layer is as easy as adding the first. The only difference is that for our second layer we will keep the interactivity layer. The first thing we need is a second Viz JSON URL, you can get it by going to your populated places table, clicking Share, then API, and finally copying the URL. Add it to a new ```layer2Url``` variable right below our where our first layer is added to the map, like follows. 

```js
  var layer2Url = 'http://viz2.cartodb.com/api/v1/viz/2899/viz.json';
```

Next, we'll add the second layer to our map just like we did the first,

```js
cartodb.createLayer(map, layer2Url)
 .on('done', function(layer) {
  map.addLayer(layer);
}).on('error', function() {
  //log the error
});
```

Save your tutorial-4.html and reload it in your browser. You should see points over your countries. Great, but it doesn't look very nice. You can change the style of either layer by now logging into your account and modifying the style in the Style editor. Here is what we came up with using the basic style options,

//A designer, please combine these two datasets nicely



