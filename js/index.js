
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
            var url = $(element).find("link").text();;

            // Add found item <li> to <ul> list
            $("#feed").append('<li><a class="item" href="'+url+'">'+title +'</a></li>');
        });

    // On error
    }).fail(function() {

        $("#feed").text('<span class="error">Ein Fehler ist aufgetreten :(');
    });
}

// Add function to `pageshow` event trigger
document.addEventListener("pageshow", populateUi()); 