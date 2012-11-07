Joining data using [CartoDB](http://cartodb.com)
== 

## Summary

Joining data in CartoDB is a very common task. Not all joins are equal though, and the one you use is going to depend a lot on your data and what you want to do. Here we are going to walk you through some common JOIN methods on CartoDB. In each section we will show you how to join the data through SQL and then show you how to write the result into the first table. 


##### 1. Join two tables by a shared value in each row

##### 2. Join two tables by aggregating the shared values in a second table

##### 3. Join two tables by geospatial intersection!

##### 4. Join two tables dynamically 

Finally, we'll run through a working example using the join method described in #3 above.

##### 5. An example of Joining two real datasets

## 1. Join two tables by a shared value in each row

This is where you have a value in both tables, say iso codes and you can match the value of a row (e.g. iso_code='USA') from one table with the same value in a second table (e.g. iso='USA'). Column name doesn't matter, just the content!


<h6>table_1</h6>
<table>
    <tr>
        <th>cartodb_id</th>
        <th>the_geom</th>
        <th>iso_code</th>
    </tr>
    <tr>
        <td>1</td>
        <td>Polygon...</td>
        <td>USA</td>
    </tr>
    <tr>
        <td>2</td>
        <td>Polygon...</td>
        <td>BRA</td>
    </tr>
    <tr>
        <td>3</td>
        <td>Polygon...</td>
        <td>BEL</td>
    </tr>
    <tr>
        <td>4</td>
        <td>Polygon...</td>
        <td>GAB</td>
    </tr>
</table>

<h6>table_2</h6>
<table>
    <tr>
        <th>cartodb_id</th>
        <th>iso</th>
        <th>population</th>
    </tr>
    <tr>
        <td>1</td>
        <td>BRA</td>
        <td>302</td>
    </tr>
    <tr>
        <td>2</td>
        <td>USA</td>
        <td>188</td>
    </tr>
    <tr>
        <td>3</td>
        <td>GAB</td>
        <td>99</td>
    </tr>
    <tr>
        <td>4</td>
        <td>BEL</td>
        <td>876</td>
    </tr>
</table>


The above tables give a good example when you will want to use this method. Say you have some nice polygons for your world borders stored in table_1, but you have a csv with a value you need for the polygons that you've uploaded seperately to table_2. Here is the join command you would run,

    SELECT 
        table_1.the_geom,table_1.iso_code,table_2.population 
    FROM 
        table_1, table_2 
    WHERE 
        table_1.iso_code = table_2.iso

You'll see, it doesn't matter that the columns in the two tables were different, iso_code versus just iso, we still ran the join just fine. You could now use the 'Table from query' button under the advanced menu to create a new table with this data. Otherwise, we can just write it into the first table. Here's how.

First, create a new column in table_1 called population and make it a number. You can do this by clicking the drop down arrow at the top of any column and selecting 'Add new column'

Next, check in table_2 and be sure that under the population column, the type is 'Number'. If it says string, let's change it. Click 'String' and then choose, 'Number' and accept the warning. Next run this SQL,

    UPDATE 
        table_1
    SET 
      population = table_2.population 
    FROM 
        table_2 
    WHERE 
        table_1.iso_code = table_2.iso

There is another variation that will do the same thing, but sometimes you will find it simpler to write,

    UPDATE 
        table_1 as t1
    SET 
      population =  (
                    SELECT
                        population
                    FROM
                        table_2
                    WHERE
                        iso = t1.iso_code
                    LIMIT 1
                    )

In the second exampe, we run a subquery, so for each row of table_1 it runs the query inside the parentheses. You'll notice some neat tricks. First, is that table_1 I alias as t1 so I don't have to write the full name later. I also use LIMIT to make sure that the second query only gives back one result per row, otherwise I might get an error if the second table contained multiple values for some countries. Depending on what your data is, it may not be good to do this LIMIT because you will want to somehow combine all the rows into one answer. If that is your case, keep reading!

## 2. Join two tables by aggregating the shared values in a second table

This is the case where you have many values in a second table, and you want to get their collected value where they match the first. You can do things like SUM, AVG, MIN, MAX, etc. We will do just like we did above, but in this case we will use a function to aggregate all the shared values in the second table first. 


<h6>table_1</h6>
<table>
    <tr>
        <th>cartodb_id</th>
        <th>the_geom</th>
        <th>iso_code</th>
    </tr>
    <tr>
        <td>1</td>
        <td>Polygon...</td>
        <td>USA</td>
    </tr>
    <tr>
        <td>2</td>
        <td>Polygon...</td>
        <td>BRA</td>
    </tr>
    <tr>
        <td>3</td>
        <td>Polygon...</td>
        <td>BEL</td>
    </tr>
    <tr>
        <td>4</td>
        <td>Polygon...</td>
        <td>GAB</td>
    </tr>
</table>

<h6>table_2</h6>
<table>
    <tr>
        <th>cartodb_id</th>
        <th>iso</th>
        <th>day</th>
        <th>total</th>
    </tr>
    <tr>
        <td>1</td>
        <td>BRA</td>
        <td>m</td>
        <td>4</td>
    </tr>
    <tr>
        <td>2</td>
        <td>BRA</td>
        <td>t</td>
        <td>5</td>
    </tr>
    <tr>
        <td>3</td>
        <td>BRA</td>
        <td>w</td>
        <td>2</td>
    </tr>
    <tr>
        <td>4</td>
        <td>USA</td>
        <td>m</td>
        <td>2</td>
    </tr>
    <tr>
        <td>5</td>
        <td>USA</td>
        <td>f</td>
        <td>1</td>
    </tr>
</table>


Above is our new example data. Here we want to get the sum total of all counts in each country. So, the SQL would look like this,

    SELECT 
        table_1.the_geom,table_1.iso_code,SUM(table_2.total) as total
    FROM 
        table_1, table_2 
    WHERE 
        table_1.iso_code = table_2.iso
    GROUP BY
        table_1.iso_code, table_2.iso

The biggest change now is the use of the GROUP BY method. This collapses all rows that have a shared iso value, and then using SUM it sums up all the values in total from those collapsed rows! Nice right? Now, lets add a column to table_1 called 'total' and make it numeric. Now to do the insert, 


    UPDATE 
        table_1 as t1
    SET 
      total =  (
                    SELECT
                        SUM(total)
                    FROM
                        table_2
                    WHERE
                        iso = t1.iso_code
                    GROUP BY 
                      iso
                    )

Pretty simple? You can do this all day long!

Here are some other types of functions other than SUM you might be interested in,

(http://www.postgresql.org/docs/9.1/static/functions-aggregate.html)[http://www.postgresql.org/docs/9.1/static/functions-aggregate.html]

## 3. Join two tables by geospatial intersection!

One of the most exciting JOINS is through the use of geospatial intersections. Say you have a set of points in one table, and a set of state polygons with iso_codes in a second. You could use a geospatial intersection to give each point an iso code based on the state they fall in. We can also of course combine SUM, AVG, MIN, MAX and all that good stuff here too! Here is some example data,



<h6>table_1</h6>
<table>
    <tr>
        <th>cartodb_id</th>
        <th>the_geom</th>
        <th>iso_code</th>
    </tr>
    <tr>
        <td>1</td>
        <td>Polygon...</td>
        <td>USA</td>
    </tr>
    <tr>
        <td>2</td>
        <td>Polygon...</td>
        <td>BRA</td>
    </tr>
    <tr>
        <td>3</td>
        <td>Polygon...</td>
        <td>BEL</td>
    </tr>
    <tr>
        <td>4</td>
        <td>Polygon...</td>
        <td>GAB</td>
    </tr>
</table>

<h6>table_2</h6>
<table>
    <tr>
        <th>cartodb_id</th>
        <th>the_geom</th>
    </tr>
    <tr>
        <td>1</td>
        <td>Point...</td>
    </tr>
    <tr>
        <td>2</td>
        <td>Point...</td>
    </tr>
    <tr>
        <td>3</td>
        <td>Point...</td>
    </tr>
    <tr>
        <td>4</td>
        <td>Point...</td>
    </tr>
</table>


Now, let's say we just want to know the total number of Points from table_2 that fall in table_1. Easy, let's see the SQL,

    SELECT 
        table_1.the_geom,table_1.iso_code,COUNT(*) as count 
    FROM 
        table_1, table_2 
    WHERE 
        ST_Intersects(table_1.the_geom, table_2.the_geom)

The ST_Intersects function is one you are going to use again and again. You'll love it. Now, let's do the same but insert the result into a new column. Start by adding a column to table_1 called, total and make it numeric. Next, run,

    UPDATE 
        table_1 as t1
    SET 
      total =  (
                    SELECT
                        Count(*)
                    FROM
                        table_2
                    WHERE
                        ST_Intersects(the_geom, t1.the_geom)
                    )

Nifty right? You can now use this in combination with SUM, AVG, MAX all that good stuff to get the values you need from one table into the next. 

## 4. Join two tables dynamically 

Just a note about doing the above for a map you build on Leaflet or Google maps. You may not always want to write the result into table_1, instead, you may want to query live from the browser based on something the user is doing. In those cases, use the SELECT statements. If you are rendering a map with the results, you need to remember to include the_geom_webmercator is all! It is our hidden reprojection of the_geom that makes the final map. Here is the above query modified to include it,

    SELECT 
        table_1.the_geom,table_1.iso_code,COUNT(*) as count, table_1.the_geom_webmercator
    FROM 
        table_1, table_2 
    WHERE 
        ST_Intersects(table_1.the_geom, table_2.the_geom)

## 5. Join two real datasets

Now, let's run through an example using a couple real datasets. Start by getting two tables ready in your CartoDB account. Both datasets are available as 'sample data' from your CartoDB dashboard. To find them, go to your account dashboard. Underneith the large green 'Create a new table' button on the right, you'll see a link 'Sample data', click it.

Next, you will find the dataset called, World Rivers and click it. This will load the data and take you to the resulting table. If you click on Map View, you'll see that it is a basic map of some  of the worlds large rivers. This is data from naturalearth.com. Take note of the name of the table that was created, mine is 'table_50m_rivers_lake_cen'

Next, go back to your Dashboard by clicking the CartoDB logo in the upper left. Again, click the link to 'Sample data'. This time, find the dataset called 'World Borders'. When the table finishes loading, click Map View and you'll see that it is a dataset of all country borders. Let's join the rivers with the countries so we can make a choropleth of the total length of big rivers in countries around the world. Of course, our map is going to ignore all the little rivers not included in our dataset, but this is just an example!

### Joining the data

From inside your country borders table create a new column to hold some numerical data. In the Table view, click the drop down arrow beside any column name, in the menu, click 'Add new column'. In the options, add big_rivers as the column and select number as the type. Finally, click 'create column'.

Now, like in the join explainations above, we'll do this in two steps. In the first, we do a SELECT to see the data joined in our browser. Second, we'll do an UPDATE so that we write the value to the new column we just created. 

#### Join through a SELECT statement

    SELECT tm_world_borders_s.cartodb_id, 
    COUNT(table_50m_rivers_lake_cen.cartodb_id) FROM 
    tm_world_borders_s, table_50m_rivers_lake_cen WHERE 
    ST_Intersects(tm_world_borders_s.the_geom, table_50m_rivers_lake_cen.the_geom) 
    GROUP BY tm_world_borders_s.cartodb_id

In the above query, we are counting all the rivers that intersect a country. Be sure that your world borders table is named the same as mine, tm_world_borders_s. We GROUP BY the country name so that as a result we get country name and count of big rivers. Great!

#### Updating a table using a JOIN

Now lets run a similar query, but write the numeric value to the column we created earlier, big_rivers. Run the following,

    UPDATE tm_world_borders_s wb SET big_rivers = (
    SELECT COUNT(table_50m_rivers_lake_cen.cartodb_id) FROM 
    table_50m_rivers_lake_cen WHERE 
    ST_Intersects(wb.the_geom, table_50m_rivers_lake_cen.the_geom))

In the above query, we are running the UPDATE to our new column big_rivers, but running a nested query that selects to count of all rivers that intersect it. Like the above examples, we use an alias for the name of our world borders table name, wb. You can see that the alias is then used when we run the ST_Intersects function, indicating that for ever row in the wb table, we count the rivers that intersect its geometry. 

#### Mapping the results

Now, go back to the Map View for your world borders table. Click the Carto icon on the right hand side of your map. In the menu that pops out, click the overview image of the choropleth map (the one with different colors in each polygon). Below, in the menu, for Column select, big_rivers. Now take a look at the map and you can see which countries the most rivers in our dataset pass through. 

