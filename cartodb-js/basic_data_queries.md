Basic data queries using cartodb.js
== 

##Summary

CartoDB can be just as useful for serving data and running queries for your website as it is for serving maps. Unlike many data APIs you will encounter, CartoDB accepts SQL for querying your data, meaning you can take full advantage of the relational, geospatial, and indexed propoerties of your CartoDB account. Here we will show you how to run some basic queries and use the data they return in your websites. CartoDB.js has been built to integrate tightly with the SQL API, so querying and incorporating your data is now easier than ever. 

## Getting started

I have provided a sample HTML document in the examples zipfile, [download it here](https://raw.github.com/Vizzuality/CartoDB-Tutorials/master/cartodb-js/data/examples.zip), called sql-template.html. Download the zipfile, make a copy of template.html and call it 'tutorial-3.html'. Now open this file in your web browser.

What you should see is a blank, white page. Success! Now, open tutorial-3.html in your code editor and let's get started.

#### Data

For this tutorial, we are going to use the same Populated Places dataset from naturalearthdata.com we used in the 'create a map' tutorial, so if you already have it in your account you can skip to the next section. To get it, all you have to do is log in to your CartoDB dashboard. Click 'Common data' below the 'Create a new table' button in the right-hand column. In the window that pops-up, click 'Populated places'. CartoDB will build your new table and take you to it when finished. 

## Running your first CartoDB query

#### Create a link to your CartoDB account

The first thing you need in order to get started with the SQL API is a link to your account, in my case I will use an account named 'user_name'. Whereever you see 'user_name' you should put your own account name, it is the name you signed up for, or it can be found in the URL of your dashboard as follows, your_account_name.cartodb.com. The link is made in your javascript with a single line of JavaScript,

```js
  var sql = cartodb.SQL({ user: 'user_name' });
```

You will add this line directly below line 12 where it says, ```function init(){```. So now, lines 12, 13, and 14 should look like,

```js
function init(){
  var sql = new cartodb.SQL({ user: 'user_name' });
}
```

If you save your file and reload it in your browser, nothing will change. This is fine, all we are doing here is telling the library who we are, next we need to tell it to run a query. Let's try one that doesn't even need a table in our account, update your code to look like,

```js
function init(){
  var sql = new cartodb.SQL({ user: 'user_name' });
    sql.execute("SELECT n AS name FROM GENERATE_SERIES(1,10) n")
      .done(function(data) {
        // do nothing
      })
      .error(function(errors) {
        // do nothing
      })
}
```

Again, if you save this file and reload it in your browser, nothing will happen. Sorry, not very exciting, we'll do somethign with it very shortly, but first let's look at the data that is returned.

#### Data format from the SQL API

The SQL API always returns data in the same basic JSON format, making it easy for you or the CartoDB.js library to recognize and parse it. The basic format is as follows,

```json
{
  time: 0.006,
  total_rows: 1,
  rows: [
   {
    column_1: 1,
    column_2: 'Hello world'
   }
  ]
}
```

The JSON object is returned with three values in the top level, the 'time' for you to measure the efficiency of your queries, the 'total_rows' for you to quickly determine the size of your result, and an array of every row returned by your query. In each entry of the array is an object containing column name-value pairs for every column you request in your data. In our current code, we are requesting one column named 'name' and there should be 10 rows returned. 

## Using data from CartoDB.js SQL in your web-page

A really nice feature of CartoDB.js is that it handles loading a small set of useful libraries for you. One of those is the JQuery libarary. If you are using a specific version of JQuery, don't worry, CartoDB.js wont over-write it. In this case though, it means we can very easily modify the website using our new data. Let's try adding the basic results to our website. We are going to use a common array iteration method in JavaScript, if you aren't familiar with it, we recommend you read a bit about the basics of JavaScript before continuing. 

Inside our 'done' layer event listener, we are going to add the following set of lines,

```js
for (var i = 0; i < data.total_rows; i++) {
  $('#content').append("<div>" + data.rows[i].name + "</div>");
}
```

## Using data from your existing CartoDB tables

We are going to update the SQL statement we are running to query from our Populated Places table. In my case, the table I created is called, ne_10m_populated_pla. You can find the name of your newly created table either in your main CartoDB dashboard table list view, or within the table, by looking at its name in the upper-left hand corner of the page.

![table name](http://i.imgur.com/I8o7E.png)

Now that you have the tablename, let's modify the query we are running. Before, where we ran,

```js
  sql.execute("SELECT n AS name FROM GENERATE_SERIES(1,10) n")
```

we are now going to run (be sure you are using the right tablename below),

```js
  sql.execute("SELECT * FROM ne_10m_populated_pla ORDER BY pop_max DESC LIMIT 25")
```

The SQL you just added is going to ask for the cities from your populations table, ordered by the pop_max value, largest coming first. Then it is only going to give you the first 25. So we just got the top 25 most populous cities in the world! Go ahead and save your HTML and reload the browser, you should see your ranked list appear on the screen. 

#### Modify the HTML to include two columns.

Next, let's make a small tweak to the Javascript so we can see both the name and the population from our results. The line that was previously,

```js
  $('#content').append("<div>" + data.rows[i].name + "</div>");
```

Should now be written as follows,

```js
  $('#content').append("<div><span>" + 
                          data.rows[i].name + 
                        "</span><span>" + 
                          data.rows[i].pop_max +
                        "<span></div></br>");
```

There are better ways to do this, but for it is simple and works. Once you have it like above, save it and reload your page. You should get a very basic list of city name - population rows. Great! You have now performed your first basic CartoDB queries and used the results to modify HTML. Pretty easy right? 

## A hint of more exciting SQL you can perform

The really powerful part of using CartoDB's SQL API is the full geospatial engine it enables. So a common query we see developers running into is the need to find the rows *closest* to a given location. Today, getting a users location from a browser or mobile device is pretty standard and there are plenty of tutorials online. We wanted to show your very quickly, how you would find the 10 closest populated places given a longitude-latitude pair. 

The first thing we will do is get our longitude-latitidue, we'll fake it and use the approximate coordinates of our office here in New York City,

```js
var longitude = -74.0064;
var latitude = 40.7142;
```

The next thing we need to do is modify our SQL with in a couple of ways. We are going to create a valid geometry in SQL (this just means the database recognizes it) and next we are going to sort our rows by their distance to that geometry. The complete query is as follows (again, be sure your table name is correct),

```sql
SELECT * FROM ne_10m_populated_pla ORDER BY the_geom <-> ST_SetSRID(ST_MakePoint(-74.0064, 40.7142), 4326) LIMIT 25
```

There are a couple pieces of SQL you will like here: the first is, ```ST_SetSRID``` which uses the ```4326``` value to tell our database that we are talking about WGS84 (the latitude and longitude you are used to). The second is the ```<->``` which just tells CartoDB to *order by distance*, which is super handy! Let's plug it all into our JavaScript now, so we should have,

```
 sql.execute("SELECT * FROM ne_10m_populated_pla ORDER BY the_geom <-> ST_SetSRID(ST_MakePoint({{lon}},{{lat}}), 4326) LIMIT 25", {lon: -74.0064, lat: 40.7142})
``` 

We have added one last thing to show you above, a really useful feature for inserting values into your SQL statements: *templating*.

Here, instead of writing the longitude and latitude into the SQL statement, we added placeholders, {{lon}} and {{lat}} respectively. The double-curly brackets tells CartoDB.js that these values are going to be replaced by values we provide in the second parameter, the object ```{lon: -74.0064, lat: 40.7142}```. Notice that the keywords, lon and lat, remain the same in the object. All the replacement happens automatically within CartoDB.js, giving you a really powerful way to create dynamic SQL. Go ahead and save your HTML now and reload your page. Now you should be seeing the 25 populated places closest to the provided longitude and latitude. 

Congratulations, you are now ready to build web-sites backed by all types of data and geospatial capabilities!


