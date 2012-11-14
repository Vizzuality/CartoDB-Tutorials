Add a legend
== 

##Summary

Density maps are great ways to show complex underlying data in a simple and visually appealing way. We have developed a couple of custom tools in CartoDB to make it really easy, here I'll show you how to use them. In this tutorial, we are going to use data from 2012 bicycle crash reports in Chicago. This is a really interesting dataset that can be used for a lot of reasons. The data was originally collected by the Illinois Department of Transportation and the most up-to-date datasets can be found over at http://chicagocrashes.org.

For this tutorial you are going to need a code editor that will allow you to edit HTML files. You will probably run into problems if you try to do the tutorial in a document editor such as Word or Open Office, they often add invisible markup that will make your file unreadable by web browsers. We recommend taking a look through the list here, http://en.wikipedia.org/wiki/Source_code_editor. In particular, TextMate or Notepad++ will do the trick. 

## Data sources

You can see some of the original maps here*, and here** but for this work we are going to need the raw data, which you can download here,

	data/crashes_2007_2009.zip

## Adding a legend. 

One thing left is the legend. In the template.html file we provided you we added a very simple way to make a legend. 

--more here

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

Save your file and then go back to your browser where you have the file loaded. Hit refresh and you should be good to go!

![density map](http://i.imgur.com/5RhPU.png)





