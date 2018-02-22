///////model/////////

// An array to keep track of all the movies you have yet to watch.
var movieList = [];

// An ID to keep trackk of each movie.
var nextMovieId = 1000;

// Movie constructor
function Movie(name, rating, genre, watched, year) {
    this.id = nextMovieId++;
    this.name = name;
    this.year = year;
    this.rating = rating;
    this.genre = genre;
    this.watched = watched;

    this.findYear = function() {
        return this.year;
    }
    // a function to return the name.
    this.sortableName = function() {
        return this.name;
    }
}

// create the movie
function modelCreateMovie(name, year, rating, genre, watched) {
    var newMovie = new Movie(name, year, rating, genre, watched);
    movieList.push(newMovie);
    return newMovie;
}

// get all movies in the list
function modelGetAllMovies() {
    return movieList;
}

// Get a movie by its ID
function modelGetMovie(id) {
    for (x in movieList) {
        if (movieList[x].id === id) {
            //return movieList[x];
            return x;
        }
    }
    return undefined;
}

// Function for when the user clicks the Save button.
UpdateItem = function () {
}

// Function for when the user clicks the Delete button and then confirms.
DeleteItem = function(id) {
}
