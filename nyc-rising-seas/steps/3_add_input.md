Add an input element to your HTML and some Javascript to listen to it
== 

##Add these elements to you HTML file below your map div

    <form class="example">
      <p class="small">Change the sea level</p>
      <input type="sealevel" class="sealevel" min="0" max="300" value="0" onmouseup="seaLevelChange()"/>
      <p class="sea"><span class="feet">0</span> feet</p>
    </form>

##Next, add the seaLevelChange function to the Javascript in your header
    
    function seaLevelChange() {
      // Change the query
      var seaLevel = $("input.sealevel").val();
      nyc_elevation.setQuery("SELECT * FROM {{table_name}} WHERE " + seaLevel + " < elevation ");
      $(".feet").html(seaLevel);
    }

##Finally, change the starting SQL query for your CartoDB layer object as follows,

    query: "SELECT * FROM {{table_name}} WHERE 0 < elevation ",


##See it here

http://vizzuality.github.com/CartoDB-Tutorials/nyc-rising-seas/html/3_add_input.html