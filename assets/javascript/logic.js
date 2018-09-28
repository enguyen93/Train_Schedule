
var config = {
    apiKey: "AIzaSyAssPA5eJz5wac93wgzY9IbDeCi8H-uRKk",
    authDomain: "trainschedule-35128.firebaseapp.com",
    databaseURL: "https://trainschedule-35128.firebaseio.com",
    projectId: "trainschedule-35128",
    storageBucket: "trainschedule-35128.appspot.com",
    messagingSenderId: "915094527989"
};
firebase.initializeApp(config);

var database = firebase.database();

var trainNameInput = $("#trainNameInput").val().trim();
var destinationInput = $("#destinationInput").val().trim();
var trainTimeInput = $("#trainTimeInput").val().trim();
var frequencyInput = $("#frequencyInput").val().trim();

$("#submit-Btn").on("click", function (event) {
    event.preventDefault();

    // Grabbed values from text-boxes
    trainNameInput = $("#trainNameInput").val().trim();
    destinationInput = $("#destinationInput").val().trim();
    trainTimeInput = $("#trainTimeInput").val().trim(), "HH:mm".subtract(10, "years").format("X");
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
        
    $("#trainNameInput").val("");
    $("#destinationInput").val("");
    $("#trainTimeInput").val("");
    $("#frequencyInput").val("");
});

database.ref().orderByChild("dateAdded").limitToLast(1).on("child_added", function (snapshot) {
    // storing the snapshot.val() in a variable for convenience
    var sv = snapshot.val();

    var firebaseName = sv.train;
    var firebaseDest = sv.destination;
    var firebaseArrivalTime = sv.arrivalTime;
    var firebaseFrequency = sv.frequency;



    var tRemainder = moment().diff(moment.unix(firebaseArrivalTime), "minutes") % firebaseFrequency;
    console.log(tRemainder);
    var minutesAway = firebaseFrequency - tRemainder;
    console.log(minutesAway);
    var tArrival = moment().add(minutesAway, "m").format("hh:mm");
    console.log(tArrival);
    // Console.logging the last user's data
    console.log(sv.train);
    console.log(sv.destination);
    console.log(sv.arrivalTime);
    console.log(sv.frequency);
    console.log(sv.minutesAway);


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



