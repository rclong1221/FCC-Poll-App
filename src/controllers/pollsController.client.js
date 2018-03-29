var p1 = "<div class='col-xs-12 col-sm-6 col-md-4' id='";
//id
var p2 = "'><a class='' id='";
 // id
var p3 = "' href='/polls/";
 // id
var p4 = "'><div class='text-center my-auto poll'>";
 // question
var p5 = "</div></a></div>"

$(document).ready(getData());

function getData() {
  $.get( "/api/polls", function( data ) {
    var h = "";
    for (var i = 0; i < data.length; i++) {
      var entry = p1 + p2 + p3 + data[i]._id + p4 + data[i].question + p5;
      $("#p-c").append(entry);
    }
  });
}
