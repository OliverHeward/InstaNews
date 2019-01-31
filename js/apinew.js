// Set jQuery and function call
$(function() {

    // On change event function for <select> - <option>
    $('#news-select').on('change', function() {
        // Prevents default event from happening
        event.preventDefault();
        // Specific (this).val() choice from <option> into a variable
        selected = $(this).val();

        // logo gif - not sure if it works as internet speeds too high.
        $('.flexbox-news').append('<img id="loader-img" alt"" src="../assets/images/ajax-loader.gif" class="loadgif"');

        // ajax GET request from Times API
        $.ajax({
                method: 'GET',
                // URL string cut with variable selected of (this).val() chosen
                url: 'https://api.nytimes.com/svc/topstories/v2/' + selected + '.json?api-key=iZg3OhUhA3W7q0e6XOYMwQc0Cxo4zaHD',
                // Setting dataType recieved to JSON (as it is a JSON response)
                dataType: 'json'
            })

            // When done run this function to retrieve data
            .done(function(data) {

                // .empty removing any problems in the html before data is placed in
                $('.flexbox-news').empty();

                // a FOR loop stating to start at 0 and increment up to 12 then stop
                for (var i = 0; i < 12; i++) {

                    // Variable set for Image data
                    const newsImage = data.results[i].multimedia[4].url;
                    // Variable set for News Paragraph
                    const newsAbstract = data.results[i].abstract;
                    // Variable set for News URL hyperlink
                    const newsUrl = data.results[i].url;

                    // Bruteforce to append/add an anchored link target to a DIV with a nested P element within parent container of <div class="flexbox-news"
                    $('.flexbox-news').append('<a target="_blank" href=" ' + newsUrl + ' "><div class="holder"><p class="holder-text" id="text">' + newsAbstract + '</p></div></a>');
                    // Honestly not sure why, but .last() makes these all show even though its too target the last element
                    // .css() sets the background too nested URL variable set from API JSON
                    $('.holder').last().css('background', 'url(' + newsImage + ')');
                }

            })
            // .fail function appends a floating H1 in the HTML too say 'Sorry there was an error, please refresh and try again'
            .fail(function() {
                $('#error').append('Sorry there was an error, please refresh and try again.');
            })


    })
});