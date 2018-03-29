var p1 = "<div class='col-9' id='";
//id
var p2 = "'><a class='' id='";
 // id
var p3 = "' href='/polls/";
 // id
var p4 = "'><div class='text-center my-auto poll'>";
 // question
var p5 = "</div></a></div>"

var p6 = "<div class='col-3'><button class='btn btn-danger' type='button' onClick={deletePoll('"
// id
var p7 = "')}>Delete Poll</button></div>"

function deletePoll(id) {
  var d = { "_id": id };
  $.ajax({
    type: "DELETE",
    url: "/api/polls/" + id,
    data: d,
    dataType: "json",
    success: function(data) {
      if (data.redirect) {
        window.location.href = data.redirect;
      }
      else {
        // data.form contains the HTML for the replacement form
        // toast
        // $("#myform").replaceWith(data.form);
        console.log("Else");
      }
    },
    error: function (data) {
        console.log("Error");
        console.log(data);
      },
  })
}

function getData() {
  var id = "25912187";
  $.get(`/api/user/${id}/polls/`, function( data ) {
    var h = "";
    for (var i = 0; i < data.length; i++) {
      var entry = p1 + p2 + p3 + data[i]._id + p4 + data[i].question + p5;
      entry += p6 + data[i]._id + p7;
      $("#m-p").append(entry);
    }
  });
}


$(document).ready(getData());
