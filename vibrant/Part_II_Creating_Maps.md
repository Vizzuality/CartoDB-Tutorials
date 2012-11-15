Part II - Creating Maps | ViBRANT Workshop
== 

[Back to workshop](/Vizzuality/CartoDB-Tutorials/tree/master/vibrant)

## Section 1. Basic

#### remove records without geometry

```sql
DELETE FROM occurrence_search_coords WHERE the_geom IS NULL
```

#### Find most common species in the Kew dataset

```sql
SELECT scientific_name_interpreted, count(*) FROM occurrence_search_coords GROUP BY scientific_name_interpreted ORDER BY count(*) DESC
```

#### Style a single species differently

```css
#occurrence_search_coords {
   marker-fill:#AA2143;
   marker-width:6;
   marker-line-color:white;
   marker-line-width:1;
   marker-opacity:0.75;
   marker-line-opacity:0.75;
   marker-placement:point;
   marker-type:ellipse;
   marker-allow-overlap:true;
   [scientific_name_interpreted = 'Lygodium circinnatum'] {
      marker-fill:blue
   } 

}
```

#### Only map a single species from the dataset

```sql
SELECT * FROM occurrence_search_coords WHERE scientific_name_interpreted = 'Lygodium circinnatum'
```

 * Dig

   SELECT scientific_name_interpreted, country, count(*) FROM occurrence_search_coords GROUP BY scientific_name_interpreted, country ORDER BY count(*) DESC

## Section 2. Moderate

 * Query data for only UK
 * Table from query
 * View Map
 * Style based on county
 * Share

## Section 3. Hard

 * Query for all records within radius of Kew gardens
 * 51.478042,-0.291098
 * Create 3 rings plus their count
 * Color by their count, as in choropleth
 * Share

Next section - [Analysis on maps](/Vizzuality/CartoDB-Tutorials/tree/master/vibrant/Part_III_Analysis_on_maps.md)

or head [back to workshop](/Vizzuality/CartoDB-Tutorials/tree/master/vibrant)







