Customizing, sharing, and embedding your maps
== 

##Summary

After you have finished designing your map it is time to share it. This is one of the best things about CartoDB, we make it very easy. Here we are going to show you how you can rename your maps, add descriptions, customize infowindows, and share your maps with the world. 

### Example data

For this tutorial, we are going to use a dataset of populated places. 

To load the data into your account, go to your CartoDB dashboard and click the link, 'Common data'. In the menu that pops up, scroll down to the entry, 'Populated places' and click it. The table will load and you should be redirected to the newly loaded data in your account.

## Changing the name of your map

The name of your table in CartoDB is also the name of your map, it is an important thing to remember as it is the name that will be displayed in your public links and embedded maps. Right now, for example, your table should be named something similar to, 'ne_10m_populated_pla'

To change it, make sure you are viewing the table in CartoDB and click where it says the table name. You should be giving an input field where you can modify the name. Change it to, 'Populated places' and read and accept the dialog that pops up. 

Click 'Save' and your table should be updated. You'll notice though that it has changed from what you entered, it will now be called, 'populated_places'. This is because CartoDB table names must be in lowercase and spaces will be replaced by underscores (as will many non-alphanumeric characters). This is fine but worth remembering. The new name will change the way your SQL statements, URLs, and Maps API calls will be made, so try to settle on a name for new tables early in your development process. 

## Adding a description

It can be very helpful to add a description to your tables, both for your own use and for displaying to others. You can add a description to any table by clicking the 'add a description for this table...' link found directly below the table name. Try it on your new populated_places table by clicking the link and entering, 'Populated places of the world for CartoDB tutorial.'

Great, you should now have a description for your table, we'll see this again when we start working with embedded maps.

## Adding tags

Tags are really useful ways for organizing and searching data on your CartoDB account. As the number of tables in your account grows, you can use tags to find all the tables in a project you are working on, or in some cases you can tag tables in a way so you know not to modify them (e.g. 'Production'). To add tags to this table click the link 'add tags' found directly below your table description. You can add any number of tags here by placing a comma between each tag. Try adding, 'Tutorial, adding tags, cupcakes', and hit 'Save'. You'll see that each time you hit comma the new tag will be made into a unit that you can delete at any time. Now, if you return to your CartoDB dashboard, tags will be listed to the right of your tables, and by clicking any one of these tags you can search for all the tables that have been tagged the same.

## Customizing your infowindow pop-ups

In your 'populated_places' table, click 'Map view'. This is where you can customize the look and feel of your data. If you click any of the points on your map, you'll see that no infowindow comes up, this is because we need to turn them on and tell CartoDB which fields from the table we want displayed. 

On the right side of the map, you will see three icons. From top down they are, the SQL dialog, the Style editor, and the Infowindow dialog. Click the third one, the infowindow dialog. CartoDB gives you several options for the general look of your infowindows, you can explore these by clicking the dropdown menu beside 'Theme'. Go ahead and select, 'header orange', next click the toggle beside name and pop_max to turn them on. You can check or uncheck 'title', if it is checked a label is given for the field, if not, just the value is given.  

## Changing the baselayer

The baselayer is an important component of all of your maps. We offer several default layers for you to choose from or if you host your own elsewhere you can add them to your account. Here we will use one of the default baselayers. Let's use a darker background. You can see previews of the baselayers in the buttons above the map. By hovering your mouse over the baselayers you can see their name and source. Hover your mouse over them until you find the darker baselayer named Graphite from Mapbox. Click it and your map will be updated to use this layer. It will be included in all shared or embedded versions of your map

## Sharing your map

Finally we are ready to share our maps! Now you can share your data and maps with the world. You can share any map you create by opening it in CartoDB and going to the Map view. It is important to remember that the view you have loaded in your map is exactly what you will share, this includes zoom and extents of your map. You should position the map in your CartoDB account in the same way you want people to first see your data when they load your map. 

Now, you need to make sure your table is 'Public'. This just means that you are making it viewable by people externally. 'Private' tables are only available on paid accounts, so likely you wont be dealing with them at this point. If you are, you can change the status of a table at any point by clicking the 'Private' link beside the table name and selecting the 'Make this table public' option. The inverse is available if you want to make a 'Public' table 'Private' again.

Now, to share your map, click the big 'Share' button found to the upper right of your map. In the menu that comes up default option is to embed your map, we'll come back to that option next. For now, click the link 'URL' at the upper right of the menu. Next, click the clipboard to the right of the URL string in the menu. Clicking the clipboard copies the public URL so you can paste it elsewhere. For example, open a tab and click Ctrl-V in the URL bar, hit enter and view your public map. You could also email, tweet, or link to this URL for others to view your map.

One thing you'll notice is that the name and description you entered earlier are now displayed above the map. This is great because it means the people you share the link with can read about the map they are viewing. If you want to change these options, you can toggle them on/off in the Embed dialog, see below.

## Embedding your map in a webpage

If you want to embed the map in a blog post or webpage, you can also use the embed option we provide. You can find it by clicking the 'Share' button again. Embed is the default option in the menu that comes up. Here you can edit how the public table looks. For example, if you don't want to display the table name, click the toggle button beside 'Table name'. Now, links that you share will only show the description, but not the name. 

Now, click the clipboard beside the embed string. The string is now copied and you can paste it where you need it. Embedding CartoDB maps in your blog works just like embedding a YouTube video and may differ a small bit from blog host to blog host, so we recommend you look at their directions for adding an iFrame. It will be easy though!

