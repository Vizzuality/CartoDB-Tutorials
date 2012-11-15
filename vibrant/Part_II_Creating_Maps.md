Part II - Creating Maps | ViBRANT Workshop
== 

[Back to workshop](/Vizzuality/CartoDB-Tutorials/tree/master/vibrant)

## Section 1. Basic

### Modifying data

#### remove records without geometry

```sql
DELETE FROM occurrence_search_coords WHERE the_geom IS NULL
```

### Explore dataset 

#### Find most common species in the Kew dataset

```sql
SELECT scientific_name_interpreted, count(*) FROM occurrence_search_coords GROUP BY scientific_name_interpreted ORDER BY count(*) DESC
```

## Section 2. Moderate

### Combine styles and SQL

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
      marker-fill:#f24e35
   } 

}
```

#### Only map a single species from the dataset

```sql
SELECT * FROM occurrence_search_coords WHERE scientific_name_interpreted = 'Lygodium circinnatum'
```

#### Using two conditions at the same time

the comma between [],[] works like an AND

```css
#occurrence_search_coords {
   marker-fill:transparent;
   marker-width:6;
   marker-line-color:white;
   marker-line-width:1;
   marker-opacity:0.75;
   marker-line-opacity:0.75;
   marker-placement:point;
   marker-type:ellipse;
   marker-allow-overlap:true;
   [scientific_name_interpreted = 'Lygodium circinnatum' ],[ country='Philippines' ] {
      marker-fill:blue
   }
}
```

without a comma [][] works like an OR

```css
#occurrence_search_coords {
   marker-fill:transparent;
   marker-width:6;
   marker-line-color:white;
   marker-line-width:1;
   marker-opacity:0.75;
   marker-line-opacity:0.75;
   marker-placement:point;
   marker-type:ellipse;
   marker-allow-overlap:true;
   [scientific_name_interpreted = 'Lygodium circinnatum' ][ country='Philippines' ] {
      marker-fill:blue
   }
}
```

nested, of course, cascades!

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
   [ country='Philippines' ] {
      marker-opacity:0.15;
      [scientific_name_interpreted = 'Lygodium circinnatum' ] {
         marker-opacity:0.75;
         marker-fill: blue
      }
   }   
}
```

or set two styles!

```css
#occurrence_search_coords::first [scientific_name_interpreted = 'Lygodium circinnatum' ]{
   marker-fill:#AA2143;
   marker-width:3;
   marker-line-color:white;
   marker-line-width:1;
   marker-opacity:0.75;
}
#occurrence_search_coords::second [scientific_name_interpreted = 'Lygodium circinnatum' ]{
   marker-fill:transparent;
   marker-width:8;
   marker-line-color:red;
   marker-line-width:1;
   marker-opacity:0.75;
}
```


### More SQL

#### Find number of records per country

```sql
SELECT country, count(*) FROM occurrence_search_coords GROUP BY country ORDER BY country ASC
```

#### Find all records with an empty country field

```sql
SELECT * FROM occurrence_search_coords WHERE country = ''
```

## Section 3. Hard

 * Query for all records within radius of Kew gardens
 * 51.478042,-0.291098
 * 40.434633,-3.700511
 * Create 3 rings plus their count
 * Color by their count, as in choropleth
 * Share

Next section - [Analysis on maps](/Vizzuality/CartoDB-Tutorials/tree/master/vibrant/Part_III_Analysis_on_maps.md)

or head [back to workshop](/Vizzuality/CartoDB-Tutorials/tree/master/vibrant)







