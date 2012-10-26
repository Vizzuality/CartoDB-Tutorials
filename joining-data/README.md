Joining data using [CartoDB](http://cartodb.com)
== 

## Summary

Joining data in CartoDB is a very common task. Not all joins are equal though, and the one you use is going to depend a lot on your data and what you want to do. Here we are going to walk you through some common JOIN methods on CartoDB. In each section we will show you how to join the data through SQL and then show you how to write the result into the first table. 


##### 1. Join two tables by a shared value in each row

##### 2. Join two tables by aggregating the shared values in a second table

##### 3. Join two tables by geospatial intersection!

## 1. Join two tables by a shared value in each row

This is where you have a value in both tables, say iso codes and you can match the value of a row (e.g. iso_code='USA') from one table with the same value in a second table (e.g. iso='USA'). Column name doesn't matter, just the content!


<table>
    <th>table_1
    <tr>
        <td>cartodb_id</td>
        <td>the_geom</td>
        <td>iso_code</td>
    </tr>
</table>


## 2. Join two tables by aggregating the shared values in a second table

This is the case where you have many values in a second table, and you want to get their collected value where they match the first. You can do things like SUM, AVG, MIN, MAX, etc.

(todo)

## 3. Join two tables by geospatial intersection!

One of the most exciting is the use of geospatial intersections. Say you have a set of points in one table, and a set of state polygons with iso_codes in a second. You could use a geospatial intersection to give each point an iso code based on the state they fall in. We can also of course combine SUM, AVG, MIN, MAX and all that good stuff here too!

(todo)
