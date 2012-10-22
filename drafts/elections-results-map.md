Mapping Policital data using [CartoDB](http://cartodb.com)
== 

##Summary

This tutorial will walk you through a set of basic steps to build basic to advanced maps using CartoDB

Keep in mind that this tutorial was built for users with paid accounts. Free accounts will not have enough space to use the full United States counties shapefile mentioned below.

To see the final application, go here,

## Data sources

We are going to build this map with data from a great website of United States elections, http://projects.iq.harvard.edu/eda/

Althought there is a lot available, let's focus on New Hampshire

http://projects.iq.harvard.edu/eda/data?dvn_subpage=/faces/study/StudyPage.xhtml?globalId=hdl:1902.1/16219&studyListingIndex=12_3643e60d8277429cf0ef2e3af640

In particular, download the nh_shapefile.zip available under Data & Analysis tab. After the file is downloaded, drag and drop the while ny_shapefile.zip on to your CartoDB dashboard for upload. To understand the data it is often helpful to look at metadata. In this case, go back to the website,

http://projects.iq.harvard.edu/eda/data?dvn_subpage=/faces/study/StudyPage.xhtml?globalId=hdl:1902.1/16219&studyListingIndex=12_3643e60d8277429cf0ef2e3af640

And download the NH-Notes.rtf file and have a look in a text editor. This file will tell you about all the columns and information contained in the file you just uploaded to CartoDB. 

## Map the average Democratic vote share

We can look through the metadata file, NH-Notes to determine what column holds this value. What it tells us is that the column, p_08, is the Democratic vote share for the presidential race in 2008. This will do for us. Click on the Map tab and you should see basic outlines of the New Hampshire counties. 

## Thematic map of results 

Let's create a simple choropleth of this data. Click the Style tool icon on the right. Next, scroll through the thematic map previews, you'll see the one for choropleith (shapes filled with varying colors), click it. 

Now, below the box you clicked, change Column to 'p_08'. For Buckets, choose '5 Buckets'. For a color ramp, choose any for now. Take a look at your map, getting closer!

## Customizing thematic maps

Although CartoDB makes it simple to create thematic maps, we also give you the flexibility to tweak those styles after you have selected them. The map we have created looks okay, but a linear color ramp isn't normal for this data. What the data is showing is anythign greater than 0.5 in the p_08 column was primarily Democrat votes, less than 0.5 Republican votes. Ideally, we could have a diverging scale using the more familiar Red/Blues. 

One great source for basic color scales meant for mapping is [Color Brewer 2](http://colorbrewer2.org/). From ColorBrewer, I've selected a diverging ramp of 5 colors. From red to blue, #0571B0, #92C5DE, #F7F7F7, #F4A582, #CA0020

##### Manually Editing CartoCSS

Now, click the 'Carto' tab in our style tool. This takes you to your editor, notice the Undo/Redo buttons in the lower left. Feel free to play around. Colors on the map are coded in hexidecimal, so #FFFFFF is white and #000000 is black. If you aren't familar with this, we recommend you do a bit of playing around and reading online. I'm going to just paste in my 5 new colors to start, replacing the each hex with one I got from ColorBrewer above. 

(IMAGE)

This is still wrong, we have incorrect bins. You'll notice that our colors don't include the far ends of the spectrum, near 1. So, lets edit the bins to be <=1, <=0.6, <=0.52, <=0.48, <=0.4. (most red), and hit 'Apply style'

(IMAGE)

Still I don't love it, the white in the areas that are split is too bright compared to the rest. Change the color after <=0.52 to #EEEEEE

Great, now you have a nice looking election map!