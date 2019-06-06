
// Your app should take the topics in this array and create buttons in your HTML.


// Try using a loop that appends a button for each string in the array.


// When the user clicks on a button, the page should grab 10 static, 
// non-animated gif images from the GIPHY API and place them on the page.
// When the user clicks one of the still GIPHY images, the gif should animate. 
// If the user clicks the gif again, it should stop playing.

var cars = ["Mustang", "Corvette", "Charger", "Challanger"];
var model = "";

function renderButtons() {
    for (var i = 0; i < cars.length; i++) {
        console.log(cars);
        var btn = $("<button>");
        btn.addClass("btn btn-success car-btn");
        btn.attr("data-car", cars[i]);
        btn.text(cars[i]);
        $("#btn-container").append(btn);
    }
}
renderButtons();

function addNewButton() {
    $("#addGif").on("click", function () {
        var model = $("#topicInput").val().trim();
        if (model == "") {
            return false;
        }
        topic.push(model);

        displayGifButtons();
        return false;
    });
}

function removeLastButton() {
    $("removeGif").on("click", function () {
        topic.pop(model);
        displayGifButtons();
        return false;
    });

}

// function that displays the gifs

function displayGifs() {
    var model = $(this).attr("data-name");
    var queryURL = "https://api.giphy.com/v1/gifs/search?q=" + model + "&api_key=dc6zaTOxFJmzC&limit=8";

    $.ajax({
        url: queryURL,
        method: 'GET'
    })

        .done(function (response) {
            $("#gifsView").empty();
            //show results of gifs displayed
            var results = response.data;

            for (var i = 0; i < results.length; i++) {
                //create a div to put gifs in
                var gifDiv = $("<div1>");
                //pull rating of gif
                var gifRating = $("<p>").text("Rating " + results[i].rating);
                gifDiv.append(gifRating);

                //pull gif
                var gifImage = $("<img>");
                gifImage.attr("src", results[i].images.fixed_height_small_still.url);
                //paused images
                gifImage.attr("data-still", results[i].images.fixed_height_small_still.url);
                //animated images
                gifImage.attr("data-animate", results[i].images.fixed_height_small.url);
                //how images come in, already paused
                gifImage.attr("data-state", "still");
                gifImage.addClass("image");
                gifDiv.append(gifImage);
                //add a new div to existing divs
                $("#gifsView").prepend(gifDiv);
            }
        });
}


displayGifButtons();
addNewButton();
removeLastButton();



$(document).on("click", ".lady", displayGifs);
$(document).on("click", ".image", function () {
    var state = $(this).attr('data-state');
    if (state == 'still') {
        $(this).attr('src', $(this).data('animate'));
        $(this).attr('data-state', 'animate');
    } else {
        $(this).attr('src', $(this).data('still'));
        $(this).attr('data-state', 'still');
    }

});





// I had gifs being displayed, but then I tried to pause and play gifs; I had trouble displaying them in the browser.