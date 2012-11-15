Part III - Analysis on Maps | ViBRANT Workshop
== 

[Back to workshop](/Vizzuality/CartoDB-Tutorials/tree/master/vibrant)

#### [ST_ConvexHull](http://postgis.org/docs/ST_ConvexHull.html)

```sql
SELECT the_geom_webmercator FROM occurrence_search_coords 
WHERE scientific_name_interpreted = 'Lygodium circinnatum'
```

```sql
SELECT ST_Collect(the_geom_webmercator) as the_geom_webmercator 
FROM occurrence_search_coords 
WHERE scientific_name_interpreted = 'Lygodium circinnatum'
```

```sql
SELECT ST_ConvexHull(ST_Collect(the_geom_webmercator)) as the_geom_webmercator 
FROM occurrence_search_coords 
WHERE scientific_name_interpreted = 'Lygodium circinnatum'
```

#### [ST_ConcaveHull](http://www.postgis.org/docs/ST_ConcaveHull.html)

```sql
SELECT ST_ConcaveHull(ST_Collect(the_geom_webmercator),0.7) as the_geom_webmercator 
FROM occurrence_search_coords 
WHERE scientific_name_interpreted = 'Lygodium circinnatum'
```

## Join data

for more see [joining data on cartodb](https://github.com/Vizzuality/CartoDB-Tutorials/tree/master/joining-data)

World borders available here, https://viz2.cartodb.com/tables/924.shp

#### Select the countries that have points in them

```sql
SELECT the_geom_webmercator FROM vibrant_borders 
WHERE 
ST_Intersects(the_geom, (
    SELECT ST_Collect(the_geom) FROM occurrence_search_coords WHERE scientific_name_interpreted = 'Lygodium circinnatum')
)
```

#### Introduction to the WITH statement

```sql
WITH results_1 AS 
   (SELECT the_geom_webmercator FROM vibrant_borders 
   WHERE ST_Intersects(the_geom, (
      SELECT ST_Collect(the_geom) FROM occurrence_search_coords WHERE scientific_name_interpreted = 'Lygodium circinnatum')
   )
   ) 
SELECT * FROM results_1
```

But I don't like that we include islands where we have never seen the Lygodium. 

```sql
WITH results_1 AS 
   (SELECT (ST_Dump(the_geom_webmercator)).geom as the_geom_webmercator FROM vibrant_borders 
   WHERE ST_Intersects(the_geom, (
      SELECT ST_Collect(the_geom) FROM occurrence_search_coords WHERE scientific_name_interpreted = 'Lygodium circinnatum')
   )
   ) 
SELECT the_geom_webmercator FROM results_1 
   WHERE ST_Intersects(the_geom_webmercator, (
      SELECT ST_Collect(the_geom_webmercator) FROM occurrence_search_coords WHERE scientific_name_interpreted = 'Lygodium circinnatum')
   )
```

## Advanced Join!

Now let's crop our original range by the borders!

```sql
WITH range AS (
   SELECT ST_ConvexHull(ST_Collect(the_geom_webmercator)) as the_geom_webmercator 
   FROM occurrence_search_coords 
   WHERE scientific_name_interpreted = 'Lygodium circinnatum')
SELECT * FROM range
```

```sql
WITH range AS (
   SELECT ST_ConvexHull(ST_Collect(the_geom_webmercator)) as the_geom_webmercator 
   FROM occurrence_search_coords 
   WHERE scientific_name_interpreted = 'Lygodium circinnatum'),
   results_1 AS 
      (SELECT (ST_Dump(the_geom_webmercator)).geom as the_geom_webmercator FROM vibrant_borders 
      WHERE ST_Intersects(the_geom, (
         SELECT ST_Collect(the_geom) FROM occurrence_search_coords WHERE scientific_name_interpreted = 'Lygodium circinnatum')
      )
      ), 
   results_2 AS (SELECT the_geom_webmercator FROM results_1 
      WHERE ST_Intersects(the_geom_webmercator, (
         SELECT ST_Collect(the_geom_webmercator) FROM occurrence_search_coords WHERE scientific_name_interpreted = 'Lygodium circinnatum')
      )
   )
SELECT * FROM range
UNION ALL
select * FROM results_2
```

Intersect them!

```sql
WITH range AS (
   SELECT ST_ConvexHull(ST_Collect(the_geom_webmercator)) as the_geom_webmercator 
   FROM occurrence_search_coords 
   WHERE scientific_name_interpreted = 'Lygodium circinnatum'),
   results_1 AS 
      (SELECT (ST_Dump(the_geom_webmercator)).geom as the_geom_webmercator FROM vibrant_borders 
      WHERE ST_Intersects(the_geom, (
         SELECT ST_Collect(the_geom) FROM occurrence_search_coords WHERE scientific_name_interpreted = 'Lygodium circinnatum')
      )
      ), 
   results_2 AS (SELECT the_geom_webmercator FROM results_1 
      WHERE ST_Intersects(the_geom_webmercator, (
         SELECT ST_Collect(the_geom_webmercator) FROM occurrence_search_coords WHERE scientific_name_interpreted = 'Lygodium circinnatum')
      )
   )
SELECT ST_Intersection(a.the_geom_webmercator, b.the_geom_webmercator) AS the_geom_webmercator FROM range a, results_2 b
```

Now, with any species!

```sql
WITH range AS (
   SELECT ST_ConvexHull(ST_Collect(the_geom_webmercator)) as the_geom_webmercator 
   FROM occurrence_search_coords 
   WHERE scientific_name_interpreted = 'Callitris columellaris F. Muell.'),
   results_1 AS 
      (SELECT (ST_Dump(the_geom_webmercator)).geom as the_geom_webmercator FROM vibrant_borders 
      WHERE ST_Intersects(the_geom, (
         SELECT ST_Collect(the_geom) FROM occurrence_search_coords WHERE scientific_name_interpreted = 'Callitris columellaris F. Muell.')
      )
      ), 
   results_2 AS (SELECT the_geom_webmercator FROM results_1 
      WHERE ST_Intersects(the_geom_webmercator, (
         SELECT ST_Collect(the_geom_webmercator) FROM occurrence_search_coords WHERE scientific_name_interpreted = 'Callitris columellaris F. Muell.')
      )
   )
SELECT ST_Intersection(a.the_geom_webmercator, b.the_geom_webmercator) AS the_geom_webmercator FROM range a, results_2 b
```

Or again with ConcaveHull

```sql
WITH range AS (
   SELECT ST_ConcaveHull(ST_Collect(the_geom_webmercator),0.95) as the_geom_webmercator 
   FROM occurrence_search_coords 
   WHERE scientific_name_interpreted = 'Callitris columellaris F. Muell.'),
   results_1 AS 
      (SELECT (ST_Dump(the_geom_webmercator)).geom as the_geom_webmercator FROM vibrant_borders 
      WHERE ST_Intersects(the_geom, (
         SELECT ST_Collect(the_geom) FROM occurrence_search_coords WHERE scientific_name_interpreted = 'Callitris columellaris F. Muell.')
      )
      ), 
   results_2 AS (SELECT the_geom_webmercator FROM results_1 
      WHERE ST_Intersects(the_geom_webmercator, (
         SELECT ST_Collect(the_geom_webmercator) FROM occurrence_search_coords WHERE scientific_name_interpreted = 'Callitris columellaris F. Muell.')
      )
   )
SELECT ST_Intersection(a.the_geom_webmercator, b.the_geom_webmercator) AS the_geom_webmercator FROM range a, results_2 b
```

## Top ten Australian species 

```sql
WITH 
   species AS (
   SELECT scientific_name_interpreted FROM occurrence_search_coords  
   WHERE country = 'Australia' GROUP BY scientific_name_interpreted 
   ORDER BY count(*) DESC LIMIT 10),
   range AS (
   SELECT scientific_name_interpreted, ST_ConcaveHull(ST_Collect(the_geom_webmercator),0.95) as the_geom_webmercator 
   FROM occurrence_search_coords 
   WHERE scientific_name_interpreted IN (SELECT * FROM species)
   GROUP BY scientific_name_interpreted),
   results_1 AS 
      (SELECT the_geom_webmercator FROM vibrant_borders 
      WHERE admin = 'Australia'
      )
SELECT scientific_name_interpreted, ST_Intersection(a.the_geom_webmercator, b.the_geom_webmercator) AS the_geom_webmercator FROM range a, results_1 b
```

Write to table,


```sql
WITH 
   species AS (
   SELECT scientific_name_interpreted FROM occurrence_search_coords  
   WHERE country = 'Australia' GROUP BY scientific_name_interpreted 
   ORDER BY count(*) DESC LIMIT 10),
   range AS (
   SELECT scientific_name_interpreted, ST_ConcaveHull(ST_Collect(the_geom_webmercator),0.65) as the_geom_webmercator 
   FROM occurrence_search_coords 
   WHERE scientific_name_interpreted IN (SELECT * FROM species)
   GROUP BY scientific_name_interpreted),
   results_1 AS 
      (SELECT the_geom_webmercator FROM vibrant_borders 
      WHERE admin = 'Australia'
      )
SELECT scientific_name_interpreted, ST_Multi(ST_Transform(ST_Intersection(a.the_geom_webmercator, b.the_geom_webmercator),4326)) AS the_geom FROM range a, results_1 b
```

ST_Multi is a gotcha

```css
#vibrant_ranges {
   line-color:#FFFFFF;
   line-width:0;
   line-opacity:0.48;
   polygon-opacity:0.28;
   polygon-fill:black
}
```



## Section 2. Moderate
 
 * Introduction to CDB_RectangularGrid, CDB_HexagonGrid
 * Create intensity map
 * Return to SQL API
 * Calculate key values
   * AOO
   * EOO



Previous section - [Creating Maps](/Vizzuality/CartoDB-Tutorials/tree/master/vibrant/Part_II_Creating_Maps.md)

[Back to workshop](/Vizzuality/CartoDB-Tutorials/tree/master/vibrant)







