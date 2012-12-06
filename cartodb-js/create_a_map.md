Create a map with CartoDB.js
== 

##Summary

Here we are going to show you how to create a basic map of your CartoDB data using cartodb.js. We'll walk you through creating a map, using the Viz JSON link to your table, and customizing SQL and CartoCSS for your maps. 

CartoDB.js tutorials will all require some knowledge about coding, HTML, and Javascript. If you haven't had a chance to start learning some of these prerequisites, we recommend you browse Google or StackOverflow for some suggested reading and tutorials.

## Getting started

I have provided a sample HTML document in the examples zipfile, [download it here](https://raw.github.com/Vizzuality/CartoDB-Tutorials/master/cartodb-js/data/examples.zip), called template.html. Download the zipfile, make a copy of template.html and call it, tutorial-1.html. Now open this file in your webbrowser.

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

Go ahead and save your tutorial-1.html file. Open it, or refresh it, in your browser. You should be greated by a great big green go light!

![go light](http://i.imgur.com/MVTrq.png)

## Using your own layer

#### Data

For this tutorial, we are going to use the Populated Places dataset from naturalearthdata.com. To get it, all you have to do is log in to your CartoDB dashboard. Click 'Common data' below the 'Create a new table' button in the right-hand column. In the window that pops-up, click 'Populated places'. CartoDB will build your new table and take you to it when finished. 

#### Getting your map Viz JSON link

Now that we have our data, it is time to swap out the big green go light with your own data. To do, stay within the table you just created and navigate to the Map tab, and click 'Share'. If your table is private it will ask you to make it public, do so. Click the 'API' link at the upper right of the window that pops-up.

![share](http://i.imgur.com/ZVg5C.png)

Click the clipboard icon to the right of your Viz JSON URL. This will copy the URL for you to paste elsewhere. Head back over to your code editor and replace the URL I provided to you above with the one for your own map. Now, where layerUrl is being set, it should be set to the map on your account,

```js
var layerUrl = 'http://viz2.cartodb.com/api/v1/viz/2899/viz.json';
```

Go ahead and save your work, then refresh the tutorial-1.html page in your browser.

![points map](http://i.imgur.com/Semi3.png)

## Adding client side SQL and CartoCSS

#### SQL

You can define SQL from within your CartoDB dashboard for tables, but often it is handy to completely control the SQL run from within the code you are writing. Doing it with cartodb.js is simple, we are just going to pass options to cartodb.js when we initiate our layer. A nice and clean way to do it is to create a layerOptions object, just like we created our layerUrl, add this below the line where we create layerUrl,

```js
var layerOptions = {
          query: "SELECT * FROM {{table_name}} where adm0_a3 = 'USA'"
}
```

You notice a few thigns. One, inside the layerOptions I'm passing a 'query' value, this is going to be the query run against the table when the map is loaded. If you aren't yet familiar with SQL you should take a look at some of the [main CartoDB tutorials](http://developers.cartodb.com/tutorials.html). You'll also notice here, that instead of explicitely writing the table name, I'm using a variable {{table_name}}, cartodb.js is going to automatically swap that value out for the right table name defined in our Viz JSON. 

After adding the above to your code, you also need to pass it to cartodb.js when we start our new map. Change the line that currently looks like,

```js
cartodb.createLayer(map, layerUrl)
```

to now look like,

```js
cartodb.createLayer(map, layerUrl, layerOptions)
```

Save your tutorial-1.html file and refresh your browser. Your map should now only be showing populated places in the United States.

![usa populated places](http://i.imgur.com/MevCP.png)

#### CartoCSS

Next, let's change our CartoCSS style a bit. Just like SQL, you can set CartoCSS in your admin console and have it show up here on the map. We want to set it from the code though. To do so, let's modify our layerOptions object as follows,

```js
var layerOptions = {
          query: "SELECT * FROM {{table_name}} where adm0_a3 = 'USA'",
          tile_style: "#{{table_name}}{marker-fill: red} "
}
```

Again, just like SQL, we used the {{table_name}} variable instead of writing it explicitly. Here, we are just going to set the markers to generic red color. Go ahead and save your template-1.html and reload it in the browser.

Congratulations, you now have the basics for creating maps in your webpages. Check out the other tutorials for information on infowindows, click handlers, and some more advanced methods using cartodb.js.

Next - [Infowindows](./adding_infowindows.md)

## A note on cartodb.js and the content delivery network (CDNs)

We've made cartodb.js available through a CDN for you to use. Linking to the CDN version of the library means you'll never have to host it locally and your site visitors will be able to load these files the fastest way possible. You can see these libraries being loaded on lines 3 and 4,

```html
<link rel="stylesheet" href="http://libs.cartocdn.com/cartodb.js/v2/themes/css/cartodb.css" />
<script src="http://libs.cartocdn.com/cartodb.js/v2/cartodb.js"></script>
```

The first is a CSS file that will help you render both the map and other things such as infowindows. The second file is the library itself. Here, we are loading the most recent available version. You can find what that version is by [visiting the GitHub repo](https://github.com/CartoDB/cartodb.js) or by reading the first line in the uncompressed library, [http://libs.cartocdn.com/cartodb.js/v2/cartodb.js](http://libs.cartocdn.com/cartodb.js/v2/cartodb.js). 

If you are using the cartodb.js library on live and tested code, we recommend that you link directly to the version your code has been tested on. This will ensure that no changes we make in the future will disrupt your project. To do so, you simply add the specific version number to the URLs, as in,

```html
<link rel="stylesheet" href="http://libs.cartocdn.com/cartodb.js/v2/2.0.10/themes/css/cartodb.css" />
<script src="http://libs.cartocdn.com/cartodb.js/v2/2.0.10/cartodb.js"></script>
```



