
var config = {
    apiKey: "AIzaSyAssPA5eJz5wac93wgzY9IbDeCi8H-uRKk",
    authDomain: "trainschedule-35128.firebaseapp.com",
    databaseURL: "https://trainschedule-35128.firebaseio.com",
    projectId: "trainschedule-35128",
    storageBucket: "",
    messagingSenderId: "915094527989"
};
firebase.initializeApp(config);

var database = firebase.database();

var trainNameInput = $("#trainNameInput").val().trim();
var destinationInput = $("#destinationInput").val().trim();
var trainTimeInput = $("#trainTimeInput").val().trim();
var frequencyInput = $("#frequencyInput").val().trim();
var minutesAwayInput = $("#minutesAwayInput").val().trim();

var newTrain = {
    train: trainNameInput,
    destination: destinationInput,
    time: trainTimeInput,
    frequency: frequencyInput,
    minutes: minutesAwayInput
}


$("#submit-Btn").on("click", function (event) {
    event.preventDefault();

    // Grabbed values from text-boxes
    trainNameInput = $("#trainNameInput").val().trim();
    destinationInput = $("#destinationInput").val().trim();
    trainTimeInput = $("#trainTimeInput").val().trim();
    frequencyInput = $("#frequencyInput").val().trim();
    minutesAwayInput = $("#minutesAwayInput").val().trim();

    // Code for "Setting values in the database"
    database.ref().push({
        train: trainNameInput,
        destination: destinationInput,
        time: trainTimeInput,
        frequency: frequencyInput,
        minutes: minutesAwayInput
    });

});

database.ref().orderByChild("dateAdded").limitToLast(1).on("child_added", function (snapshot) {
    // storing the snapshot.val() in a variable for convenience
    var sv = snapshot.val();

    // Console.loging the last user's data
    console.log(sv.train);
    console.log(sv.destination);
    console.log(sv.time);
    console.log(sv.frequency);
    console.log(sv.minutes)
    // Change the HTML to reflect
    $("#trainDisplay").text(sv.train);
    $("#destinationDisplay").text(sv.destination);
    $("#timeDisplay").text(sv.time);
    $("#frequencyDisplay").text(sv.frequency);
    $("#minutesAwayDisplay").text(sv.minutes);

    // Handle the errors
}, function (errorObject) {
    console.log("Errors handled: " + errorObject.code);
});

var newRow =
    $('<tr>' +
        '<td>' + database.train + '</td>' +
        '<td>' + database.destination + '</td>' +
        '<td>' + database.time + '</td>' +
        '<td>' + database.frequency + '</td>' +
        '<td>' + database.minutes + '</td>' +
        '</tr>');
$(".classBody").append(newRow);


$('.table> tbody:last').append(newRow);