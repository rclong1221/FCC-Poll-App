var path = window.location.pathname;

var p1 = "<div class='col-xs-12 col-sm-6 col-md-4' id='";
//id
var p2 = "'><a class='' id='";
 // id
var p3 = "' href='/poll-";
 // id
var p4 = "'><div class='text-center my-auto poll'>";
 // question
var p5 = "</div></a></div>"

function getData(u) {
  console.log(u);
  $.get(u, function (data) {
    console.log(data);
  });
}

$(document).ready(getData("/api" + path));
