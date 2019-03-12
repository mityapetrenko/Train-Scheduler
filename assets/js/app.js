
  // Initialize Firebase
  var config = {
    apiKey: "AIzaSyA1zx9djYqx8wpZABMfcdsjsNfamzmW2RE",
    authDomain: "train-scheduler-811a8.firebaseapp.com",
    databaseURL: "https://train-scheduler-811a8.firebaseio.com",
    projectId: "train-scheduler-811a8",
    storageBucket: "train-scheduler-811a8.appspot.com",
    messagingSenderId: "900690624107"
  };
  firebase.initializeApp(config);

var database=firebase.database();
console.log(database);
var name="";
var destination="";
var trainTime="";
var frequency="";
        $("#add-train").on("click",  function(event){
            event.preventDefault();
        name=$("#inputName").val().trim();
        destination=$("#inputDestination").val().trim();
        trainTime=$("#inputTime").val().trim();
        frequency=$("#inputFrequency").val().trim();
        console.log(name,destination,trainTime,frequency);
    database.ref().push({
        name:name,
        destination: destination,
        trainTime: trainTime,
        frequency:frequency,
        dateAdded:firebase.database.ServerValue.TIMESTAMP,
        })
        $("#inputName").val("");
        $("#inputDestination").val("");
        $("#inputTime").val("");
        $("#inputFrequency").val("");

        });



        database.ref().orderByChild("dateAdded").on("child_added", function(childSnapshot) {
             console.log(currentTime);
            var currentTime=moment().format("HH:mm");
        
            console.log(childSnapshot.val().name);
            console.log(childSnapshot.val().destination);
            console.log(childSnapshot.val().trainTime);
            console.log(childSnapshot.val().frequency);
            var trainFrequency = childSnapshot.val().frequency;
                console.log(trainFrequency);
            var initialTime= childSnapshot.val().trainTime;
            console.log(initialTime);
            var firstTimeConverted = moment(initialTime, "HH:mm").subtract(1, "years");
            console.log(firstTimeConverted); 
            var diffTime = moment().diff(moment(firstTimeConverted), "minutes");
            console.log("DIFFERENCE IN TIME: " + diffTime);
            var tRemainder = diffTime % trainFrequency;
            console.log(tRemainder);
            var tMinutesTillTrain = trainFrequency - tRemainder;
            console.log("MINUTES TILL TRAIN: " + tMinutesTillTrain);
            var nextTrain = moment().add(tMinutesTillTrain, "minutes");
            console.log("ARRIVAL TIME: " + moment(nextTrain).format("hh:mm"));
        
            var rows ="<tr><td>" + childSnapshot.val().name + "</td><td>" + childSnapshot.val().destination + "</td><td>" + childSnapshot.val().frequency + "</td><td>" + moment(nextTrain).format("HH:mm") + "</td><td>" + tMinutesTillTrain + " min" +"</td></tr>";
               
            $("#tableBody").append(rows);
    });
        