New York Policital data using [CartoDB](http://cartodb.com)
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

  - In this case, we hit an error, probably the most common error you will encounter with shapefiles

  - [Spatial Reference](http://spatialreference.org/)

  - In this case, we have an easier fix, use the projection file from our downloaded ny_shapefile.zip

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



Tutorial given in August 2012 by @andrewxhill