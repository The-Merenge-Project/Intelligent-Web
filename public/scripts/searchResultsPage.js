//Send AJAX request using JQuery
function sendAjaxQuery(url, data) {
    //Start the AJAX engine
    $.ajax({
        url: url ,    //url to contact
        data: data,   //data to send
        dataType: 'json',   //declare JSON interaction
        type: 'POST',   //declare the action(POST)
        success: function (dataR) {  //a.k.a if code 200 is returned

            // no need to JSON parse the result, as we are using dataType:json, so JQuery knows it
            // and unpacks the object for us before returning it
            var ret = dataR;

            // in order to have the object printed by alert
            // we need to JSON stringify the object
            document.getElementById('results').innerHTML= JSON.stringify(ret);
        },
        error: function (xhr, status, error) {
            alert('Error: ' + error.message);
        }
    });
}

function onChange(checkbox) {
    var checkboxArray= $("form").serializeArray();
    var data={};
    $("").prop('checked', true)

    //This makes the data in format {name:”Mickey”, surname: “Mouse”, …}
    for (index in checkboxArray){
        data[checkboxArray[index].name]= checkboxArray[index].value;
    }

    console.log(data)

    // const data = JSON.stringify($(this).serializeArray());
    sendAjaxQuery('/checkboxes', data);
    event.preventDefault();
}