var user;

var p1 = "<div class='row no-gutters my-1'><div class='col-xs-12 col-sm-12 col-md-8 col-lg-10' id='";
//id
var p2 = "'><a class='' id='";
 // id
var p3 = "' href='/polls/";
 // id
var p4 = "'><div class='text-center my-auto poll my-polls-poll'>";
 // question
var p5 = "</div></a></div>"

var p6 = "<div class='col-xs-6 col-sm-6 col-md-2 col-lg-1'><a href='/edit/"
// id
var p7 = "/'><button class='btn btn-info btn-block my-edit-btn' type='button'>Edit</button></a></div>"

var p8 = "<div class='col-xs-6 col-sm-6 col-md-2 col-lg-1'><button class='btn btn-danger btn-block my-delete-btn' type='button' onClick={deletePoll('"
// id
var p9 = "')}>Delete</button></div></div>"

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
  $.get("/api/user/:id", function (d) {
    user = d;
    $.get(`/api/user/${user.twitter.id}/polls/`, function( data ) {
      var h = "";
      for (var i = 0; i < data.length; i++) {
        var entry = p1 + p2 + p3 + data[i]._id + p4 + data[i].question + p5;
        entry += p6 + data[i]._id + p7;
        entry += p8 + data[i]._id + p9;
        $("#m-p").append(entry);
      }
    });
  })
}

$(document).ready(getData());
