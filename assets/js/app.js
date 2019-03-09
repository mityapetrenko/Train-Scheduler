
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
        });



        database.ref().orderByChild("dateAdded").on("child_added", function(childSnapshot) {
                var nextArrival=$(childSnapshot.val().nextArrival);
                var minAway=$(childSnapshot.val().minAway);
                var currentTime=moment().format("HH:mm");
            var rows ="<tr><td>" + childSnapshot.val().name + "</td><td>" + childSnapshot.val().destination + "</td><td>" + childSnapshot.val().nextArrival + "</td><td>" + childSnapshot.val().minAway + "</td></tr>";
                console.log(currentTime);
            $("#tableBody").append(rows);

            console.log(childSnapshot.val());
            console.log(childSnapshot.val().name);
            console.log(childSnapshot.val().destination);
            console.log(childSnapshot.val().trainTime);
            console.log(childSnapshot.val().frequency);
            var trainArrival = database.trainTime;
                console.log(trainArrival);
            // Calculate the months worked using hardcore math
            // To calculate the months worked
            var nextArrival =moment(trainArrival).fromNow();
            console.log(nextArrival);

    });
        