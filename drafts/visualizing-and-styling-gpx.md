Visualizing and styling GPX data
== 

##Summary

Here we are going to show you how to visualize and syle some of your GPS data. A common format for data collected with GPS devices is a GPX file. Right now CartoDB turns GPX data into a table of points, and every point contains an order number and segment number to tell you how they are put together. In this tutorial, I'll show you how to turn those points back to line segments, and then how to combine the two to make a neat map!

##Example data

If you have a GPX file from some of your biking, hiking, or general moving around, you can actually just drag it onto your CartoDB dashboard and start playing with it. For this tutorial though, we will be using some data from the Alaska Department of Natural Resources.

http://dnr.alaska.gov/parks/aktrails/explore/trailgpsfiles.htm

(we should host the file independantly and link to that for download, just reference this for credit)

We are going to work with the GPX data for Kachemak Bay State Park. Go ahead and either download the file or copy the URL to the GPX file. Next, go to your CartoDB dashboard and either drag the file onto your account or past the URL into the file upload dialog. 

## GPX data in CartoDB

Now you can take a look at the GPX data in your CartoDB account. If you first take a look at your Map view, zoom in to see some of the individual points. You can now see how the GPX data is in fact points, and not long lines. We'll fix that a bit lower in the tutuorial.

If you switch back to the Table view, you can now poke around at some of the columns contained in the data. You'll notice that not many of them have data for this table. A couple that we are interested in are, track_fid and track_se_1. The column track_fid is how we can identify which linestring a point belongs to while track_se_1 tells us how to order the points within a line.

## Linking points back into lines

Okay, it is time to use a little SQL now. For this query, we want to (1) Collect points by their track_fid (2) Order them by their track_se_1 within each group, and (3) Link those points together into linestrings. Let's take it one step at at a time. First, try running this,

    SELECT ST_Collect(the_geom), track_fid FROM kachemakbaysp GROUP BY track_fid

Great, this takes care of (1), we have grouped our points by their track_fid. We don't want a collection of points though, we want a linestring. To do that, we need to do this instead,

    SELECT ST_MakeLine(the_geom), track_fid FROM kachemakbaysp GROUP BY track_fid

Okay! Even closer now. In many cases, this would actually be enough because the order the points are listed in the table is likely the same order they occur in the linestrings. So to be totally certain we are linking them in the right order, let's tell the SQL to order them by our track_se_1 column,

    SELECT ST_MakeLine(the_geom ORDER BY track_se_1 ASC), track_fid FROM kachemakbaysp GROUP BY track_fid 

While ORDER BY is often found at the end of the SQL query, in this case we actually put it into our aggregating funcion, ST_MakeLine. This orders the points within each line independantly. Great, almost there. As always, we want to ALIAS our new linestring as the_geom to ensure that CartoDB knows what this new column is.

    SELECT ST_MakeLine(the_geom ORDER BY track_se_1 ASC) the_geom, track_fid FROM kachemakbaysp GROUP BY track_fid 

(we might need to add a ST_Multi around it depending on how fixed the 2.0 importer is)

You should have been taken to a new table now, called kachemakbaysp_copy. Take a look at the Map view, zoom in enough to see your data, and you should see that we have lines now! Congratulations! 

#### Bonus

You can do some neat things really quickly now. For example, say you wanted to see only a map of the longer trails in you table, you could assume that the longer trails had more GPS points taken for them. So to filter for some of the longest trails try this while looking at the Map view,

    SELECT * FROM kachemakbaysp_copy WHERE 1000<ST_NPoints(the_geom)

## Styling GPX data

Let's start by styling the lines we just created. First, open the Style editor on the right menu of the Map view. Scroll through the options until you see Line Width, increase it to 5 and then make the line color black. 

Alternatively, you can scroll through the options of preset styles and find the one for Choropleth. A choropleth will color your features by binning them by the value of some column. Here, if you create a choropleth for 7 bins on the track_fid column, you get some nice seperation in individual trails! Great stuff! I used the red tone color ramp for my choropleth. 

## Joining two tables

Okay, now we can get a bit more creative. Let's join our points back on top of our lines. To do so, start by opening your SQL console again. You should have a basic query already,

     SELECT * FROM kachemakbaysp_copy

Let's make it explicit which columns we want,

     SELECT cartodb_id,the_geom,track_fid FROM kachemakbaysp_copy

With that, we can use a UNION to get the points as well. Try this,

     SELECT cartodb_id,the_geom,track_fid FROM kachemakbaysp_copy
     UNION ALL
     SELECT cartodb_id,the_geom,track_fid FROM kachemakbaysp

Well, the data came back without errors. But our map hasn't changed. That is because we need to add a style for our points. Open the Carto style editor and this time click Carto. You'll see a lot going on there, in short though, this is how the colors are being chosen for the lines. We now need to add some styles for points. Add the following at the very top,

	 #kachemakbaysp_copy::points {
	   marker-fill:white;
	   marker-width:2;
	   marker-line-color:black;
	   marker-line-width:1;
	   marker-opacity:1;
	   marker-line-opacity:1;
	   marker-placement:point;
	   marker-type:ellipse;
	   marker-allow-overlap:true;
	 }

Now you should have this statement plus all the other stuff that was already in there before. Click 'Apply style' and take a look at the map. The first thing you'll notice is that all your lines turned black! Well... I can assure you they didn't, what is happening is that we just have too many points so they are cluttering things up. Let's change our SQL to fix that.

     SELECT cartodb_id,the_geom,track_fid FROM kachemakbaysp_copy
     UNION ALL
     SELECT cartodb_id,the_geom,track_fid FROM kachemakbaysp WHERE track_se_1 = 1

Nice, now we only have the points at the start of lines. We want more though. Lets add a third layer to grab every 120th point. 

     SELECT cartodb_id,the_geom,track_fid FROM kachemakbaysp_copy
     UNION ALL
     SELECT cartodb_id,the_geom,track_fid FROM kachemakbaysp WHERE track_se_1 = 1
     SELECT cartodb_id,the_geom,track_fid FROM kachemakbaysp WHERE track_se_1 % 120 = 0

Nice, now we have 3 different things to work with. The 'x % y' opperators gets the remainder from x/y, here we want all that divide evenly. Okay, now a trick we use often to style these three dynamic layers is to add a fake column that tells us from which SQL statement the data is coming. 

     SELECT cartodb_id,the_geom,track_fid,'first' as layer FROM kachemakbaysp_copy
     UNION ALL
     SELECT cartodb_id,the_geom,track_fid,'second' as layer FROM kachemakbaysp WHERE track_se_1 = 1
     UNION ALL
     SELECT cartodb_id,the_geom,track_fid,'third' as layer FROM kachemakbaysp WHERE track_se_1 % 120 = 0

Here, we have said that for every row returned in the first statment, add a column called 'layer' with a value 'first'. We do the same for the 'second' and 'third' statements. Simple, if you run that statement, your map wont change. But now let's open our Style editor again and click Carto. Modify the part at the very end that we updated earlier to now look like this,


	 #kachemakbaysp_copy::points {
	   marker-fill:white;
	   marker-width:2;
	   marker-line-color:black;
	   marker-line-width:1;
	   marker-opacity:1;
	   marker-line-opacity:1;
	   marker-placement:point;
	   marker-type:ellipse;
	   marker-allow-overlap:true;
	   [layer='second']{
		   marker-width:4;
		   marker-line-width:4;
	   }
	 }

Now you will notice that there are waypoints along the trails. There are also nice big waypoints at the beginning of each trail. One problem that we still have is that the big waypoints sometimes fall underneith smaller ones, or under lines. We can change the order by modifying the SQL!

     SELECT cartodb_id,the_geom,track_fid,'first' as layer FROM kachemakbaysp_copy
     UNION ALL
     SELECT cartodb_id,the_geom,track_fid,'third' as layer FROM kachemakbaysp WHERE track_se_1 % 120 = 0
     UNION ALL
     SELECT cartodb_id,the_geom,track_fid,'second' as layer FROM kachemakbaysp WHERE track_se_1 = 1

Be sure to make both kachemakbaysp and kachemakbaysp_copy public and you can now share or publish your map!

here is the example in V1.0
https://viz2.cartodb.com/tables/kachemakbaysp_copy/embed_map?sql=%20%20%20%20%20SELECT%20cartodb_id%2Cthe_geom_webmercator%2Ctrack_fid%2C'first'%20as%20layer%20FROM%20kachemakbaysp_copy%0A%20%20%20%20%20UNION%20ALL%0A%20%20%20%20%20SELECT%20cartodb_id%2Cthe_geom_webmercator%2Ctrack_fid%2C'third'%20as%20layer%20FROM%20kachemakbaysp%20WHERE%20track_se_1%20%25%20120%20%3D%200%0A%20%20%20%20%20UNION%20ALL%0A%20%20%20%20%20SELECT%20cartodb_id%2Cthe_geom_webmercator%2Ctrack_fid%2C'second'%20as%20layer%20FROM%20kachemakbaysp%20WHERE%20track_se_1%20%3D%201

