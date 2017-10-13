//$.ajax({
//    url: '/API/GetRandomRiddle',
//    method: 'GET',
//    data: {
//    }
//})
//    .done(function (result) {
//        console.log(result)
//        console.log('hej')
//        $("#riddleBox").html(result)
//    })
//    .fail(function (xhr, status, error) {
//        console.log("Error", xhr, status, error);
//        $("#error").html(`Error! ${xhr.responseJSON.Message}`);
//    })

$("#answerButton").click(function () {

    var answer = $("#answerBox").val();
    var activeRiddle = $("#riddleBox").html();

    $.ajax({
        url: '/API/GetAnswer',
        method: 'GET',
        data: {
            riddleAnswer: answer,
            riddle: activeRiddle 
        }
    })
        .done(function (result) {
            console.log(result)
        })
        .fail(function (xhr, status, error) {
            console.log("Error", xhr, status, error);
            $("#error").html(`Error! ${xhr.responseJSON.Message}`);
        })
})