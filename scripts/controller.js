///////controller/////////

//////Page Event Handlers////////

function onPageLoad() {
    document.getElementById('createBtn').onclick = onCreateBtnClicked;
    document.getElementById('cancelBtn').onclick = onCancelBtnClicked;
    document.getElementById("newBtn").onclick = onNewBtnClicked;

    var items = modelGetAllMovies();
    for (var i = 0; i < items.length; i++) 
        addTableItem(items[i]);

    clearInputForm();
}

/////////////////////////////////////
function onCreateBtnClicked() {
    // Validate the data in all the controls.
    if (!validateControls())
        return;

    // Get data from the form controls, and create a new movie object.
    var form = document.forms["editForm"];
    var newMovie = modelCreateMovie(
        form.nameEdit.value,
        //form.yearEdit.value,
        form.rating.checked,
        form.movieGenre.selectedIndex,
        form.watched.checked,
        parseInt(form.yearEdit.value));

    // Add the new movie to the view.
    addTableItem(newMovie);

    // clear the form and all the errors.
    clearInputForm()
}

/////////////////////////////////////
function onNewBtnClicked() {
    // Set the title on the form.
    document.getElementById('formTitle').innerHTML = "Add a Movie";

    // Hide the form, show the movie list.
    document.getElementById('movieEditArea').style.display =' block';
    document.getElementById('movieDisplayArea').style.display = "none";
    document.getElementById('createBtn').style.display = "block";
}

///////////////////////////////////////
function onCancelBtnClicked() {
    clearInputForm();
}

///////Business Logic/////////////
function validateControls() {
    var form = document.forms["editForm"];
    var validated = true;

    // Name Textbox
    if (form.nameEdit.value === "") {
        document.getElementById("nameError").style.display = "inline";
        document.getElementById("nameError").innerHTML = "Please enter a movie name!";
        validated = false;
    } else 
        document.getElementById("nameError").innerHTML = "";

    // year textbox
    if (form.yearEdit.value === "") {
        document.getElementById("yearError").style.display = "inline";
        document.getElementById("yearError").innerHTML = "Please enter a year released!";
        validated = false;
    } else if (isNaN(parseInt(form.yearEdit.value))) {
        document.getElementById("yearError").style.display = "inline";
        document.getElementById("yearError").innerHTML = "Year must be a number!";
    } else if (parseInt(form.yearEdit.value) < 1500 || parseInt(form.yearEdit.value) > 3000) {
        document.getElementById("yearError").style.display = "inline";
        document.getElementById("yearEdit").innerHTML = "Year must be an actual year that a movie was released in!";
    } else 
        document.getElementById("yearError").innerHTML = "";

    // Rating Radio Buttons
    if (form.GRated.checked == false && form.PGRated.checked == false && form.PG13Rated.checked == false && form.RRated.checked == false) {
        document.getElementById("ratingError").style.display = "inline";
        document.getElementById("ratingError").innerHTML = "Please specify a rating!";
        validated = false;
    } else  
        document.getElementById("ratingError").innerHTML = "";

    // Genre Dropdown
    if (form.movieGenre.selectedIndex == -1) {
        document.getElementById("genreError").style.display = "inline";
        document.getElementById("genreError").innerHTML = "Please Specify a Movie Genre!";
        validated = false;
    } else 
        document.getElementById("genreError").innerHTML = "";

    // Watched Check Box
    if (form.watched.checked == true) {
        document.getElementById("watchedError").style.display = "inline";
        document.getElementById("watchedError").innerHTML = "If you've watched this movie, then it shouldn't be on this list!";
        validated = false;
    } else {
        document.getElementById("watchedError").innerHTML = "";
    }
    return validated;
}

function addTableItem(movie) {
    var table = document.getElementById("movieTable");

    // Make a new row, and set its id attribute.
    var row = table.insertRow(table.rows.length);
    row.id = 'row' + movie.id;

    var cell = row.insertCell(0);
    cell.innerHTML = movie.year;

    cell = row.insertCell(1);
    cell.innerHTML = movie.sortableName();

    cell = row.insertCell(2);
    if (movie.genre == 0) {
        cell.innerHTML = "Comedy";
    } else if (movie.genre == 1) {
        cell.innerHTML = "Drama";
    } else if (movie.genre == 2) {
        cell.innerHTML = "Action";
    } else if (movie.genre == 3) {
        cell.innerHTML = "Romance";
    } else if (movie.genre == 4) {
        cell.innerHTML = "Animation";
    } else if (movie.genre == 5) {
        cell.innerHTML = "Western";
    } else cell.innerHTML = "Science Fiction";
}

function clearInputForm() {
    // Hide the form, show the movie list.
    document.getElementById('movieEditArea').style.display = 'none';
    document.getElementById('movieDisplayArea').style.display = 'block';

    var form = document.forms["editForm"];

    form.nameEdit.value = "";
    document.getElementById("nameError").innerHTML = "";

    form.yearEdit.value = "";
    document.getElementById("yearError").innerHTML = "";

    form.GRated.checked = false;
    form.PGRated.checked = false;
    form.PG13Rated.checked = false;
    form.RRated.checked = false;
    document.getElementById("ratingError").innerHTML = "";

    form.movieGenre.selectedIndex = -1;
    document.getElementById("genreError").innerHTML = "";

    form.watched.checked = false;
    document.getElementById("watchedError").innerHTML = "";
}