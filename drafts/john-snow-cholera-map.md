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

We are now going to upload two datasets from the John Snow data directory. The first is all the pumps in the neighborhood. The second is all the deaths reported due to cholera in the neigborhood. 




