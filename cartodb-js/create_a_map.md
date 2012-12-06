Create a map with CartoDB.js
== 

##Summary

Here we are going to show you how to create a basic map of your CartoDB data using cartodb.js. We'll walk you through using the vizjson API link to your table, customizing SQL and CartoCSS, and show you where interactivity (click and hover events) can developed for your maps. 

CartoDB.js tutorials will all require some knowledge about coding, HTML, and Javascript. If you haven't had a chance to start learning some of these prerequisites, we recommend you browse Google or StackOverflow for some suggested reading and tutorials.

## Data

For this tutorial, we are going to use the Populated Places dataset from naturalearthdata.com. To get it, all you have to do is log in to your CartoDB dashboard. Click 'Common data' below the 'Create a new table' button in the right-hand column. In the window that pops-up, click 'Populated places'. CartoDB will build your new table and take you to it when finished. 

## Getting started

Now that we have our data, we are going to need an HTML page to start writing our code. I have provided a sample HTML document in the examples zipfile, [download it here](https://raw.github.com/Vizzuality/CartoDB-Tutorials/master/cartodb-js/data/examples.zip), called template.html. Download the zipfile, make a copy of template.html and call it, tutorial-1.html. Now open this file in your webbrowser.

What you should see is a blank, black, canvas. Success. Now, open tutorial-1.html in your code editor. Let's take a look at a couple important things.

## Adding your first CartoDB layer

Using the new cartodb.js library makes adding layers a breeze. The first thing we are going to need is a the layer API URL. I'll explain that next, for now, we can use one of mine. Add a variable containing the URL beneith the map initializer, so on line 17.

```js
var layerUrl = 'http://viz2.cartodb.com/api/v1/viz/2897/viz.json';
```

Now, our Javascript code within tutorial-1.html should look like this,

```js
var map;
function init(){
  // initiate leaflet map
  map = new L.Map('cartodb-map', { 
    center: [0,0],
    zoom: 2
  })

  var layerUrl = 'http://viz2.cartodb.com/api/v1/viz/2897/viz.json';
}
```

Next, we need to tell cartodb.js to load the layer on the map. We do this using the createLayer method. A very basic map can be loaded like this,

```js
cartodb.createLayer(map, layerUrl)
 .on('done', function(layer) {
  map.addLayer(layer);
}).on('error', function() {
  //log the error
});
```

Go ahead and add this below the line where you create the layerUrl variable. So now, the complete Javascript portion of your file should look like this,

```js
var map;
function init(){
  // initiate leaflet map
  map = new L.Map('cartodb-map', { 
    center: [0,0],
    zoom: 2
  })

  var layerUrl = 'http://viz2.cartodb.com/api/v1/viz/2897/viz.json';

  cartodb.createLayer(map, layerUrl)
   .on('done', function(layer) {
    map.addLayer(layer);
  }).on('error', function() {
    //log the error
  });
}
```

Go ahead and save your tutorial-1.html file. Open it, or refresh it, in your browser. You should be greated by a great big green Go light!

![go light](http://i.imgur.com/MVTrq.png)







## A note on cartodb.js and the content delivery network (CDNs)

We've made cartodb.js available through a CDN for you to use. Linking to the CDN version of the library means you'll never have to host it locally and your site visitors will be able to load these files the fastest way possible. You can see these libraries being loaded on lines 3 and 4,

```html
<link rel="stylesheet" href="http://libs.cartocdn.com/cartodb.js/v2/themes/css/cartodb.css" />
<script src="http://libs.cartocdn.com/cartodb.js/v2/cartodb.js"></script>
```

The first is a CSS file that will help you render both the map and other things such as infowindows. The second file is the library itself. Here, we are loading the most recent available version. You can find what that version is by [visiting the GitHub repo](https://github.com/CartoDB/cartodb.js) or by reading the first line in the uncompressed library, [http://libs.cartocdn.com/cartodb.js/v2/cartodb.js]](http://libs.cartocdn.com/cartodb.js/v2/cartodb.js). 

If you are using the cartodb.js library on live and tested code, we recommend that you link directly to the version your code has been tested on. This will ensure that no changes we make in the future will disrupt your project. To do so, you simply add the specific version number to the URLs, as in,

```html
<link rel="stylesheet" href="http://libs.cartocdn.com/cartodb.js/v2/2.0.10/themes/css/cartodb.css" />
<script src="http://libs.cartocdn.com/cartodb.js/v2/2.0.10/cartodb.js"></script>
```



