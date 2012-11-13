Density map with a legend
== 

##Summary

Density maps are great ways to show complex underlying data in a simple and visually appealing way. We have developed a couple of custom tools in CartoDB to make it really easy, here I'll show you how to use them. In this tutorial, we are going to use data from 2012 bicycle crash reports in Chicago. This is a really interesting dataset that can be used for a lot of reasons. The data was originally collected by the Illinois Department of Transportation and the most up-to-date datasets can be found over at http://chicagocrashes.org.

For this tutorial you are going to need a code editor that will allow you to edit HTML files. You will probably run into problems if you try to do the tutorial in a document editor such as Word or Open Office, they often add invisible markup that will make your file unreadable by web browsers. We recommend taking a look through the list here, http://en.wikipedia.org/wiki/Source_code_editor. In particular, TextMate or Notepad++ will do the trick. 

## Data sources

You can see some of the original maps here*, and here** but for this work we are going to need the raw data, which you can download here,

	data/crashes_2007_2009.zip

## Preparation

n/a

## Loading the data

Start by loading the data into your CartoDB account. You can do this by dragging the downloaded ZIP file onto your dashboard, or uploading directly from the URL here,

	url to data/bike_crashes.shp

Once your data is loaded, you should be able to view the map right away by clicking the Map View tab. You should be taken to the Chicago area and see points for every crash. 

## Creating a density grid

We have made density grids really easy in CartoDB. All you have to do is go to your Map View and click the Style editing button on the right hand side of the map. Here you will be presented with a Styling Wizard and a Carto editing wizard. For a density map, all you need to do is click the small overview icon with multi-colored hexagons. You can play with some of the settings in the form to customize how your density grid looks. For simplicity later, make sure you only use '5 buckets'.

## Preparing the HTML

Now let's start moving off of our CartoDB admin pages and make this into an HTML webpage that we can publish and share. Of course, you could just embed this map or share the public URL, but we are going to do a bit more here.

Start by making a copy of template.html and rename it to accident_density.html

Go ahead and open the file in your browser. In most cases, you can simply drag the file from your desktop directly onto a new window and it should load. You'll notice right away that this data contains information about New Hampshire, in fact, this is election data generated in the tutorial here (LINK). We are going to use this to get a map of our bike accidents data. 

![template](http://i.imgur.com/muerP.png)

Open the accident_density.html file in your code editor. Leave the webpage open as well, we'll come back to it!

One of the first things we should change is what area the map centers on when you load it. This information is given on line number 27 where it says,

	center: [44, -71.6], 

That latitude-longitude pair is somewhere near the center of New Hampshire. Replace the line with the following (a point in Chicago),

	center: [41.86, -87.66],

Save the file. If you now refresh the page where you loaded accident_density.html in your web browser, you should see the map is now centered on Chicago. Don't worry if you closed your browser, you can reopen the page at any time. 

## Mapping CartoDB layers with Carto.js

The next step is to get your data on the map. You can do this really easily but going back to the Map View of the crashes_2007_2009 table you already created. Once on the map, click the 'share' button directly above the map. If it warns you to make you table public, go ahead and click the button to do so. Click the button in the upper-right of the pop-up window that says, 'API'. From there you will get a URL. If you click the button to the right of the string it will copy the string to your clipboard (where Cut & Paste values are stored).

Next, go back to your file editor where you opened accident_density.html. On line 37 you will find a variable called, layerUrl. This is where the New Hampshire elections data was being loaded. Remove the string inside the quotes and replace it with the string you just copied from CartoDB. Mine looks like,

	var layerUrl = 'http://staging20.cartodb.com/api/v1/viz/483/viz.json';

Save the file. Now head back over to your browser and refresh the page where you loaded accident_density.html. You should see your data! Looking good, but it looks better if you zoom in, let's make it zoom in further at the start of the map. 

## Modifying starting parameters

We have already modified some, the starting latitude-longitude for the center of the map. Now, let's change the zoom. You can find this on line 28,

	zoom: 8

Let's increase that to 10, so,

	zoom: 10

Save the file and refresh your browser to see the change if you like. 

## Adding a legend. 

One thing left is the legend. In the template.html file we provided you we added a very simple way to make a legend. You now have two options: (1) Remove the legend, or (2) Update it for you data. We'll show you both.

#### Remove the legend

Removing the legend is easy, if you would rather update it though, skip to the next section. On line 81 you will find a line that looks like the following,

	CartoDBLegend();

You just need to add '//' to the beginning of the call so that when the page loads, it is skipped. So my line would look like this,

	//CartoDBLegend();

#### Updating the legend. 

The colors and names on the legend are created on lines 58-64. They look like this,

    bins = {
      "#0571B0": "Very Democratic (60%)",
      "#92C5DE": "Mosly Democratic (52%-60%)",
      "#EEEEEE": "Close decision (48%-52%)",
      "#F4A582": "Mosly Republican (52%-60%)",
      "#CA0020": "Very Republican (60%)"
    }

The colors are ones we get from the style we created on CartoDB. So switch back to your crashes_2007_2009 Map View on your CartoDB account. Now, click the Style editor icon on the right of the map. You can find the exact colors set for each bin by clicking the Carto tab within your style editor. My style looks like this,

    #crashes_2007_2009 {
       line-color:#FFFFFF;
       line-width:0;
       line-opacity:0.44;
       polygon-opacity:0.44;
       polygon-fill:#B10026
    }
    #crashes_2007_2009 [points_count<=70] {
       polygon-fill:#E31A1C
    }
    #crashes_2007_2009 [points_count<=30] {
       polygon-fill:#FD8D3C
    }
    #crashes_2007_2009 [points_count<=10] {
       polygon-fill:#FED976
    }
    #crashes_2007_2009 [points_count<=3] {
       polygon-fill:#F8F8F8;
    }

To update my bins in my accident_density.html file, I'm going to cut each of the colors, they are the ones that look like this #B10026 after 'polygon-fill:', from the Carto and paste them into the HTML code where I create the legend. I'm just going to copy them in the order that I see them so that accident_density.html lines 58-64 now looks like this,

    bins = {
      "#B10026": "Very Democratic (60%)",
      "#E31A1C": "Mosly Democratic (52%-60%)",
      "#FD8D3C": "Close decision (48%-52%)",
      "#FED976": "Mosly Republican (52%-60%)",
      "#F8F8F8": "Very Republican (60%)"
    }

Great! But now my labels are wrong. If you look at the Carto editing window again in your CartoDB account, you can see where each of the values is set. For example, where points_count<=70 is becoming this color, #E31A1C. So I'm going to use each of those lines to create the text. So now my lines 58-64 look like this,

    bins = {
      "#B10026": "More than 70 accidents",
      "#E31A1C": "30-70 accidents",
      "#FD8D3C": "10-30 accidents",
      "#FED976": "4-10 accidents",
      "#F8F8F8": "1-3 accidents"
    }

![density map](http://i.imgur.com/5RhPU.png)





