require("dotenv").config();
//var keys = require("./keys.js");////////////////////////

//can access keys using below
//var spotify = new Spotify(keys.spotify);////////////////////

//console.log(spotify)///////////////////////////

var moment = require('moment');

console.log(process.argv[2]);

switch (process.argv[2]) {
    case "concert-this":
      concert();
      break;
    
    case "movie-this":
      movie();
      break;
    
    case "withdraw":
      withdraw();
      break;
    
    case "lotto":
      lotto();
      break;
}

function concert() {
    var axios = require("axios");

    axios.get("https://rest.bandsintown.com/artists/weezer/events?app_id=codingbootcamp").then(
        function(response) {

            console.log("The Venue Name is: " + response.data[0].venue.name);
            console.log("The Venue Location is: " + response.data[0].venue.city);
            console.log("The Date of the Event is: " + moment(response.data[0].datetime).format("MM/DD/YYYY"));
        }
    );
}

function movie() {
    var axios = require("axios");

    axios.get("http://www.omdbapi.com/?t=big&y=&plot=short&apikey=trilogy").then(
        function(response) {

            console.log("Title: " + response.data.Title);
            console.log("Year: " + response.data.Year);
            console.log("IMDB Rating: " + response.data.Ratings[0].Value);
            console.log("Rotten Tomatoes Rating: " + response.data.Ratings[1].Value);
            console.log("Country: " + response.data.Country);
            console.log("Language: " + response.data.Language);
            console.log("Language: " + response.data.Plot);
            console.log("Language: " + response.data.Actors);
        }
    );
}
