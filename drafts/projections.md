Projections on CartoDB
== 

##Summary

Not all geospatial data is stored the same way and one of the more common differences is a data source's geospatial projection. What we are all most used to, Latitude and Longitude, describes a point on the closely spherical Earth. However, often maps are made that twist and distort the surface of the world in order to make it lie flat on paper or in the browser. So when we say, [projection](http://en.wikipedia.org/wiki/Map_projection), we are talking about which of those distortions are being used. In CartoDB, we store all your geometries in a single projection called WGS84 using the_geom column. No matter what projection your data is originally in, if we can, we convert it to this common Latitude and Longitude based system. It makes it easy and straight forward for you to manipulate it as needed. 

Something different goes on when we need to show your data on a map. For Google Maps or Leaflet, we use a different projection called Web Mercator. Web Mercator allows us to quickly turn your data into pixels on the map. To make it even faster, we prestore Web Mercator versions of all your data in a hidden column called, the_geom_webmercator. Any time you insert or update geometries in your the_geom column, we update the invisible the_geom_webmercator column in the background.

By doing these transformations behind the scenes, we make it really simple for you to manage and display your data. It also adds a requirement for any custom queries you create where you want to show the result on a map, you must include the_geom_webmercator in your results. Doing so is easy, so let's take a look.

## Introduction to the_geom_webmercator

Start by loading in some sample data from your CartDB dashboard. You can find those options under the 'Creat a new table' button, by clicking 'Sample data'. Let's choose 'Populated places' by clicking it. CartoDB will now load this data and take you to the result.

Let's start by looking at the Map View. What you should see are hundreds of points all over the world. If you click on any of the points, you'll see an infowindow with the data associated with them. Now, switch back to your Table view.

In your table, you should see the_geom column. If you double click one of the cells in this column, you'll see that it is stored in Longitude-Latitude pairs. Notice the order, in CartoDB everythign works the same way we commonly do math X,Y. If you think about X, Y of your coordinates it would be Longitude-Latitude, not the other way around. Scroll right through the table, you'll notice that we don't see the_geom_webmercator anyplace! This is fine, let's find it. 

Click the SQL button on the right. Replace the '*' with the_geom_webmercator as follows,

    SELECT the_geom_webmercator FROM ne_10m_populated_p

My table is named, 'ne_10m_populated_p', change the above if yours is named something differently. Click, 'Apply query'. The result that comes back should be a long set of rows containing data. Great! So there is a column called the_geom_webmercator in your table, we just couldn't see it without asking for it explicitly. 

Now, click the Map view again. You'll notice that all your points are still there! This is because, like I said, we are drawing your maps with the data in the_geom_webmercator column. Click the SQL button again and replace the_geom_webmercator with just, the_geom, and hit 'Apply query'. 

    SELECT the_geom FROM ne_10m_populated_p

You'll notice that all your points disappear! Your query must have the_geom_webmercator in the result.

## Creating new the_geom_webmercator on the fly

Maybe you'll now be wondering, what good is the_geom if you need to have the_geom_webmercator? Well, often it is much easier when you are building applications and tools to be thinking in Longitude-Latitude and so querying the database using those values can be really helpful. 

#### ST_Transform

One way to perform a query on the_geom and get a the_geom_webmercator as a result is to use a function called ST_Transform. Here, try this while still in the Map View,

    SELECT ST_Transform(the_geom, 3857) AS the_geom_webmercator 
    FROM ne_10m_populated_p

After you click 'Apply query' you should see all your points come back to the map! So what we are doing here is simple. First, we are taking the value from the_geom and apply ST_Transform function to it. The number, 3857, is a useful one to remember as in CartoDB it represents the Web Mercator projection. So what we are really doing is telling ST_Transform to transform our WGS84 the_geom to a Web Mercator geometry. Finally, we use the 'AS' command to name our column in the result, the_geom_webmercator. This allows our maps to know what they are looking at. 

#### Conversions with ST_Transform

We can use a hold host of cool functions and even your own custom opperations on the_geom in combination with ST_Tranform so we can see results at the end. For example, try this,

    SELECT ST_Transform(ST_SnapToGrid(the_geom, 4, 4), 3857) 
    AS the_geom_webmercator FROM ne_10m_populated_p

After you run this query, you'll see all your points have lined up into a neat little grid. The grid is 4 degrees by 4 degrees. If you click any of your points, no infowindow will come up. That is because infowindows need a cartodb_id to work, we'll fix that now.

## Transformation with working infowindows

The trick here is simple, ensure that the result from your query contains cartodb_id, and any other columns you wish to show on your map. Try this,

    SELECT cartodb_id, name, ST_Transform(ST_SnapToGrid(the_geom, 4, 4), 3857) 
    AS the_geom_webmercator FROM ne_10m_populated_p

After you run the query, click on one of the points and you should see an infowindow that contains the name of the populated place plus a name.

## Writing the_geom updates

Just to show you how this comes together if you are updating the table, let's try an update.

    UPDATE ne_10m_populated_p SET the_geom = ST_SnapToGrid(the_geom, 4, 4)

You'll notice in the above query that we no longer do the ST_Transform step. This is because we are now going to write the result back to the_geom, not map it live. Go ahead and click, 'Apply query'. After you do so, the query should update itself back to selecting all values from the table. You'll notice that the points are now in the neat grid. This grid is writen directly to your table now! Sorry, maybe you should get rid of this sensless table. Click, 'options' in the upper right, then click 'Delete this table...', finally accept by clicking 'Delete this table'.


