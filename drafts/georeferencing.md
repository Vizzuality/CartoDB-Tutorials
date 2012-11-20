Georeferencing on CartoDB
== 

##Summary

Sometimes you will find data that you want to map that doesn't contain coordinates. Perhaps it only has street addresses or city names. In these cases, CartoDB can help you 'georeference' the data, where the named places are turned into best guesses of latitude-longitude coordinates. Let's try it!

## Preparing the data

For this tutorial we are not going to use any external dataset, but instead are going to make one up. On your CartoDB dashboard, click 'Create a new table'. Next, click 'Start from scratch'. Finally, click 'Create table'. After CartoDB has finished preparing your table you will be directed to it. 

You'll notice that it is completely empty but has a few columns. Let's start by changing the names of two of the columns. Double-click the column name 'description'. You will see that now it is editable, change it to 'state'. Next, double-click the column named 'name' and change it to 'city'. Great, now let's add some fake data.

You can manually enter or update data in your CartoDB account very easily. First, click the empty row below the column names. CartoDB will add an empty column for you. Next, double-click the empty cell directly below the column named, 'city'. You will be given an input dialog where you can change or insert a new string. Add, 'Bridgeport' and click 'Save'. Double-click the empty cell in the same row, underneith the column 'state'. Add 'CT' and click 'Save'.

## Georeference your data

Now, to turn this row into a geometry, we will georeference it. To start, click the 'georeference' link in the menu at the upper-right of the screen. In the menu, the selected option is to turn longitude and latitude values into the_geom. You can use this if you import data where the columns weren't automatically detected and converted to the_geom. In this example though, we are going to use the second option, 'I have one or more columns with the address'.

After clicking the option, you will see an input dialog for telling CartoDB what to georeference. It can take a combination of one or more column names and strings. You declare the column you want to use by putting the column name in curly brackets, like

    {address}

In our case, we will combine our two columns with a comma between them

    {city}, {state}

We can also be more specific by adding an unchanging sting, say the country,

    {city}, {state}, USA

Now, CartoDB will go through each row in your table and create a string using the pattern you entered. So for the fake data we added to our table it would substitute the parts in {} for the values in the row. The result would be,

    Bridgeport, CT, USA

Next it would try to find the coordinates of this location. With '{city}, {state}, USA' entered in the input field, click 'Georeference'. 
CartoDB will add a new column, cartodb_georef_status. This column is useful to keep track of the success and failure of the georeferencing job. A value of 'false' will be entered for any row where coordinates could not be found. In our case, it should have succeeded without any problem and our single row will now have a valid the_geom. If you click 'Map view' you can now see your point on the map! 


