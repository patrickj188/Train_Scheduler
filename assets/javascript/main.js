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
    var firstTrainTime = moment($("#first-train-time").val().trim(), "HH:mm").subtract(10, "years").format("X");
    var trainFrequency = $("#frequency").val();

    var newTrain = {
        name: trainName,
        destination: trainDestination,
        firstTrainTimeData: firstTrainTime,
        trainFrequencyData: trainFrequency,
    };

    database.ref().push(newTrain);

    $("#train-name").val("");
    $("#destination").val("");
    $("#first-train-time").val("");
    $("#frequency").val("");

});

database.ref().on("child_added", function (childSnapshot, ID) {
    console.log(childSnapshot.val());
    console.log(childSnapshot.key);

    var trainName = childSnapshot.val().name;
    var trainDestination = childSnapshot.val().destination;
    var firstTrainTime = childSnapshot.val().firstTrainTimeData;
    var trainFrequency = childSnapshot.val().trainFrequencyData;
    var trainTimeInput = childSnapshot.val().firstTrainTimeData;

    console.log(trainDestination);
    console.log(firstTrainTime);
    console.log(trainFrequency);
    console.log(trainTimeInput);

    var tRemainder = moment().diff(moment.unix(parseInt(firstTrainTime)), "minutes") % trainFrequency;
    var tMinutes = trainFrequency - tRemainder;
    var tArrival = moment().add(tMinutes, "m").format("hh:mm A");

    var newRow = $("<tr>").append(
        $("<td>").text(trainName),
        $("<td>").text(trainDestination),
        $("<td>").text(trainFrequency),
        $("<td>").text(tArrival),
        $("<td>").text(tMinutes),
        $("<td>").append('<i class="fa fa-trash" id-attr="' + childSnapshot.key + '" aria-hidden="true"></i>')
    );

    $("#tbody").append(newRow);

    $("body").on("click", ".fa-trash", function () {
        $(this).closest("tr").remove();
        var uniqueId = $(this).attr('id-attr');
        database.ref().child(uniqueId).remove();

    });
});


