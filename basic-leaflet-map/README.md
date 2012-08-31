Building a basic Leaflet map using [CartoDB](http://cartodb.com)
== 

This tutorial will walk you through a set of basic steps to build an leaflet map using CartoDB. 

Keep in mind that this tutorial was built for users with paid accounts. Free accounts will not have enough space to use the full United States counties shapefile mentioned below.

To see the final application, go here,

[Live Leaflet Map](http://vizzuality.github.com/CartoDB-Tutorials/basic-leaflet-map/index.html)

## Data sources

#####United States county borders

  - http://www.census.gov/geo/www/cob/co2000.html

  - Download the full shapefile, http://www.census.gov/geo/cob/bdy/co/co00shp/co99_d00_shp.zip

#####Youth in adult facilities

  - http://public.tableausoftware.com/views/CountyandStateJail/Sheet3

  - Export the data, http://vizzuality.github.com/CartoDB-Tutorials/basic-leaflet-map/data/youth_by_county.csv.zip

##Building the map

###Upload your data

1. You can drag both of the files you just downloaded directly onto your CartoDB admin page. From there, they will be uploaded and you should be given tables. 
2. After each of the files is uploaded, be sure that we are all using the same table names, rename the table of your county outlines to "usa_counties" and rename your youth jailed data to "youth_jailed".
3. Go to the Map tab in the usa_counties table and play around with some of the styling options.

###A basic choropleth

1. In your "Map" tab, click the dropdown button beside "Visualization Type".
2. Click the "Numeric Choropleth" radio button
3. For column, choose "area"
4. Select any variation for the rest of the style options.
5. You should now have something similar to,

![basic CartoDB choropleth](http://i.imgur.com/l3L29.png)













Tutorial given in August 2012 by @andrewxhill