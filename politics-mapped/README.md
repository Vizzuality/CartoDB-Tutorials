Mapping Policital data using [CartoDB](http://cartodb.com)
== 

This tutorial will walk you through a set of basic steps to build basic to advanced maps using CartoDB

Keep in mind that this tutorial was built for users with paid accounts. Free accounts will not have enough space to use the full United States counties shapefile mentioned below.

To see the final application, go here,

## Data sources

#####Great website of United States elections data

  - http://projects.iq.harvard.edu/eda/

## Playing with the data

#### Let start with a quick map of New York data

  - http://projects.iq.harvard.edu/eda/data?dvn_subpage=/faces/study/StudyPage.xhtml?globalId=hdl:1902.1/16320&studyListingIndex=2_3cfc56a7c5a06219bd1114590f1c

  - In particular, the ny_shapefile.zip available under Data & Analysis

  - Drag and drop the downloaded ny_shapefile.zip to your CartoDB dashboard

![ny_final](http://i.imgur.com/404lg.png)

#### Let try it again with the Louisiana data

  - http://projects.iq.harvard.edu/eda/data?dvn_subpage=/faces/study/StudyPage.xhtml?globalId=hdl:1902.1/16819

  - Again, download the la_shapefile.zip and upload it to your account

##### Solving projection (PRJ) errors

![prj error](http://i.imgur.com/PPW1f.png)

In this case, we hit an error, probably the most common error you will encounter with shapefiles

One resource, [Spatial Reference](http://spatialreference.org/)

In this case, we have an easier fix, use the projection file from our downloaded ny_shapefile.zip

  - First, unzip our ny_shapefile.zip and our la_shapefile.zip.

  - Second, copy the file, ny_final.prj into the la_shapefile directory

  - Third, all files in a shapefile must share the same root name, so rename the copied file from ny_final.prj to la_final.prj

  - Finally, zip our la_final directory back into a ZIP and upload it to CartoDB

#### Understanding the data

  - http://projects.iq.harvard.edu/eda/data?dvn_subpage=/faces/study/StudyPage.xhtml?globalId=hdl:1902.1/16320&studyListingIndex=2_3cfc56a7c5a06219bd1114590f1c

  - Download the New York.rtf file and have a look

##### Map the total voting population per district

  - Go to the Map tab in ny_final on CartoDB

  - Click Visualization type

  - Select Numeric Choropleth

  - Under Column, select 'sum_vap'

  - Play with the # of buckets and your Color ramp, Border, Opacity settings

![Total voting population](http://i.imgur.com/csGQw.png)

##### Try the same with the Average Democratic vote share

![Average Democratic vote share](http://i.imgur.com/3j8xY.png)

#### A touch of CartoCSS styles

The above map looks okay, but a linear color ramp isn't normal for this data. What the data is showing is anythign greater than 0.5 was primarily Democrat votes, less than 0.5 Republican votes. Ideally, we could have a diverging scale using the more familiar Red/Blues. 

One great source for basic color scales meant for mapping is [Color Brewer 2](http://colorbrewer2.org/). Side note, here is a recent piece on the Guardian Data Blog referencing both color ramps on maps and Color Brewer, (http://www.guardian.co.uk/news/datablog/2012/apr/13/mapping-colours-open-journalism-storify)[http://www.guardian.co.uk/news/datablog/2012/apr/13/mapping-colours-open-journalism-storify].

I've selected a diverging ramp of 5 colors. From red to blue, #CA0020, #F4A582, #F7F7F7, #92C5DE, #0571B0

##### Manually Editing CartoCSS

  - Click the 'Carto' button in the lower left of your map

![carto editor](http://i.imgur.com/L9cuA.png)

  - This takes you to your editor, notice the Undo/Redo buttons in the lower left. Feel free to play around. I'm going to just paste in my 5 new colors to start.

![new color ramp](http://i.imgur.com/vBYgP.png)
  
  - This is still wrong, we have incorrect bins. Now, lets edit the bins to be <=1, <0.8, <0.6, <0.4, <0.2 (most red)

![linear color ramp](http://i.imgur.com/8nZLf.png)

  - still don't love it, we could either add more bins and greater level of intermediate levels, or we can condense our ramp toward the middle. Here I do that and make the white more gray

![modified color ramp](http://i.imgur.com/145p9.png)

    #ny_final {
       line-color:#FFFFFF;
       line-width:0;
       line-opacity:0.8;
       polygon-opacity:0.8;
    }
    #ny_final [av<=1.0] {
       polygon-fill:#0571B0
    }
    #ny_final [av<=0.6] {
       polygon-fill:#92C5DE
    }
    #ny_final [av<=0.52] {
       polygon-fill:#ddd
    }
    #ny_final [av<=0.48] {
       polygon-fill:#F4A582
    }
    #ny_final [av<=0.4] {
       polygon-fill:#CA0020
    }

#### SQL queries

Now, we will start using probably the most powerful feature of CartoDB, the ability to run SQL. SQL is everywhere, you can use it in the admin console, in embedded maps, in the Maps API, and obviously in the SQL API.

  - Start by going to the Table tab of you ny_final table

  - At the column 'vap' click the down button

  - Click 'Order by DESC'

  - Scroll back over to see the vap column now reordered

Behind the scenes this UI based option is just running SQL. You can run the similar by,

  - Click the button, 'SQL' in the lower right of your table.

  - Enter the following

    SELECT * FROM ny_final ORDER BY vap DESC

  - Press 'apply query'

Take note now that the '*' roughly means all, so you are asking for all columns that come with your result. Alternatively, if you would like to see just the ordered column, run the following,

    SELECT vap FROM ny_final ORDER BY vap DESC



#### Modifying data

Now we are going to go through doing a geospatial intersection and manipulation. I don't particularly like the way so much water body area is included in the above map, so now I am going to show you how to crop the area down by a more refined NY State border file.

  - Start by downloading a states boarder file, http://viz2.cartodb.com/tables/1738.shp

  - Upload the file to your account, rename it usa_admin

##### Performing a geospatial join

  Before you run any updates on geometry, you can always backup your table by Duplicating it or downloading it. If tables are not too large, you can also perform a modification 'live' and view the results without writing them back to the database.

    - 





Tutorial given in September 2012 by @andrewxhill