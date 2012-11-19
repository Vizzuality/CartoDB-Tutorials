Create an intensity map from point data
== 

##Summary

In this tutorial, we are going to show you how to use some advanced styling techniques to view your data in a new way. The outcome will be an intensity map of points data. We will then show you how to change your baselayer style to better view this new style.

## Getting the data

we are going to use data from 2012 bicycle crash reports in Chicago. This is a really interesting dataset that can be used for a lot of reasons. The data was originally collected by the Illinois Department of Transportation and the most up-to-date datasets can be found over at http://chicagocrashes.org. We have a version of it available for you here, 

[../cartodb-js/data/crashes_2007_2009.zip](../cartodb-js/data/crashes_2007_2009.zip)

Start by uploading the data to your CartoDB account. After it has uploaded, you should have a table called, crashes_2007_2009. Click the table name and change it to crashes_2007_2009_intensity.

## Changing your baselayer

For this map we are going to want a darker basemap. Changing basemap styles is easy in CartoDB. You can use one of our presupplied basemaps from Mapbox, Google, or Stamen, or you can create your own externally and add it to your account. For this tutorial, we will just use one of the existing basemaps, the Graphite map from Mapbox. To change the basemap of your current map, just click the icon found above the map for the Stamen tileset. You can tell which it is by hovering your mouse over the icons until you locate the one, Graphite (Mapbox). 

(ACTUALLY, @damagedgoods, can you decide at the end of this whether Graphite or the Stamen Toner map looks better with this data?)

## Styling the data

Click on the Map view in your new table. If you take a look at the map now you should just see a big cloud of points over the Chicago streets. Each point represents a cycling accident over the 2 year span starting in 2007. What we want instead is to show some representation of intensity. 

Click the Style editor icon on the right of the map. Here you can see some preset style methods, we are going to make something of our own. To do this, click CartoCSS. The default style that you see on the map is the one you see written here, 

```css
#crashes_2007_2009_intensity {
  marker-fill: #FF6600;
  marker-opacity: 1;
  marker-width: 8;
  marker-line-color: white;
  marker-line-width: 3;
  marker-line-opacity: 0.9;
  marker-placement: point;
  marker-type: ellipse;
  marker-allow-overlap: true;
}
```

We are now going to change our style to this,

```css
#crashes_2007_2009_intensity {
  marker-fill: #11ff66;
  marker-opacity: 0.04;
  marker-width:18;
  marker-line-color: white;
  marker-line-width: 0;
  marker-line-opacity: 0.0;
  marker-placement: point;
  marker-type: ellipse;
  marker-allow-overlap: true;
}
```

Hit 'Apply style'. We've done a few things here. First, we changed our color to a green color. Second, we increased the size and decreased the opacity of the marker. We removed the border line. 

### Multiple styles

Already we can see some of the intensity of the data on our map. Now, let's add two styles to each point. You can do this by telling CartoDB two different styles but naming one something different. You can add a name to your style by adding ::name after the namespace declaration, like this, 

```css
#crashes_2007_2009_intensity::green {
  marker-fill: #11ff66;
  marker-opacity: 0.04;
  marker-width:18;
  marker-line-color: white;
  marker-line-width: 0;
  marker-line-opacity: 0.0;
  marker-placement: point;
  marker-type: ellipse;
  marker-allow-overlap: true;
}
```

Now I've named our first style, 'green'. Next, let's add a second style above it, like this,

```css
#crashes_2007_2009_intensity {
  marker-fill: transparent;
  marker-opacity: 1.0;
  marker-width: 27;
  marker-line-color: #00f6ff;
  marker-line-width: 24;
  marker-line-opacity: 0.02;
  marker-placement: point;
  marker-type: ellipse;
  marker-allow-overlap: true;
}
#crashes_2007_2009_intensity::green {
  marker-fill: #11ff66;
  marker-opacity: 0.04;
  marker-width:18;
  marker-line-color: white;
  marker-line-width: 0;
  marker-line-opacity: 0.0;
  marker-placement: point;
  marker-type: ellipse;
  marker-allow-overlap: true;
}
```

Hit 'Apply style'. Great, now you have two styles being applied to each point on your map. The map should be getting more interesting now. You can actually add more than two styles at a time to the same point (same goes for polygons and linestrings). Let's add a third by changing our new style to ::second and adding a new style to the top of the list,

```css
#crashes_2007_2009_intensity {
  marker-fill: transparent;
  marker-opacity: 1.0;
  marker-width: 27;
  marker-line-color: #0033ff;
  marker-line-width: 50;
  marker-line-opacity: 0.04;
  marker-placement: point;
  marker-type: ellipse;
  marker-allow-overlap: true;
}
#crashes_2007_2009_intensity::second {
  marker-fill: transparent;
  marker-opacity: 1.0;
  marker-width: 27;
  marker-line-color: #00f6ff;
  marker-line-width: 24;
  marker-line-opacity: 0.02;
  marker-placement: point;
  marker-type: ellipse;
  marker-allow-overlap: true;
}
#crashes_2007_2009_intensity::green {
  marker-fill: #11ff66;
  marker-opacity: 0.04;
  marker-width:18;
  marker-line-color: white;
  marker-line-width: 0;
  marker-line-opacity: 0.0;
  marker-placement: point;
  marker-type: ellipse;
  marker-allow-overlap: true;
}
```

Hit 'Apply' style. Great! you should now be seeing an interesting intensity cloud in your map!

