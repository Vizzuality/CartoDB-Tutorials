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

 * https://raw.github.com/Vizzuality/CartoDB-Tutorials/master/cartodb-js/template.html

If you open it up in your editor now, you can start playing with some of the settings. One of the first things we should change is what area the map centers on when you load it. This information is given on line number 27 where it says,

  center: [44, -71.6], 

That latitude-longitude pair is somewhere near the center of New Hampshire. Replace the line with the following (a point in Chicago),

  center: [41.86, -87.66],