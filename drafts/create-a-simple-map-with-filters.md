Filter data to create a map
== 

##Summary

In this tutorial, we are going to upload new data, filter that data with SQL, and then create a map of only the filtered data. This is useful if you intend to make maps that will change as you add, delete, or modify data in a table. It is also a great starting point if you intend to build applications with CartoDB, as it will show you the basics of filtering data. 

## Getting the data

To start, download this list of US Presidents by birthplace (LINK). In it you will find two columns, the president's name. The second file you will need is a shapefile of USA borders (LINK). Download both of these to your computer.

## Georeferencing locality information.

Start by uploading the united_states_presidents.zip. When finished, you'll see that the table has the two correct columns, but lacks any geospatial information. This is because it didn't contain any latitude and longitude at upload. Luckily the file did contain the textual place names for where each president was born. Using CartoDB we can 'georeference' these, turning them from strings into the best available latitude and longitude. 

{NEED INSTRUCTIONS FOR GEOREF IN 2.0}

Now look at the map, you should see a scatter of points for each president! Finally, let's rename our table to something more managable, how about just us_presidents.

## Filtering data

Next, upload the usa_borders.zip file to your account from your dashboard. After it is uploaded you should see a basic table with the_geom and a column called name_1 containing the name of each state. Rename this table if necessary to usa_borders. Take a look at the map. Now, let's try and see only the states where presidents have been born. 

To do this, we are going to have to filter the US states by which of those intersect a point in our us_presidents table. Intersections are one of the most common geospatial queries you will use in CartoDB, so it is good to start getting familiar with this early. There are multiple ways to handle intersections depending on what you need in your result. This one will be basic, only returning those states where intersection exists. Try,

    SELECT usa_borders.the_geom, name_1 FROM usa_borders, us_presidents WHERE ST_Intersects(usa_borders.the_geom, us_presidents.the_geom)

If you are looking at the map, you'll notice that we are seeing only the states where US presidents have been born. We are close! You may also notice a subtle difference in color, this is because the intersection above is doing something slightly different then we want; it is returning the state polygon for every US president, meaning that some states are returned twice. We can modify this a couple of ways to make it work. Try this one,

    SELECT usa_borders.the_geom, name_1 FROM usa_borders, us_presidents WHERE ST_Intersects(usa_borders.the_geom, us_presidents.the_geom) GROUP BY usa_borders.the_geom, name_1

By using the GROUP BY we have collapsed all the duplicates into single rows. If you were wondering why we wrote usa_borders.the_geom instead of just the_geom, go ahead and try it the other way. You find that we get an error, because the_geom exists in both tables in our query, the database doesn't know which to choose. The column name_1 only exists in usa_borders, so there is no confusion with that column.

## Sharing you map

Next, make your table Public, by clicking 'share this map' beside the map tab. After it is Public, click 'share this map' again to get a link or embed code to share the map.  



from V1.0

https://viz2.cartodb.com/tables/usa_borders/embed_map?sql=%0A%20%20%20%20SELECT%20usa_borders.the_geom_webmercator%2C%20name_1%20FROM%20usa_borders%2C%20us_presidents%20WHERE%20ST_Intersects(usa_borders.the_geom%2C%20us_presidents.the_geom)%20GROUP%20BY%20usa_borders.the_geom_webmercator%2C%20name_1





