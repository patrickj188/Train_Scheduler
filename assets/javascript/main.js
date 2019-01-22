
var config = {
    apiKey: "AIzaSyAvQuHtb56X9doCkwc7HydIwialfFP0-Xo",
    authDomain: "train-scheduler-3fa51.firebaseapp.com",
    databaseURL: "https://train-scheduler-3fa51.firebaseio.com",
    projectId: "train-scheduler-3fa51",
    storageBucket: "train-scheduler-3fa51.appspot.com",
    messagingSenderId: "71379237090"
};
firebase.initializeApp(config);
var database = firebase.database();


$("#add-train").on("click", function (event) {
    event.preventDefault();

    var trainName = $("#train-name").val().trim();
    var trainDestination = $("#destination").val().trim();
    var firstTrainTime = $("#first-train-time").val().trim();
    var trainFrequency = parseInt($("#frequency").val().trim());

    var newEmp = {
        name: trainName,
        destination: trainDestination,
        firstTrainTimeData: firstTrainTime,
        trainFrequencyData: trainFrequency,
    };

    database.ref().push(newEmp);

    $("#train-name").val("");
    $("#destination").val("");
    $("#first-train-time").val("");
    $("#frequency").val("");

});

database.ref().on("child_added", function (childSnapshot) {
    console.log(childSnapshot.val());

    var trainName = childSnapshot.val().name;
    var trainDestination = childSnapshot.val().destination;
    var firstTrainTime = childSnapshot.val().firstTrainTimeData;
    var trainFrequency = childSnapshot.val().trainFrequencyData;
    var trainTimeInput = childSnapshot.val().firstTrainTimeData;

    console.log(trainDestination);
    console.log(firstTrainTime);
    console.log(trainFrequency);
    console.log(trainTimeInput);

    var diffTime = moment().diff(moment.unix(trainTimeInput), "minutes");
    var timeRemainder = moment().diff(moment.unix(trainTimeInput), "minutes") % parseInt(trainFrequency);
    var minutes = trainFrequency - timeRemainder;
    var nextTrainArrival = moment().add(minutes, "m").format("hh:mm A");
    var input;
    var output;
    var trainTime;

    input = '13:30'

    today = moment().startOf('day')
    var hours = parseInt(input.split(':')[0]);
    var mins = parseInt(input.split(':')[1]);
    trainTime = today.add(hours, 'hours').add(mins, 'minutes')
    output = moment().diff(today, 'minutes');

    console.log(output);
    console.log(nextTrainArrival);
    console.log(timeRemainder);
    console.log(minutes);

    var newRow = $("<tr>").append(
        $("<td>").text(trainName),
        $("<td>").text(trainDestination),
        $("<td>").text(trainFrequency),
        $("<td>").text(nextTrainArrival),
        $("<td>").text(output),
        // $("<td>").text(timeRemainder),
        // $("<td>").text(minutes),
    );

    $("#tbody").append(newRow);
});

