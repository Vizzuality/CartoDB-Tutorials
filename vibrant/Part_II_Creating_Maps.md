Part II - Creating Maps | ViBRANT Workshop
== 

[Back to workshop](/Vizzuality/CartoDB-Tutorials/tree/master/vibrant)

## Section 1. Basic

### Modifying data

#### remove records without geometry

```sql
DELETE FROM occurrence_search_coords WHERE the_geom IS NULL
```
Share the new SHP

[https://viz2.cartodb.com/tables/occurrence_search_coords.shp](https://viz2.cartodb.com/tables/occurrence_search_coords#/map)


### Explore dataset 

#### Find most common species in the Kew dataset

```sql
SELECT scientific_name_interpreted, count(*) 
FROM occurrence_search_coords 
GROUP BY scientific_name_interpreted 
ORDER BY count(*) DESC
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
SELECT * FROM occurrence_search_coords 
WHERE scientific_name_interpreted = 'Lygodium circinnatum'
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
SELECT country, count(*) FROM occurrence_search_coords 
GROUP BY country ORDER BY country ASC
```

#### Find all records with an empty country field

```sql
SELECT * FROM occurrence_search_coords WHERE country = ''
```

## Section 3. Hard

create a point for Kew Gardens

```sql
SELECT ST_Transform(ST_SetSRID(ST_MakePoint(-0.291098, 51.478042), 4326), 3857) as the_geom_webmercator
```

For more about see [projections in CartoDB](https://github.com/Vizzuality/CartoDB-Tutorials/blob/master/drafts/projections.md)

create a point for Sydney

```sql
SELECT ST_Transform(ST_SetSRID(ST_MakePoint(151.20699, -33.867487), 4326), 3857) as the_geom_webmercator
```

query for records within 10km from Sydney

```sql
SELECT * FROM occurrence_search_coords WHERE ST_Distance(the_geom::geography, ST_SetSRID(ST_MakePoint(151.20699, -33.867487), 4326)::geography) < 10000
```

### Write distance to database

```sql
UPDATE occurrence_search_coords SET sydney_d = ST_Distance(the_geom::geography, ST_SetSRID(ST_MakePoint(151.20699, -33.867487), 4326)::geography)
```

Style points by distance from Sydney!

```css
#occurrence_search_coords {
   marker-width:3;
   marker-line-color:white;
   marker-line-width:0.7;
   marker-opacity:0.74;
   marker-fill:#B10026;
   marker-allow-overlap: true;
   [sydney_d>100000] {
   marker-fill:#E31A1C
	}
	   [sydney_d>500000] {
	   marker-fill:#FC4E2A
	}
	   [sydney_d>2500000] {
	   marker-fill:#FD8D3C
	}
	   [sydney_d>5000000] {
	   marker-fill:#FEB24C
	}
	   [sydney_d>10000000] {
	   marker-fill:#FED976
	}
	   [sydney_d>50000000] {
	   marker-fill:#FFFFB2
	}
}
```




Next section - [Analysis on maps](/Vizzuality/CartoDB-Tutorials/tree/master/vibrant/Part_III_Analysis_on_maps.md)

or head [back to workshop](/Vizzuality/CartoDB-Tutorials/tree/master/vibrant)







