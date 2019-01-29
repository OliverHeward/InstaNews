$(function() {

    // var newsImage = " ";
    // var  newsContent = " ";
    var $results = $('.flexbox-news');

    $('.flexbox-news').hide();
    $('#news-select').on('change', function() {
        event.preventDefault();
        selected = $(this).val();
        $('.flexbox-news').show();

        $('.logo').addClass('moving-logo');
        $('.selection').addClass('moving-section');

        $.ajax({
                method: 'GET',
                url: 'https://api.nytimes.com/svc/topstories/v2/' + selected + '.json?api-key=iZg3OhUhA3W7q0e6XOYMwQc0Cxo4zaHD',
                dataType: 'json'
            })


            .done(function(data) {
                const newsContent = data.results;
                var myIterater = 1;
                $.each(newsContent, function(key, value) {
                    $('#content-holder-' + myIterater + ' p').html(value.abstract);
                    // console.log(value.abstract);
                    $.each(value.multimedia, function(k, v) {
                        if (v.format == 'superJumbo') {
                            // $("#place-holder").append('<div class="news-item"><p>Title</p><img src="v.url"><span>v.bstract.</span></div>')
                            $('#content-holder-' + myIterater).css({ "background": "url(" + v.url + ") center", "background-size": "cover" });
                            //     console.log('hello i logged, ' + v.url);
                        }
                    })
                    myIterater++;
                })
            })

            .fail(function() {
                $('').append('Sorry there was an error.');
            })

    })
});




// $('.selection').on('change', function() {
//  event.preventDefault();

//  const selected = $(this).val();
//      if (selected !== '') {
//  console.log('The value you picked is: ' + selected);
//     }
// })
// })