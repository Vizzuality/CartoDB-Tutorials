Mapping OpenStreetMap data
== 

## Summary

You can find some really useful data at OpenStreetMap and we highly recommed that you support and even contribute to their project. OSM data can help you add roads, parks, buildings, and waterways to your map. We support OSM data import on CartoDB in a couple of different ways. First of all, you can query either the openstreetmap.org data portal for your area of interest, download the data and importer it to your account. Second, you can use one of the many mirrors that often keep small subsets of OSM data specific to areas of themes. Finally, you can use the portal to generate a URL for a specific area and import directly from that URL. Remember, OSM data can get quite large, so on free or small accounts, start by testing small areas. 

In this tutorial, we are going to show you how to select an area on the OpenStreetMap website map interfae, generate a URL to that area, and import that data to your CartoDB account. We will then show you how to run a few basic queries to filter that data.

## Uploading OSM data

Downloading OSM data is easy, for this tutorial we are going to make a quick map of the area around the great pyramids. To do so, first go to http://www.openstreetmap.org. Using the search tool on the left, type 'Dufours Pl' and hit enter. The first matching result is the one we want, click on it. You should now be at an zoomed in view of a small neighborhood in London! 

Next, at the bottom right of the map, click the link that says 'Permalink'. By clicking that link, the URL of the page should change to include the lick that will bring you back to this same view. Copy the URL, and head on over to your CartoDB Dashboard page.

On your dashboard you will click, 'Create a new table'. Then you will paste the URL from your OpenStreetMap widow into the form that pops up. Finally, click 'Create table'.

## OSM data in CartoDB

When you import OSM data into CartoDB you will end up with 4 different tables. One each for Points, Lines, Polygons, and Roads. After your data is loaded, you'll be taken to a view of your Dashboard that only shows these four tables. We are only going to work with the Polygons, so you can go ahead and delete the other 3 right now.

Click on your osm_export_polygon table. First thing we'll do is take a look at the map. You should see outlines for most of the blocks in the neighborhood. When I downloaded the data, there were 3 large polygons that were clearly not buildings and overlapped many of the smaller buildings. Let's start by deleting any of those you see. 

**********




