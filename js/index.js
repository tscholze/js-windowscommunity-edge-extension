
// Parses the rss feed and populdates the related zu with
// article items
function populateUi() {

    $.ajax({
        url: 'http://windowscommunity.de/feed',
        type: 'GET',
        dataType: "xml",
        crossDomain:true,
    
    // If request was successful
    }).done(function (xml) {

        // Clear ui
        $("#feed").text("");

        // Iterate over each `item`.
        $.each($("item", xml), function (index, element) {

            // Extract data from found `item`
            var title = $(element).find("title").text();
            var url = $(element).find("link").text();
            var pubDate = new Date(Date.parse($(element).find("pubDate").text()));

            // Post process dates
            var date = pubDate.getDate() +'.'+ pubDate.getMonth() +'.'+ pubDate.getFullYear();
            var time = pubDate.getHours() +':'+ pubDate.getMinutes();

            // Add found item <li> to <ul> list
            $("#feed").append('<li class="item" id="'+url+'">'+ title +'<br /><span>Veröffentlicht am: '+ date +' um '+ time +' Uhr</span></a></li>');
        });

    // On error
    }).fail(function() {

        $("#feed").text('<span class="error">Ein Fehler ist aufgetreten :(');
    });
}

// Add handler function to `pageshow` event
document.addEventListener("pageshow", populateUi()); 

// Add handler function to `click` event.
// If a list item has been clicked, it will navigate to the related url
// and closes the extension's window
document.addEventListener("click", function(e) {
    
    if (e.target.classList.contains("item") == false) {
        return
    } 

    var url = e.target.id;
    browser.tabs.update({url: url})

    // Close extension
    window.close();
});


