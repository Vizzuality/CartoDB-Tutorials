## this tutorial uses the OLD libraries, it isn't recommended to do it this way anymore!


Building a basic Leaflet map using [CartoDB](http://cartodb.com)
== 

This tutorial will walk you through a set of basic steps to build an leaflet map using CartoDB. 

Keep in mind that this tutorial was built for users with paid accounts. Free accounts will not have enough space to use the full United States counties shapefile mentioned below.

To see the final application, go here,

[Live Leaflet Map](http://vizzuality.github.com/CartoDB-Tutorials/basic-leaflet-map/index.html)

## Data sources

##### United States county borders

  - http://www.census.gov/geo/www/cob/co2000.html

  - Download the full shapefile, http://www.census.gov/geo/cob/bdy/co/co00shp/co99_d00_shp.zip

#####Youth in adult facilities

  - http://public.tableausoftware.com/views/CountyandStateJail/Sheet3

  - Export the data, [http://vizzuality.github.com/CartoDB-Tutorials/basic-leaflet-map/data/youth_by_county.csv.zip](http://vizzuality.github.com/CartoDB-Tutorials/basic-leaflet-map/data/youth_by_county.csv.zip)

## Fixing shapefiles without .PRJ files

CartoDB needs a .prj file with your shapefile imports. Sometimes, data providers leave them out of the files you download. Take for example the ```co99_d00_shp.zip``` file you just downloaded. Unzip the file and take a look in the directory that is created. You may notice that there is no file with a .prj extension. This is a problem. Often times, this can make the file pretty unusable. One way to try and fix it is to put a .prj file into the directory that contains a generic (i.e. high probability of being used) projection, WGS84. Let's do that with this data file.

 - Download a .prj here, https://raw.github.com/Vizzuality/CartoDB-Tutorials/master/basic-leaflet-map/data/generic_wgs84.prj

 - If it doesn't download staight away, right click it and Save As and save it to your computer

 - Move the file generic_wgs84.prj into the directory containing all the other files of your shapefile

 - You must name the file the same as the others, so in this case rename it to ```co99_d00.prj```

 - Zip all the files back together

Great, now assuming the data in co99_d00 is actually WGS84, it should upload and work fine!


## Building the map

### Upload your data

1. You can drag both of the files you just downloaded (one being the fixed version containing a .PRJ file) directly onto your CartoDB admin page. From there, they will be uploaded and you should be given tables. 
2. After each of the files is uploaded, be sure that we are all using the same table names, rename the table of your county outlines to "usa_counties" and rename your youth jailed data to "youth_jailed".
3. Go to the Map tab in the usa_counties table and play around with some of the styling options.

###A basic choropleth

1. In your "Map" tab, click the dropdown button beside "Visualization Type".
2. Click the "Numeric Choropleth" radio button
3. For column, choose "area"
4. Select any variation for the rest of the style options.
5. You should now have something similar to,

![basic CartoDB choropleth](http://i.imgur.com/l3L29.png)

###Preparing to merge data

1. Take a look at your youth_jailed table on CartoDB
2. Find the column containing the number of youth jailed in any county (each row is a county).
3. For me, the column is called "__of_juvenile_inmates_reported_in_most_recent_survey" and I don't want to ever type that again, so I'll change the name. Double click the name of your column, in the input field type the new name, "total".
4. Below our column now named "total" click the text that says "string" and change the column type to "number".
5. Finally, we will want to join our two tables based on their geometry. However, our youth_jailed table failed to automatically detect the latitude and longitude columns. Click the "georeference" button at the top right. For a longitude column select "longitude_generated" and for a latitude column select "latitude_generated" then click "Georeference".
6. BE SURE that the tables you plan on building into applications are "Public" tables in your CartoDB account, if they are not, change them.

###Basic SQL

Play around with some of the following SQL statements

    SELECT sum(total) FROM youth_jailed


    SELECT state,sum(total) FROM youth_jailed GROUP BY state

You may notice in the last query that "MT" has no value in the sum column result. This is because no value existed in the input table. If you want to remove the row, you can do it manually or as follows,

    DELETE FROM youth_jailed WHERE state = 'MT'
    
###Merge two tables

You will very often want to JOIN data from two tables. In this case, we want to know the county outline stored in our usa_counties table and the count of youth in our youth_jailed table.

Click at the bottom left "SQL" In the window that appears, run the SQL statement below and take a look at the results.

    SELECT 
      name,count(*) 
    FROM 
      usa_counties, youth_jailed 
    WHERE 
      ST_Intersects(
        youth_jailed.the_geom, 
        usa_counties.the_geom
      ) 
    GROUP BY 
      usa_counties.name

Unlike the previous SQL statements we played with, you'll notice that this statement keeps repeating the table names, like, youth_jailed.something. This is so that columns between the tables are confused, and is only required when the tables we are querying at the same time both have a column named the same thing. In this case, it was needed for "the_geom", which does exist in both. 

###Updating your table

Now, we want to use the data stored in our youth_jailed table with the polygons we uploaded into usa_counties. We could do this on the fly from our HTML map actually using the SQL above, but for this tutorial, we are going to join them once and store the results directly in our usa_counties map.

1. Go back to your usa_counties table. You are going to need someplace to store the value, so let's create a new column called "total_youth". To do so, click the down-arrow beside any column name. In the menu that appears, click "Add new column". From there, add a column called "total_youth" and set its type to "number". Hit Create.

Now run an UPDATE SQL statement very similar to the JOIN statement we ran previously,

    UPDATE 
      usa_counties as u
    SET 
      "total_youth" = (
        SELECT 
          count(*)
        FROM
          youth_jailed as y
        WHERE 
          ST_Intersects(
            y.the_geom, 
            u.the_geom
          ) 
        GROUP BY 
          u.name
      )

Finally, you may notice that this leaves a lot of your columns (counties) without a value for total_youth. This is because the jailed_youth table only contains values for counties with < 0. This is fine, and we can actually use it to do some nice styling later.

###Make a new choropleth

Just like you did before, change the style of your usa_counties table. Set it to a choropleth based on this new column that we just created, "total_youth". You should have something like this now, don't mind the gray,

![new choropleth](http://i.imgur.com/e8NMw.png)

To remove the gray, let's change the Carto style a bit. Click "Carto" at the bottom right of the map. In the window that appears, replace the text with the following,

    #usa_counties {
       line-color:#FFFFFF;
       line-width:1;
       line-opacity:0.57;
       polygon-opacity:0.57;
       polygon-fill:transparent;
       [jailed_youth<=415] {
           polygon-fill:#B10026
       }
       [jailed_youth<=19] {
           polygon-fill:#E31A1C
       }
       [jailed_youth<=8] {
          polygon-fill:#FC4E2A
       }
       [jailed_youth<=4] {
          polygon-fill:#FD8D3C
       }
       [jailed_youth<=2] {
          polygon-fill:#FEB24C
       }
       [jailed_youth=1] {
          polygon-fill:#FED976
       }
    }

This just cleans up the style a bit, and makes it so only colors are applied to polygons with jailed_youth>=1 and all others are set to "transparent". Now we have a good looking map. Lets create an HTML page to show it.

###Getting started

You can download the basic starting page from 

[http://vizzuality.github.com/CartoDB-Tutorials/basic-leaflet-map/data/index.html.zip](http://vizzuality.github.com/CartoDB-Tutorials/basic-leaflet-map/data/index.html.zip)

Open the file in a text editor or other tool (DO NOT USE Microsoft Word, Google Docs, or other document editing software. Use something very basic, like Notepad at the very least or an HTML development tool).

###Adding a Leaflet map

Everything you need is there, now you will want to add a map to the page. I've broken this down into two parts, the first deals with getting your base map setup, the second details adding your CartoDB layer to the map. I am not going into adding Pop Up windows here, but can add it later if you need.

###Adding a baselayer

If you drag your index.html file to your webbrowser, it will render the page. You wont see a map yet, so lets add that. In your text editor, replace the line,

    function initialize(){}

with the following


    function initialize(){
      console.log('map running');
      // starting latitude and longitude for our map
      var position = new L.LatLng(40.723713744687274, -93.97566795349121);
      
      // starting zoom
      var zoom = 4; 

      // is our Leaflet map object
      var map = new L.Map('map').setView(position, zoom)
        , mapboxUrl = 'http://{s}.tiles.mapbox.com/v3/cartodb.map-1nh578vv/{z}/{x}/{y}.png'
        //, mapboxUrl = 'http://tile.stamen.com/toner/{z}/{x}/{y}.jpg'
        , basemap = new L.TileLayer(mapboxUrl, {
          maxZoom: 20, 
          attribution: "CartoDB Tutorials"
          });
      map.addLayer(basemap,true);
    }

Save your file and refresh it in your browser. You should now see a basic map. The url pattern,

    http://{s}.tiles.mapbox.com/v3/cartodb.map-1nh578vv/{z}/{x}/{y}.png

Is where your basemap is being defined. This is a basemap we use a lot for examples at Vizzuality. But some other basemaps you could use here are,

    http://tile.stamen.com/toner/{z}/{x}/{y}.jpg

    http:{s}.tiles.mapbox.com/v3/examples.map-4l7djmvo/{z}/{x}/{y}.png

    http:{s}.tiles.mapbox.com/v3/mapbox.world-black/{z}/{x}/{y}.png

There are many more.

![basemap defined](http://i.imgur.com/03mZx.png)

###Add CartoDB layer

Now, we are going to add a basic CartoDB layer. This layer is added using the CartoDB Leaflet libray, be sure to check the documentation ([available here](https://github.com/Vizzuality/cartodb-leaflet)) for more on that library. 

Directly below the line,

    map.addLayer(basemap,true);

Add the following,

      user_name: "viz2"; //change this to your username
      table_name: "usa_counties"
      var cartodb_leaflet = new L.CartoDBLayer({
        map: map,
        user_name:'viz2',
        table_name: 'usa_counties',
        query: "SELECT * FROM {{table_name}}",
        //tile_style: "#{{table_name}}{polygon-fill:red}",
        interactivity: "cartodb_id",
        featureClick: function(ev, latlng, pos, data) {alert(data)},
        featureOver: function(){},
        featureOut: function(){},
        attribution: "CartoDB",
        auto_bound: false
      });
      
      map.addLayer(cartodb_leaflet);

Now, just change it to point at your account by changing this line,

    user_name: "viz2";

Your final map should look something like this, [final leaflet map](http://vizzuality.github.com/CartoDB-Tutorials/basic-leaflet-map/index.html)

![final leaflet map](http://i.imgur.com/nkOZW.png)

That is it, now you have your basic Leaflet Map driven off of CartoDB. If you put this file in your Dropbox Public folder, or share it over email, other people will be able to open it and view what you have made.


Tutorial given in August 2012 by @andrewxhill
