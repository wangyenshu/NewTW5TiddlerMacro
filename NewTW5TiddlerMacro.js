/***
|Name|NewTW5TiddlerMacro|
|Description|Generates a tiddler named 'New TW5Tiddler' with a default TW5-like JSON structure and current timestamps.|
|Version|0.1|
|Source|https://github.com/wangyenshu/NewTW5TiddlerMacro/blob/main/NewTW5TiddlerMacro.js|
|Author|Yanshu Wang, with the help of AI|
|License|MIT|
|~CoreVersion|2.x|
!Documentation
This plugin depends on [[JSONEditorPlugin]].
!Usage
{{{<<NewTW5Tiddler>>}}}
!Demo
<<NewTW5Tiddler>>
***/
//{{{
config.macros.NewTW5Tiddler = {
    handler: function(place, macroName, params, wikifier, paramString, tiddler) {
        // Create a button to trigger the new tiddler creation
        var button = createTiddlyButton(place, "New TW5Tiddler", "Create a new tiddler named 'New TW5Tiddler' with JSON content", this.onClick);
    },

    onClick: function(e) {
        // Generate current timestamp in TiddlyWiki's format (YYYYMMDDHHMMSSmmm)
        var now = new Date();
        var year = now.getFullYear().toString();
        var month = (now.getMonth() + 1).toString();
        if (month.length == 1) month = "0" + month;
        var day = now.getDate().toString();
        if (day.length == 1) day = "0" + day;
        var hours = now.getHours().toString();
        if (hours.length == 1) hours = "0" + hours;
        var minutes = now.getMinutes().toString();
        if (minutes.length == 1) minutes = "0" + minutes;
        var seconds = now.getSeconds().toString();
        if (seconds.length == 1) seconds = "0" + seconds;
        var milliseconds = now.getMilliseconds().toString();
        while (milliseconds.length < 3) milliseconds = "0" + milliseconds; // Ensure 3 digits for milliseconds

        var timestamp = year + month + day + hours + minutes + seconds + milliseconds;

        // Define the content for the new tiddler
        var newTiddlerContent = {
            "created": timestamp,
            "text": "",
            "tags": "",
            "title": "New Tiddler", // This is the 'title' property *within* the JSON content
            "modified": timestamp
        };

        // Convert the object to a compact JSON string
        var jsonString = JSON.stringify(newTiddlerContent);

        // *** CRITICAL CHANGE: Set the tiddler's actual title to "New TW5Tiddler" ***
        var newTiddlerTitle = "New TW5Tiddler";

        // Create the new Tiddler object
        var newTiddler = new Tiddler();
        newTiddler.title = newTiddlerTitle;
        newTiddler.text = jsonString; // Set the JSON string as the tiddler's main text content
        newTiddler.created = now; // Set TiddlyWiki's internal created timestamp
        newTiddler.modified = now; // Set TiddlyWiki's internal modified timestamp
        newTiddler.tags = ["JSON"]; // Optionally add a tag to identify JSON tiddlers

        // Add the new tiddler to the store and display it
        store.addTiddler(newTiddler);
        // Display the newly created tiddler. Use "JsonEditTemplate" if your JSON editor plugin is active.
        story.displayTiddler(null, newTiddlerTitle, "JsonEditTemplate", true);
        return false; // Prevent default button action
    }
};
//}}}
