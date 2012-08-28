Do more with styles!
== 

##Change your default CartoDB layer query to,

    query: "SELECT *, false as underwater FROM {{table_name}} WHERE 0 < elevation ",

##Now, swamp in this for your style

    tile_style: "#{{table_name}}{[polygon-fill:#E25B5B; [underwater=true]{polygon-fill:#262626}",

##Finally, let's change the way our slider function works by changing the line within the function to

    nyc_elevation.setQuery("SELECT *,CASE WHEN " + seaLevel + " < elevation THEN false ELSE true END as underwater FROM {{table_name}}");


##See it here

http://vizzuality.github.com/CartoDB-Tutorials/nyc-rising-seas/html/5_all_in_style.html