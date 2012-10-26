Joining data using [CartoDB](http://cartodb.com)
== 

## Summary

Joining data in CartoDB is a very common task. Not all joins are equal though, and the one you use is going to depend a lot on your data and what you want to do. Here we are going to walk you through some common JOIN methods on CartoDB. In each section we will show you how to join the data through SQL and then show you how to write the result into the first table. 


##### 1. Join two tables by a shared value in each row

##### 2. Join two tables by aggregating the shared values in a second table

##### 3. Join two tables by geospatial intersection!

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
        <td>4</td>
    </tr>
    <tr>
        <td>2</td>
        <td>BRA</td>
        <td>5</td>
    </tr>
    <tr>
        <td>3</td>
        <td>BRA</td>
        <td>2</td>
    </tr>
    <tr>
        <td>4</td>
        <td>USA</td>
        <td>2</td>
    </tr>
    <tr>
        <td>5</td>
        <td>USA</td>
        <td>1</td>
    </tr>
</table>


Above is our new example data. Here we want to get the sum total of all counts in each country. So, the SQL would look like this,

    SELECT 
        table_1.the_geom,table_1.iso_code,SUM(table_2.total) 
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

## 3. Join two tables by geospatial intersection!

One of the most exciting is the use of geospatial intersections. Say you have a set of points in one table, and a set of state polygons with iso_codes in a second. You could use a geospatial intersection to give each point an iso code based on the state they fall in. We can also of course combine SUM, AVG, MIN, MAX and all that good stuff here too!

(todo)
