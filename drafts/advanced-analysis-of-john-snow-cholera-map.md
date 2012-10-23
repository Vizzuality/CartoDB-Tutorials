Advanced analysis of the John Snow Cholera map
== 

##Summary

If you haven't had the chance to go through our tutorial for recreating the John Snow map, we recommend you do that now. But, if you feel confident enough with what we did in that tutorial and want to go further, we are going to do that now. In this analysis, we are going to color cholera occurrences based on the pump they are closest.

## Joining two datasets

Were going to start on the cholera_deaths table you created in the previous tutorial. Reset the style by clicking the Style icon, and selecting 'Simple'. Now open the SQL window. You have probably seen already a few ways to join data from multiple tables in CartoDB but here we're going to show you a new one.

    SELECT 
      the_geom, 
      count, 
      (
        SELECT 
          cartodb_id 
        FROM 
          pumps 
        ORDER BY 
          the_geom <-> cd.the_geom 
        LIMIT 1
      ) as nearest 
    FROM 
      cholera_deaths cd

In the above SQL, we run a secondary query for every. Let's walk through the nested SQL real quick, because it is doing something interesting. Here it is isolated,

    SELECT cartodb_id FROM pumps ORDER BY the_geom <-> cd.the_geom LIMIT 1

Here, we are selecting the cartodb_id from our pumps table where the_geom is nearest to the cd.the_geom. We used cd as an alias for the cholera_deaths table, so this is just the geometry from each row returned in our outer query. The use of <-> in the ORDER BY part of the statement lets you do a nifty ordering by distance. Finally, we limit the result of the inner query to just 1 so that every row of the outer only gets the single closest matching pump. 

Okay, no now back to our original query. By running it, we get every death from cholera linked a pump ID. From there, we can do a lot of cool things. We'll show you a couple.

## Creating polygons from points

Let's start by using a really neat function, ST_ConvexHull, that will draw a border around points and then create a polygon with all the points inside. To do that, let's start by running the following,

    WITH first_query AS (SELECT the_geom, count, (SELECT cartodb_id FROM pumps ORDER BY the_geom <-> cd.the_geom LIMIT 1) as nearest FROM cholera_deaths cd)
    SELECT * FROM first_query

If you run the above and you are looking at the table or map, you'll notice that nothing changes. What we've done is wrapped our query in an initial WITH statement. Using that allows you to perform a query and treat the results just like a new table. So in this case, we call the results first_query, and then perform a SELECT on all the results from the WITH statement. These can be very powerful and help you keep your SQL organized. Let's add something to it,

    WITH first_query AS (SELECT the_geom, count, (SELECT cartodb_id FROM pumps ORDER BY the_geom <-> cd.the_geom LIMIT 1) as nearest FROM cholera_deaths cd)
    SELECT ST_Collect(the_geom) as the_geom,SUM(count),nearest FROM first_query GROUP BY nearest

Now if you run the SQL you should notice the number of rows returned is fewer. We are doing a couple of things here. First, we are using GROUP BY nearest. If you remember, nearest is the cartodb_id of the nearest pump. Combining that with ST_Collect creates a single collection of all points with the same nearest pump. Look at it a second time because this type of query can be used again and again to do neat things with geospatial data.

Now, lets just wrap each collection we created in a ST_ConvexHull call, this will wrap them up into polygons that represent their extent. 

    WITH first_query AS (SELECT the_geom, count, (SELECT cartodb_id FROM pumps ORDER BY the_geom <-> cd.the_geom LIMIT 1) as nearest FROM cholera_deaths cd)
    SELECT ST_ConvexHull(ST_Collect(the_geom)) as the_geom,SUM(count),nearest FROM first_query GROUP BY nearest

This will now return polygons instead of points. So we're going to need to change our Carto style. Click the Style tool icon, then click the Carto tab. Replace the current style with the following,

    #cholera_deaths {
       polygon-fill:#FF6600;
       line-color:#FFFFFF;
       line-width:1;
       polygon-opacity:0.23;
       line-opacity:0.23;
    }

Hit 'Apply style' and you should now be able to see your polygons. If you now want to see the colors shaded by pump, you can change the style again to,

    #cholera_deaths{
       polygon-fill:#FF6600;
       line-color:#FFFFFF;
       line-width:1;
       polygon-opacity:0.23;
       line-opacity:0.23;
      [nearest=1]{
        polygon-fill:red;
      }
      [nearest=2]{
        polygon-fill:green;
      }
      [nearest=5]{
        polygon-fill:blue;
      }
      [nearest=6]{
        polygon-fill:yellow;
      }
      [nearest=8]{
        polygon-fill:black;
      }
    }

There are multiple ways to aggregate data like this other than ST_ConvexHull. Try this for example, which uses ST_Envelope,

    WITH first_query AS (SELECT the_geom, count, (SELECT cartodb_id FROM pumps ORDER BY the_geom <-> cd.the_geom LIMIT 1) as nearest FROM cholera_deaths cd)
    SELECT ST_Envelope(ST_Collect(the_geom)) as the_geom,SUM(count),nearest FROM first_query GROUP BY nearest

If you don't lke that, remeber you can always use the Undo button in the SQL window or in the Carto window. Go ahead and try the Undo in the SQL editor now, you should see your ST_ConvexHull statement come back. Useful! Here are two more neat ones,

#### ST_ConcaveHull

    WITH first_query AS (SELECT the_geom, count, (SELECT cartodb_id FROM pumps ORDER BY the_geom <-> cd.the_geom LIMIT 1) as nearest FROM cholera_deaths cd)
    SELECT ST_ConcaveHull(ST_Collect(the_geom),0.79) as the_geom, SUM(count),nearest FROM first_query GROUP BY nearest

#### ST_Difference - crazy!

    WITH first_query AS (SELECT the_geom, count, (SELECT cartodb_id FROM pumps ORDER BY the_geom <-> cd.the_geom LIMIT 1) as nearest FROM cholera_deaths cd)
    SELECT ST_Difference(ST_Envelope(ST_Collect(the_geom)),ST_Union(ST_Buffer(the_geom,0.0002))) as the_geom,SUM(count), 0 as nearest FROM first_query

## Creating sets of points

Now that we've played a bit with aggregating point geometries into polygons and neat shapes, let's back up and play with points a bit more on their own. First, in the SQL editor, click 'clear view' down at the bottom. You'll probably see things disappear from your map. So, click the Style editor and click the Style Wizard. Next choose 'Simple' from the preset styles. You should now be back to your basic maps of points. 

Next, let's group our points just like we did with the polygons. 

    WITH first_query AS (SELECT the_geom, count, (SELECT cartodb_id FROM pumps ORDER BY the_geom <-> cd.the_geom LIMIT 1) as nearest FROM cholera_deaths cd)
    SELECT ST_Collect(the_geom) as the_geom, count, nearest FROM first_query

We'll want a better style for our points now, so we can see which pump they are nearest to. Put this into your Style editor,

    #cholera_deaths{
      marker-fill: #FF5C00;
      marker-opacity: 0.8;
      marker-allow-overlap: true;
      marker-placement: point;
      marker-type: ellipse;
      marker-width: 7;
      marker-line-width: 2;
      marker-line-color: #FFF;
      marker-line-opacity: 1;
      [nearest=1]{
        marker-fill: red;
      }
      [nearest=2]{
        marker-fill: green;
      }
      [nearest=3]{
        marker-fill: blue;
      }
      [nearest=5]{
        marker-fill: black;
      }
      [nearest=6]{
        marker-fill: yellow;
      }
      [nearest=8]{
        marker-fill: orange;
      }
    }

Have fun!

