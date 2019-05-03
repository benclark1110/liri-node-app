require("dotenv").config();
//var keys = require("key.js");////////////////////////

//can access keys using below
var Spotify = require('node-spotify-api');
var spotify = new Spotify({
                        id: process.env.SPOTIFY_ID, 
                        secret: process.env.SPOTIFY_SECRET});

var moment = require('moment');

switch (process.argv[2]) {
    case "concert-this":
      concert();
      break;
    
    case "movie-this":
      movie();
      break;
    
    case "spotify-this-song":
      song();
      break;
    
    case "do-what-it-says":
      whatItSay();
      break;
}

function concert() {
    var axios = require("axios");

    axios.get("https://rest.bandsintown.com/artists/weezer/events?app_id=codingbootcamp").then(
        function(response) {

            console.log("Venue: " + response.data[0].venue.name);
            console.log("Location: " + response.data[0].venue.city);
            console.log("Date of the Event: " + moment(response.data[0].datetime).format("MM/DD/YYYY"));
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
            console.log("Plot: " + response.data.Plot);
            console.log("Actors: " + response.data.Actors);
        }
    );
}

function song() {
    spotify.search({ type: 'track', query: 'Hollaback Girl' }, function(err, data) {
      if (err) {
        return console.log('Error occurred: ' + err);
      }
    
  console.log("Artist: " + data.tracks.items[0].artists[0].name);
  console.log("Name: " + data.tracks.items[0].name);
  console.log("Spotify link: " + data.tracks.items[0].external_urls.spotify);
  console.log("Album: " + data.tracks.items[0].album.name);
    });

}

function whatItSay() {
  spotify.search({ type: 'track', query: 'Hollaback Girl' }, function(err, data) {
    if (err) {
      return console.log('Error occurred: ' + err);
    }
  
console.log("Artist: " + data.tracks.items[0].artists[0].name);
console.log("Name: " + data.tracks.items[0].name);
console.log("Spotify link: " + data.tracks.items[0].external_urls.spotify);
console.log("Album: " + data.tracks.items[0].album.name);
  });

}