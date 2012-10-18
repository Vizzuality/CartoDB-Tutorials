Creating a basic map of point data
== 

##Summary

This tutorial will walk you through the basics of CartoDB. It is meant for beginners looking to get started using the platform but are uncertain where to begin. It is also a good tutorial to read through if you just want to know some basic functionality when you are getting started. We will cover,

 - Where to find geospatial data

 - Creating a new table

 - Removing unwanted rows

 - Creating a map

 - Sharing your map

Before we get started, make sure you have signed up for an account at CartoDB. You can use a FREE account for this tutorial. 

## Finding Geospatial Data

Many people want to make maps with data but just don't know where to start. While ideally you can upload some of your own data to map, maybe you don't have it yet or need other data to make a more complete visualization. In those cases, it can be good to know a couple of places online to get good geospatial data. 

Here are a couple of our favorites

#### Natural Earth Data

http://www.naturalearthdata.com/

This is data for boarders, coastlines, cities, and many other great resources!

#### OpenStreetMap

http://www.openstreetmap.org/

Here you can get polygons for neighborhoods and cities, or roads and lampposts. 

#### Harvard Election Data Archive

http://projects.iq.harvard.edu/eda/

We use this one a lot. They keep a really fantastic resource of elections data for around the United States.

#### The Global Biodiversity Information Facility

http://data.gbif.org/welcome.htm

GBIF provides a portal to thousands of collections and millions of biodiversity records. If you want to map nature, there is no better place to start.

## Creating a new table

Uploading your own data is easy. We accept many common data formats such as CSV, Excel, ESRI Shapefiles, and GPX files. If you use SHP files, be sure to create a ZIP archive of all associated files (.shp, .prj, .dbx, etc). To upload any of these, either drag them direclty onto the dashboard page of your CartoDB account, or click the 'Create new table' button, locate your file on your system, and click 'Create table'.

For this tutorial, we are going to use some data from our SAMPLE DATA directory. You can locate this in the right panel of your account dashboard. After you click SAMPLE DATA, choose the layer called, 'Stop frisk Bedford'. 

From there you should be taken to a new TABLE view of this data. You now have it in your account and can manage it as you see fit. Take a minute here to explore some of the features in this view. Some of the buttons available will allow you to, ADD A ROW or ADD A COLUMN. Alternatively, you can run SQL to interact with your data. That is something we will go into more depth in a later tutorial, but for now it is good to know that the we rely on Postgresql and PostGIS, so you can use any of the SQL methods common to them. 


## Creating a map

So now you have a dataset you are interested in mapping. Start by clicking the 'MAP VIEW' above your table. A map should appear and your data should be rendered there with some default styles. Okay! Points on a map, mission accomplished. Not so quick, let's look around. You'll see above the map some options for changing the baselayer of your map. Changing the baselayer wont change your data, but it sure can change how your data looks. Click around on some.

Next you'll see that you still have a button to run SQL. What is new are the next two buttons. The first takes you to some tools for styling your map. These include a style wizard and an interface for changing the Carto style. Play around with some of the settings in the wizard to see what they do. By clicking the button again, you can close the interface and go back to just your map. The next button is for customizing the contents of your infowindows.

## Sharing your map

Now that you have your map just the way you want it, let's share it with some friends. To do that, make sure that your map is centered and at the zoom you want to share. Next, click the 'share' button above the top right of the map. From here you can get code to embed the map in a webpage, or a url to share that map via Twitter, Email, or elsewhere. People that open that link will not be able to edit your data, only see it. 

## Bonus: Removing unwanted rows

If you are ready to start digging into some SQL, try this. Scroll to the right through your table until you find the column titled 'crimsusp'. This column lists the crime that the person was suspected for when they were stopped. In our case, let's remove everything that isn't 'GRAFFITI'. The SQL would be like this,

    DELETE FROM stop_frisk_bedford_e WHERE crimsusp != 'GRAFFITI'

But wait! 

If you look through some of the rows, you'll see that graffiti is writen a few different ways. If we want to catch most of them, we will use a query that asks for any row where this column contains the word 'GRAFFITI'. Using ilike, 

    DELETE FROM stop_frisk_bedford_e WHERE crimsusp NOT ilike '%GRAFFITI%'

Now that you've changed your data, open the share link you created above again. You'll notice that that map has changed too! This is because maps are linked to your real data, any changes you make in your table will immediately update anyplace you have posted it. This is a great feature for building apps, sharing projects with collaborators, or keeping track of developing trends. Have fun!




