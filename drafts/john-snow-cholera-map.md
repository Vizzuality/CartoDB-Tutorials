Recreating the John Snow Cholera map
== 

##Summary

At CartoDB we obviously love maps and nobody that really loves map can't tell you who John Snow was. If you haven't heard of him, we highly recomment reading a bit about his story and how he has changed maps and the science of disease spread. In a nutshell, he helped map an 1800s cholera outbreak that took place in London. By doing so, he was able to identify the water pump that was the source of the bacteria causing the outbreak. Below is the map he created.

(MAP)

The data that is contained in that map was recently coverted into digial formats. Making it simple to get them into CartoDB. So let's try and create a CartoDB version of John Snow's famous map!

## Getting the data

We suggest you read the blog post about the data over here, http://www.r-bloggers.com/john-snow%E2%80%99s-famous-cholera-analysis-data-in-modern-gis-formats/

Next, download the updated dataset over here, http://blog.rtwilson.com/updated-snow-gis-data/ and unzip the file.

## Uploading shapefiles

We are now going to upload two datasets from the John Snow data directory. The first is all the pumps in the neighborhood. The second is all the deaths reported due to cholera in the neigborhood. When you upload shapefiles, you need to be sure to upload all associated files at once, this can be done by creating a ZIP that contains each of them. So, for the pumps, create a zipfile containing each of the following,

 - Pumps.shp
 - Pumps.prj
 - Pumps.sbx
 - Pumps.shx
 - Pumps.dbf

Select them and create a new zip, call it something easy, Pumps.zip for example. Now, we will do the same with the cholera deaths. Select and create a zip of the following files,

 - Cholera_Deaths.shp
 - Cholera_Deaths.prj
 - Cholera_Deaths.sbx
 - Cholera_Deaths.shx
 - Cholera_Deaths.dbf
 - Cholera_Deaths.sbn

 Again, call it something simple, like Cholera.zip for example. Now, start by dragging our Pumps.zip file to your dashboard. You should end up with a table simply called, pumps. Next, go back to your dashboard by clicking the CartoDB logo at the upper left of the screen. Now, drag your Cholera.zip file to your dashboard. Great! You should now have a table called cholera_deaths. 

 ## Mapping the cholera outbreak

 You can start by looking through your new cholear_deaths table. You should see that we have a point geometry. Each point represents a household in 1854, Soho neighborhood of London. If you look at your map, they may not match the modern day streets exactly, but still pretty neat still! If you go back to your cholera_deaths Table view, you'll see also a column called 'count', this tells us how badly it hit each household. This will be the value we want to style our data on.

 Head back to your Map view. To make this data communicate the intensity of cholera in each household, let's make a thematic map. Click the Style tool button on the right of the screen. Take a look at the out-of-the-box styles provided, if you mouse over them, you'll find one named, 'Bubbles', that's the one we'll use. Click it. Below that, change the Column drop down and select 'count'. The map should update right as you click it, pretty neat? It doesn't look the best it can though. Do each of the following,

  - Change the Radius (min-max) to, 1 to 8. 

  - Change the color, I choose one of the Red tones to help convey that these were bad! 

  - I also changed the opacity (the decimal number to the right of the color) to be 1, fully opaque. 

  - Finally, I changed my Bubble stroke to gray. 

Cool, now we have the intensity of the outbreak mapped. What John Snow did that was so critical to this story, was he mapped the location of water pump stations as well. This gave him the ability to quickly identify a shared source and make the hypothesis that a pump was the source of the outbreak.

## Combining two layers with SQL

If you have done any of the other tutorials, you'll be familiar with this already. We are going combine the data from your pumps table and your cholera_deaths table in a single SQL statement. Try the following SQL,

    SELECT cartodb_id, the_geom, count, 'cholera' as layer FROM cholera_deaths
    UNION ALL
    SELECT cartodb_id, the_geom, NULL as count, 'pump' as layer FROM pumps

After you run this, you wont notice a difference in your map. What we are doing is selecting the_geom from each table. From the cholora_deaths table we are selecting count so that we can base our bubble size on the value. When we UNION tables, we must have the same columns in each table, so for the pumps table, I fake a count column with a value of NULL in every row. Finally, I include a fake column for both tables that stores a name for the layer it belongs to. This technique is useful for Carto styles, as you'll see now.

## Styling multiple layers at once

Now that we have our SQL running, we can edit our Carto manually to show our pumps in an interesting way. Click the Style tool icon again and then click on the Carto tab. You'll see the style that CartoDB is using to create your bubble map. Now we can add a couple things to it to make it show our pumps data as well. 

Scroll all the way to the bottom of the existing Carto style. At the end, you are going to add these lines.

    #cholera_deaths [layer='pump'] {
      marker-width: 6.0;
      marker-fill: #EEEEEE;
      marker-line-color: black;
      marker-line-width: 2;
      marker-line-opacity: 1;
      marker-opacity: 0.5;
      marker-placement: point;
      marker-type: ellipse;
      marker-allow-overlap: true;
    }

What this does is says, if the layer column (the one we created in the SQL statement above) contains the value, 'pump', we are going to style it differently. After adding that to the very end of your Carto style, hit Apply style and take a look!


## Choosing a basemap

Pending... What is our default basemap going to be in 2.0? The current OSM one doesn't have high enough zoom for the John Snow map.

## Sharing your map

Now you'll want to share your map. Like always, be sure that both your pumps table and your cholera_deaths table are public. From the current view on the map, click 'Share'. In the upper right click 'URL'. Now select and copy the whole URL string it provides. Next, head on over to Twitter and tell people about the awesome maps you are making!

//result on 2.0,

https://staging20.cartodb.com/tables/cholera_deaths_2/embed_map?sql=SELECT%20the_geom_webmercator%2C%20count%2C%20'cholera'%20as%20layer%20FROM%20cholera_deaths_2%0AUNION%20ALL%0ASELECT%20the_geom_webmercator%2C%20NULL%20as%20count%2C%20'pump'%20as%20layer%20FROM%20pumps_1%0A








