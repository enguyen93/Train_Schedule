// Initializing Firebase
var config = {
    apiKey: "AIzaSyAssPA5eJz5wac93wgzY9IbDeCi8H-uRKk",
    authDomain: "trainschedule-35128.firebaseapp.com",
    databaseURL: "https://trainschedule-35128.firebaseio.com",
    projectId: "trainschedule-35128",
    storageBucket: "trainschedule-35128.appspot.com",
    messagingSenderId: "915094527989"
};
firebase.initializeApp(config);
// Variable to call on firebase
var database = firebase.database();
// All the things that happen when you click on the submit button
$("#submit-Btn").on("click", function (event) {
    event.preventDefault();

    // Grabbed values from text-boxes
    trainNameInput = $("#trainNameInput").val().trim();
    destinationInput = $("#destinationInput").val().trim();
    trainTimeInput = $("#trainTimeInput").val().trim();
    frequencyInput = $("#frequencyInput").val().trim();

    // Creates local "temporary" object for holding employee data
    var newTrain = {
        train: trainNameInput,
        destination: destinationInput,
        arrivalTime: trainTimeInput,
        frequency: frequencyInput,
    };

    // Code for "Setting values in the database"
    database.ref().push(newTrain);
    // Clearing the forms 
    $("#trainNameInput, #destinationInput, #trainTimeInput, #frequencyInput").val("");
    
});

database.ref().on("child_added", function (childSnapshot) {
    // storing the snapshot.val() in a variable for convenience
    var sv = childSnapshot.val();
    // Creating variables to call on for math functions and to append to Holder
    var firebaseName = sv.train;
    var firebaseDest = sv.destination;
    var firebaseArrivalTime = sv.arrivalTime;
    var firebaseFrequency = sv.frequency;
    // Math to get the time converted
    var startTimeConverted = moment(firebaseArrivalTime, "hh:mm").subtract(1, "years");
    // Finding the difference in time in minutes
    var diffTime = moment().diff(moment(startTimeConverted), "minutes");
    var tRemainder = diffTime % firebaseFrequency;
    var minutesAway = firebaseFrequency - tRemainder;

    // Next Train
    var nextTrain = moment().add(minutesAway, "minutes");
    var tArrival = moment(nextTrain).format("HH:mm");

    // Console.logging the last user's data
    console.log(sv.train);
    console.log(sv.destination);
    console.log(sv.arrivalTime);
    console.log(sv.frequency);
    console.log(minutesAway);

    //Creating and appending to the Holder
    var newRow = $("<tr>").append(
        $("<td>").text(firebaseName),
        $("<td>").text(firebaseDest),
        $("<td>").text(firebaseFrequency),
        $("<td>").text(tArrival),
        $("<td>").text(minutesAway)
    );
    $(".trainTable > tbody").append(newRow);

    // Handle the errors
}, function (errorObject) {
    console.log("Errors handled: " + errorObject.code);
});