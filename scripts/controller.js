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
    document.getElementById('createBtn').style.display = "inline";
    document.getElementById('updateBtn').style.display = "none";
}

///////////////////////////////////////
function onCancelBtnClicked() {
    clearInputForm();
}

// Had to take this function out of the model because id was always returning undefined.
function modelGetMovie(id) {
    for (x in movieList) {
        if (movieList[x].id === id) {
            //return movieList[x];
            return x;
        }
    }
    return undefined;
}

///////////////////////////////////////
function onEditBtnClicked(movie) {
    var form = document.forms["editForm"];
    // call the getItemByID method to fetch the correct record. If there is no matching id then pring a debug message to the console and return.
    var movieNumber = modelGetMovie(movie);
    // Populate all the controls on the input form using values from the record.
    form.nameEdit.value = movieList[movieNumber].name;
    form.yearEdit.value = movieList[movieNumber].year;
    //form.rating.value = movieList[movieNumber].rating;
    form.movieGenre.selectedIndex = movieList[movieNumber].genre;
    // Hide the Create button and show the Update button.
    document.getElementById('movieEditArea').style.display =' block';
    document.getElementById('movieDisplayArea').style.display = "none";
    document.getElementById('createBtn').style.display = "none";
    document.getElementById('updateBtn').style.display = "inline";
    // Set the Update button's onclick handler
    var updateBtn = document.getElementById("updateBtn");
    updateBtn.onclick = function () { 
        onUpdateBtnClicked(movie.id)
    };
}

///////////////////////////////////////
// Gets data fom the form, validates it, saves it to the model, and then updates the list.
function onUpdateBtnClicked(id) {
    // Validate the data in all the controls.
    if (!validateControls())
        return;
    var tr = document.getElementById('row' + id);

    // Get data from the form controls, and create a new movie object.
    var form = document.forms["editForm"];
    var newMovie = modelCreateMovie(
        form.nameEdit.value,
        form.rating.checked,
        form.movieGenre.selectedIndex,
        form.watched.checked,
        parseInt(form.yearEdit.value));

    // Add the new movie to the view.
    updateTableItem(newMovie);

    // clear the form and all the errors.
    clearInputForm()
}

///////////////////////////////////////
function onDeleteBtnClicked(id) {
    var deleteRow = confirm("Are you sure you want to delete?");
    if (deleteRow== true) {
        var tr = document.getElementById('row' + id);
    tr.remove();
    }
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
    if (form.GRated.checked === false && form.PGRated.checked == false && form.PG13Rated.checked === false && form.RRated.checked == false) {
        document.getElementById("ratingError").style.display = "inline";
        document.getElementById("ratingError").innerHTML = "Please specify a rating!";
        validated = false;
    } else  
        document.getElementById("ratingError").innerHTML = "";

    // Genre Dropdown
    if (form.movieGenre.selectedIndex === -1) {
        document.getElementById("genreError").style.display = "inline";
        document.getElementById("genreError").innerHTML = "Please Specify a Movie Genre!";
        validated = false;
    } else 
        document.getElementById("genreError").innerHTML = "";

    // Watched Check Box
    if (form.watched.checked === true) {
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
    if (movie.genre === 0) {
        cell.innerHTML = "Comedy";
    } else if (movie.genre === 1) {
        cell.innerHTML = "Drama";
    } else if (movie.genre === 2) {
        cell.innerHTML = "Action";
    } else if (movie.genre === 3) {
        cell.innerHTML = "Romance";
    } else if (movie.genre === 4) {
        cell.innerHTML = "Animation";
    } else if (movie.genre === 5) {
        cell.innerHTML = "Western";
    } else cell.innerHTML = "Science Fiction";

    cell = row.insertCell(3);
    cell.innerHTML = "<button type='button' id='btnEdit" + movie.id + "'>Edit</button>";
    cell = row.insertCell(3);
    cell.innerHTML = "<button type = 'button' id = 'btnDelete" + movie.id + "'>Delete</button>";
    
    // Wire up handlers for the new buttons. 
    document.getElementById('btnEdit' + movie.id).onclick = function() {
        onEditBtnClicked(movie.id);
    };
    document.getElementById('btnDelete' + movie.id).onclick = function() {
        onDeleteBtnClicked(movie.id);
    };
}

function updateTableItem(movie) {

    var row = movie.id;
    row = parseInt(row) - 1;
    row = String(row);
    row = "row" + row;
    var tr = row;
    document.getElementById(tr).childNodes[0].innerHTML = movie.year;
    document.getElementById(tr).childNodes[1].innerHTML = movie.sortableName();
    //tr.childNodes[1].innerHTML = movie.sortableName();
    //tr.childNodes[2].innerHTML = movie.genre;

    /*
    var table = document.getElementById("movieTable");

    //var row = parseInt(movie.id) - 1000;
    document.getElementById("movieTable").rows[row].cells[0].innerHTML = movie.year;
    document.getElementById("movieTable").rows[row].cells[1].innerHTML = movie.sortableName();
    if (movie.genre === 0) {
        document.getElementById("movieTable").rows[row].cells[2].innerHTML = "Comedy";
    } else if (movie.genre === 1) {
        document.getElementById("movieTable").rows[row].cells[2].innerHTML = "Drama";
    } else if (movie.genre === 2) {
        document.getElementById("movieTable").rows[row].cells[2].innerHTML = "Action";
    } else if (movie.genre === 3) {
        document.getElementById("movieTable").rows[row].cells[2].innerHTML = "Romance";
    } else if (movie.genre === 4) {
        document.getElementById("movieTable").rows[row].cells[2].innerHTML = "Animation";
    } else if (movie.genre === 5) {
        document.getElementById("movieTable").rows[row].cells[2].innerHTML = "Western";
    } else document.getElementById("movieTable").rows[row].cells[2].innerHTML = "Science Fiction";
    */
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