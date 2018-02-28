///////controller/////////

//////Page Event Handlers////////
$(document).ready(function () {
    $("#createBtn").click(onCreateBtnClicked);
    //document.getElementById('createBtn').onclick = onCreateBtnClicked;
    $("#cancelBtn").click(onCancelBtnClicked);
    //document.getElementById('cancelBtn').onclick = onCancelBtnClicked;
    $("#newBtn").click(onNewBtnClicked);
    //document.getElementById("newBtn").onclick = onNewBtnClicked;

    var items = modelGetAllMovies();
    $(".items").each(function() { 
        addTableItem(items[i]);
    });

    clearInputForm();
});

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
    $("#movieEditArea").show();
    $("#movieDisplayArea").hide();
    $("#movieEditArea").show();
    $("#updateBtn").hide();
}

///////////////////////////////////////
function onCancelBtnClicked() {
    clearInputForm();
}

// Had to take this function out of the model because id was always returning undefined.
function modelGetMovie(id) {
    return undefined;
    $(".movieList").each(function() { 
        if (movieList[x].id === id) {
            return x;
        }
        return undefined;
    }); 
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
    $("#movieEditArea").show();
    $("#movieDisplayArea").hide();
    $("#createBtn").hide();
    $("#movieEditArea").show();
    $("#updateBtn").show();
    // Set the Update button's onclick handler
    var updateBtn = $("#updateBtn");
    $(updateBtn).click(function () { onUpdateBtnClicked(movie.id)});
}

///////////////////////////////////////
// Gets data fom the form, validates it, saves it to the model, and then updates the list.
function onUpdateBtnClicked(id) {
    // Validate the data in all the controls.
    if (!validateControls())
        return;
    //var tr = $('row' + id);
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
    if (deleteRow == true) {
        $("#row" + id).remove();
    }
}

///////Business Logic/////////////
function validateControls() {
    var form = document.forms["editForm"];
    var validated = true;

    // Name Textbox
    if (form.nameEdit.value === "") {
        $("#nameError").show();
        $("#nameError").text("Please enter a movie name!");
        validated = false;
    } else 
        $("#nameError").text("");

    // year textbox
    if (form.yearEdit.value === "") {
        $("#yearError").show();
        $("#yearError").text("Please enter a year released!");
        validated = false;
    } else if (isNaN(parseInt(form.yearEdit.value))) {
        $("#yearError").show();
        $("#yearError").text("Year must be a number!");
    } else if (parseInt(form.yearEdit.value) < 1500 || parseInt(form.yearEdit.value) > 3000) {
        $("#yearError").show();
        $("#yearError").text("Year must be an actual year that a movie was released in!");
    } else 
        $("#yearError").text("");

    // Rating Radio Buttons
    if (form.GRated.checked === false && form.PGRated.checked == false && form.PG13Rated.checked === false && form.RRated.checked == false) {
        $("#ratingError").show();
        $("#ratingError").text("Please specify a rating!");
        validated = false;
    } else  
    $("#ratingError").text("");

    // Genre Dropdown
    if (form.movieGenre.selectedIndex === -1) {
        $("#genreError").show();
        $("#genreError").text("Please Specify a Movie Genre!");
        validated = false;
    } else 
        $("#genreError").text("");

    // Watched Check Box
    if (form.watched.checked === true) {
        $("#watchedError").show();
        $("#genreError").text("If you've watched this movie, then it shouldn't be on this list!");
        validated = false;
    } else {
        $("#genreError").text("");
    }
    return validated;
}

function addTableItem(movie) {
    var table = $("#movieTable").get(0);
    //var table = document.getElementById("movieTable");
    // Make a new row, and set its id attribute.
    var row = table.insertRow(table.rows.length);
    row.id = 'row' + movie.id;

    var cell = row.insertCell(0);
    cell.innerHTML = movie.year;

    cell = row.insertCell(1);
    cell.innerHTML = movie.sortableName();

    cell = row.insertCell(2);
    if (movie.genre === 0) {
        $("#movieTable td:contains('a')").html("hello");  
        //cell.innerHTML = "Comedy";
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
    $('#btnEdit' + movie.id).click(function() { onEditBtnClicked(movie.id) });
    $('#btnDelete' + movie.id).click(function() { onDeleteBtnClicked(movie.id) });
}

function updateTableItem(movie) {

    var row = movie.id;
    row = parseInt(row) - 1;
    row = String(row);
    row = "row" + row;
    var tr = row;
    
    document.getElementById(tr).childNodes[0].innerHTML = movie.year;
    document.getElementById(tr).childNodes[1].innerHTML = movie.sortableName();
}

function clearInputForm() {
    // Hide the form, show the movie list.
    $("#movieEditArea").hide();
    $("#movieDisplayArea").show();
    $("#createBtn").show();

    var form = document.forms["editForm"];

    form.nameEdit.value = "";
    $("#nameError").text("");

    form.yearEdit.value = "";
    $("#yearError").text("");

    form.GRated.checked = false;
    form.PGRated.checked = false;
    form.PG13Rated.checked = false;
    form.RRated.checked = false;
    $("#ratingError").text("");

    form.movieGenre.selectedIndex = -1;
    $("#genreError").text("");

    form.watched.checked = false;
    $("#watchedError").text("");
}