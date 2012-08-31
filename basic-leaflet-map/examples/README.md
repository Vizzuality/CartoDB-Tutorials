Exploring new maps with HRW
== 

###Steps

####Part 1, youth jailed in adult facilities by state

1. Upload data from

    http://public.tableausoftware.com/views/CountyandStateJail/Sheet1

2. Rename table to

    youth_x_adult_facilities

3. Georeference with.. and select the latitude and longitude columns

4. Change the column type of the number jailed to 

    numeric

5. Change the column name to 

    number_jailed

6. Now, with points on the map, create a Bubble map

7. Make map public

8. Show embeddable map

9. Create an app, youth_by_state.html

####Part 2, youth jailed in adult facilities by county

1. rename table

  youth_x_adult_county

2. rename column

  number_jailed

3. create column in us_counties and set it to 0

  jailed_youth

4. fill column

  with foo as (select us_counties.cartodb_id as cartodb_id, number_jailed as c from us_counties, youth_x_adult_county where st_intersects(us_counties.the_geom, youth_x_adult_county.the_geom))     update us_counties set jailed_youth = foo.c from foo where us_counties.cartodb_id = foo.cartodb_id


####Info

Tutorial given in August 2012 by @andrewxhill