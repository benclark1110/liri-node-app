require("dotenv").config();
//var keys = require("key.js");

var fs = require("fs");

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
  
  var nodeArgs = process.argv;
  
  var commandName = "";

  for (var i = 3; i < nodeArgs.length; i++) {

    if (i > 3 && i < nodeArgs.length) {
      commandName = commandName + "+" + nodeArgs[i];
    }
    else {
      commandName += nodeArgs[i];
    }
  }

  var axios = require("axios");

  axios.get("https://rest.bandsintown.com/artists/" + commandName + "/events?app_id=codingbootcamp").then(
      function(response) {
          concertVenue = "Venue: " + response.data[0].venue.name;
          concertLocation = "Location: " + response.data[0].venue.city;
          concertDate = "Date of the Event: " + moment(response.data[0].datetime).format("MM/DD/YYYY");
          concertDetails = concertVenue + "\n" + concertLocation + "\n" + concertDate + "\n-------------\n";
          logStuff(concertDetails);
      }
  );

  
}

function movie() {
  var nodeArgs = process.argv;
  
  var commandName = "";

  for (var i = 3; i < nodeArgs.length; i++) {

    if (i > 3 && i < nodeArgs.length) {
      commandName = commandName + "+" + nodeArgs[i];
    }
    else {
      commandName += nodeArgs[i];
    }
  }

  var axios = require("axios");

  axios.get("http://www.omdbapi.com/?t=" + commandName + "&y=&plot=short&apikey=trilogy").then(
      function(response) {

          movieTitle = "Title: " + response.data.Title;
          movieYear = "Year: " + response.data.Year;
          imdbRating = "IMDB Rating: " + response.data.Ratings[0].Value;
          rottenRating = "Rotten Tomatoes Rating: " + response.data.Ratings[1].Value;
          movieCountry = "Country: " + response.data.Country;
          movieLanguage = "Language: " + response.data.Language;
          moviePlot = "Plot: " + response.data.Plot;
          movieActors = "Actors: " + response.data.Actors;
          movieDetails = movieTitle + "\n" + movieYear + "\n" + imdbRating + "\n" + rottenRating + "\n" + movieCountry + movieLanguage + "\n" + moviePlot + "\n" + movieActors + "\n-------------\n";
          logStuff(movieDetails);
      }
  );
}

function song() {
  var nodeArgs = process.argv;
  
  var commandName = "";

  if (nodeArgs.length == 3) {
    commandName = "the+sign"
  }

  for (var i = 3; i < nodeArgs.length; i++) {
    if (i > 3 && i < nodeArgs.length) {
      commandName = commandName + "+" + nodeArgs[i];
    }
    else {
      commandName += nodeArgs[i];
    }
  }

    spotify.search({ type: 'track', query: commandName }, function(err, data) {
      if (err) {
        return console.log('Error occurred: ' + err);
      }
    
      songArtist = "Artist: " + data.tracks.items[0].artists[0].name;
      songName = "Name: " + data.tracks.items[0].name;
      spotifyLink = "Spotify link: " + data.tracks.items[0].external_urls.spotify;
      songAlbum = "Album: " + data.tracks.items[0].album.name;
      songDetails = songArtist + "\n" + songName + "\n" + spotifyLink + "\n" + songAlbum + "\n-------------\n";
      logStuff(songDetails);
    });

}



function whatItSay() {
  
  fs.readFile("random.txt", "utf8", function(error, data) {

    if (error) {
      return console.log(error);
    }
    
    var dataArr = data.split(",");
  
    //console.log(dataArr[1].toString().replace(/['"]+/g, ''));
  
    var nodeArgs = dataArr[1];
    
    var commandName = "";

    for (var i = 3; i < nodeArgs.length; i++) {
      if (i > 3 && i < nodeArgs.length) {
        commandName = commandName + "+" + nodeArgs[i];
      }
      else {
        commandName += nodeArgs[i];
      }
    }

      spotify.search({ type: 'track', query: commandName }, function(err, data) {
        if (err) {
          return console.log('Error occurred: ' + err);
        }
      
        songArtist = "Artist: " + data.tracks.items[0].artists[0].name;
        songName = "Name: " + data.tracks.items[0].name;
        spotifyLink = "Spotify link: " + data.tracks.items[0].external_urls.spotify;
        songAlbum = "Album: " + data.tracks.items[0].album.name;
        songDetails = songArtist + "\n" + songName + "\n" + spotifyLink + "\n" + songAlbum + "\n-------------\n";
        logStuff(songDetails);
      });
  });

}

function logStuff(stuff) {
  fs.appendFile("log.txt", stuff, function(err) {

    if (err) {
      console.log(err);
    }

    else {
      console.log("Content Added!");
    }

  });
}