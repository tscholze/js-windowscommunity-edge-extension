
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

        // Iterate over each `item`.
        $.each($("item", xml), function (i, e) {

            // Extract needed data from found item object
            var title = $(e).find("title").text();
            var url = $(e).find("link").text();;

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