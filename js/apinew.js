$(function() {
    var $results = $('.flexbox-news');

    $('#news-select').on('change', function() {
        event.preventDefault();
        selected = $(this).val();

        $('.flexbox-news').append('<img id="loader-img" alt"" src="../assets/images/ajax-loader.gif" class="loadgif"');


        $.ajax({
                method: 'GET',
                url: 'https://api.nytimes.com/svc/topstories/v2/' + selected + '.json?api-key=iZg3OhUhA3W7q0e6XOYMwQc0Cxo4zaHD',
                dataType: 'json'
            })

            .done(function(data) {

                $('.flexbox-news').empty();
                for (var i = 0; i < 12; i++) {

                    const newsImage = data.results[i].multimedia[4].url;
                    const newsAbstract = data.results[i].abstract;
                    const newsUrl = data.results[i].url;

                    $('.flexbox-news').append('<a target="_blank" href=" ' + newsUrl + ' "><div class="holder"><p class="holder-text" id="text">' + newsAbstract + '</p></div></a>');
                    $('.holder').last().css('background', 'url(' + newsImage + ')');
                }

            })
            .fail(function() {
                $('p').append('Sorry there was an error.');
            })


    })
});