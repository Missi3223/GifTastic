$(document).ready(function () {

    //original button names
var topics=[
        'kittens',
        'cats',
        'puppies',
        'dogs',
        'dolphins'];

    //create original and new buttons from array then add giphs from giphy site
function renderButtons(){
    $('#addButton').empty();
    for (var i=0; i < topics.length; i++){
    //name buttons
        var button=$('<button>');
            button.addClass('topic');
            button.attr('data-name', topics[i]);
            button.text(topics[i]);
        $('#addButton').append(button); 
        
    }
    addGif();
};

    $('#addGif').on('click', function() {
        var userGif = $('#userChoice').val().trim();
            console.log($('#userChoice'));
            topics.push(userGif);
            renderButtons();
            console.log(topics);
        return false;
});
    renderButtons();


    //defining #addGif, where to gather the information and where to place API info.
function addGif() {
    $('button').on('click', function() {
        var p = $(this).attr('data-name');
        var queryURL = "https://api.giphy.com/v1/gifs/search?api_key=xG9qyS859HjNmyyBAVZKahBHCT1I5FUQ&q=" + p + "&limit=10";

        $.ajax({ url: queryURL, method: 'GET' })
        .done(function(response) {
            var results = response.data;
            console.log(response.data);

            for (var i = 0; i < results.length; i++) {        
                var gifDiv = $('<div class=item>');
                var rating = results[i].rating;
                var p = $('<p>').text("Rated: " + rating);


                var gifImage = $('<img>');
                // var gifImage = $(this).attr('<img>');
                gifImage.attr('src', results[i].images.fixed_height_still.url);
                gifImage.attr('data-animate', results[i].images.fixed_height.url)
                gifImage.attr('data-still', results[i].images.fixed_height_still.url)
                .attr('data-state', 'still');
              

                gifDiv.append(gifImage)
                gifDiv.append(p)

                $('#gif').prepend(gifDiv);
                console.log(gifDiv);
            }
            $('.item').children('img').on('click', function() {

                var state = $(this).attr('data-state');

                if (state == 'still') {
                    $(this).attr('src', $(this).data('animate'));
                    $(this).attr('data-state', 'animate');
                } else {
                    $(this).attr('src', $(this).data('still'));
                    $(this).attr('data-state', 'still');
                }
            });
        });
    });
}
})



     

