Create your first map with CartoDB
== 

##Summary

In this tutorial, we are going to create a map of global forest coverage per country. The tutorial is going to use data from the [World Bank](http://data.worldbank.org/) open data repository and [Natural Earth](http://www.naturalearthdata.com/). We will walk you through the basics of creating maps in CartoDB. From uploading data, to creating custom styles, to sharing or embedding a public map. 

## Signing up for CartoDB

For this tutorial you will need a free account from CartoDB. Head over to [CartoDB.com](http://cartodb.com) and get your account now.

## The data

We will be using a set of percent forest coverage per country from the World Bank. The original data can be found [here](http://data.worldbank.org/indicator/AG.LND.FRST.ZS). The data covers four years, 1990, 2000, 2005, and 2010 and tells us how much forest coverage was measured in each of those years per country. We cleaned this data up for you and made it available for download here,

[Global Forest Data](https://viz2.cartodb.com/api/v2/sql?q=SELECT * FROM forestdata &format=shp)

Download the data to your computer now. 

## Uploading data

By now your CartoDB account should be ready. Head over to [CartoDB.com](http://cartodb.com) and sign into your account. Uploading data is easy. Simply drag the ZIP file you downloaded above directly onto your account dashboard. It should begin uploading. If it doesn't upload for you immediately, click the button to upload data manually, select the ZIP file, and wait for it to finish uploading.

## Exploring your data

After your data has finished uploading, you should be taken to the table viewer. The table allows you to quickly view your data and make sure everything was uploaded correctly. 

![Imgur](http://i.imgur.com/QyetW9Y.png)

In the upper left-hand side of the screen is your tablename. If you click the tablename, it will become editable and you can change it to anything you like. Let's go ahead and change our tablename to 'forest_per_country'.

From this screen you can also perform SQL statements to examine or modify your data. SQL is a language that lets you talk to the database, you wont need it much to get started, but the more you learn the more powerful CartoDB becomes. We'll try a little later. For now though, let's check out the map. Click 'Map' right above your table. 

![Imgur](http://i.imgur.com/Axv6dmD.png)

## Mapping data

This is where you will style your map and make look just right before you publish it. We provide some simple ways to style your data quickly, but using SQL and CSS you have pretty unlimited options. First, let's use one of the style wizerds. You can find them by clicking the paintbursh button to the right of the map.

#### Bubble maps

In the tray that pops out, try clicking the third option, the bubble map. 

![Imgur](http://i.imgur.com/WJp0dWC.png)

You'll see that your country borders disappear and you have bubbles for each country. You can play with the options below now to try and forest coverage per country for the given years. 

![Imgur](http://i.imgur.com/eZFK0lC.png)

#### Choropleths

Now, let's play with the second map style, the choropleth.

![Imgur](http://i.imgur.com/pbOoM4l.png)

The choropleth uses many of the same options as a bubble map, but instead colors the polygon of each country based on a value attributed to that polygon. Play with some of the options, changing the column being colored and the color ramp etc. Try to make some interesting choropleths from the forest coverage data. 

![Imgur](http://i.imgur.com/rdRmlnN.png)

#### Basemaps

Selecting the right basemap for your data can be important. CartoDB gives you a lot of options. Try playing with some of the different basemap types available, you can select the different basemaps by clicking the buttons directly above your map.

![Imgur](http://i.imgur.com/rBi1HQX.png)

Sometimes with graphics like the one we are creating it is even nice to have no basemap at all! You can do that by selecting a color all the way to the left of the basemaps options.

![Imgur](http://i.imgur.com/eQtcSVO.png)

#### Labels

The style wizard makes it pretty straight forward to add labels to any of your visualizations. Right beneith the settings for your choropleth, you can select label options.

![Imgur](http://i.imgur.com/maX98zo.png)

In our case, I've chosen to use the 'name' columm for my lables and left all the rest defaults. 

![Imgur](http://i.imgur.com/ymGpYVD.png)

## Data analysis

CartoDB is really great for data analysis, but to use it, you'll need to do a little bit of SQL. Here, we'll start with just a basic query to write a new value to our table. First, start by clicking 'Table' to go back to your table view. Next, we are going to add a new column. You can add columns by clicking the drop-down arrow beside any existing column, and then clicking 'Add new column'

![Imgur](http://i.imgur.com/V548Skk.png)

Let's add a column named 'deforestation' and make the type 'numeric', finally click 'Create column'.

![Imgur](http://i.imgur.com/itMfNyp.png)

Great, we should now have the column in our table, but it wont have any values yet. Let's add the difference between forest coverage in 2010 and what was found in 1990 to our new column. We'll need a little SQL now. Click the button, 'SQL' to the right of our table.

In the window that slides out, we can enter whatever we like. Right now, it should say,

    SELECT * FROM forest_per_country

That is SQL for selecting everything from a table. Now, enter the following SQL and click Apply query,

    SELECT f_1990 - f_2010 FROM forest_per_country

![Imgur](http://i.imgur.com/bTyfyY6.png)

Great! You should now see the difference in percent from 1990 to 2010. Instead, let's get relative change, so run this,

    SELECT (f_1990 - f_2010)/f_1990 FROM forest_per_country

This will tell us what percent of 1990 level forests have been depleted. 

Now, we want to store this value in the 'deforestation' column we created. To do this, we'll run an UPDATE instead of a SELECT. Insert the following SQL and hit Apply query,

    UPDATE forest_per_country SET deforestation = (f_1990 - f_2010)/f_1990

After it finishes running, it should go back to the default query selecting everything from your table. Scroll through the columns of your table and see that the column, 'deforestation' now has values in it. Cool!

Now, I'm going to flip back to my 'Map' tab and change the style to a choropleth showing the deforestion amount in each country using a red color ramp,

![Imgur](http://i.imgur.com/8sfRwYH.png)

That's it!

## Sharing and embedding the map

So now we have a pretty interesting map, let's share it with others. The first thing to do is add a description, you can do that by clicking the text right below the table name and writing in a description. I added the following, 'Map of deforestation per country from 1990 to 2010 created for CartoDB #scio13 workshop',

![Imgur](http://i.imgur.com/ufLiaBc.png)

Next, click the 'share' button to the right of the basemap selections. In the menu that pops up you'll have a couple of options. The first is just a URL that will allow you to tweet or email your map to others. The second is EMBED, which can be used in blogs or webpages to add maps easier. Click the 'EMBED' option in the upper right of the menu.

![Imgur](http://i.imgur.com/yDi0Mg1.png)

From here, you can choose the look and feel of your map. In the small overview map, you can change the zoom and center the map wherever you want it; I made mine zoomed out far enough to show the full map. You can also toggle some specific options about whether to include a name, description etc with your map. After you have the map just how you want it, go back to URL. Go ahead and copy the map URL and try emailing it to someone. 

Good work!

# Bonus

Download a template HTML index file here,

[HTML Template](https://raw.github.com/Vizzuality/CartoDB-Tutorials/master/scio13/data/index.html.zip)

Unzip the file locally. Next, drag the index.html file to your web-browser. It should open up a webpage with a blank map. Great!

Next, open the file in a code editor of choice. Any basic text editor will work, more complex document editors such as Word will not.

### Basic CartoDB.js intro

This is a template for a basic webpage plus infowindows. You need to do a couple of things to make this work with the map you just created. The first, is you need to go back to your map on CartoDB. Click 'share', and then select the 'API' option in the upper right. This will give you the URL to your layer to use in the html. 

Now, go down to line 58 in the index.html file, it should look like this,

    var layerUrl = "";

Add your URL to this variable, so now it should look something like this,


    var layerUrl = 'http://viz2.cartodb.com/api/v1/viz/3104/viz.json';

This Viz JSON tells the webpage how to load your layer. Go ahead and save the file. Reload it in your webpage. Congrats, you should have your data on the map!

Now, if you want the infowindows to work, head back to your map on your CartoDB account. Click the infowindow button to the right of the map (3rd one down). Scroll to the very bottom and click the toggle button to turn all fields on. Now, go back to index.html in your web browser and refresh. Now, click any country and take a look. This is a very basic example I did using the values from your infowindow to actually construct graphs, you can do whatever you want here by using the templating method in the file. 

### Infowindow templates

The infowindow in index.html is defined in this portion of the document,

```html
  <script type="infowindow/html" id="infowindow_template">
    <div class="cartodb-popup">

      <a href="#close" class="cartodb-popup-close-button close">x</a>

       <div class="cartodb-popup-content-wrapper">
         <div class="cartodb-popup-content">
           <h3>{{content.data.name}}</h3>
           <p>
           <img style="width: 100%" src="http://chart.apis.google.com/chart?cht=bhg&chs=550x230&chd=t:{{content.data.f_1990}},{{content.data.f_2000}},{{content.data.f_2005}},{{content.data.f_2010}}&chxt=x,y&chxl=1:|1990|2000|2005|2010&chxr=0,0,{{content.data.f_1990}}&chds=0,{{content.data.f_1990}}&chco=4D89F9&chbh=35,0,15&chg=8.33,0,5,5"></src>
           </p>
           <!-- content.data contains the field info -->
         </div>
       </div>
       <div class="cartodb-popup-tip-container"></div>
    </div>
  </script>
```

Besides the ```<script>``` portions, you can edit this just like it is HTML to render however you like. In combination with CSS and JS you can do tons here. You can see for example, that I'm using the old Google Charts Static API (now depricated, don't get used to using it!), and dropping in values from CartoDB on the fly, those values are added to the string anywhere you see the {{ }} double-curly around text. So for example,

    {{content.data.f_1990}}

Is where I swap in the f_1990 value. Play around, have fun. Lots more tutorials are in this github repository and our supported ones can be found over [on the developers site](http://developers.cartodb.com/tutorials.html)

:)