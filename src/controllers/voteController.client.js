var path = window.location.pathname;

var tweet = 'https://twitter.com/intent/tweet?text=' + encodeURI("Check out my poll @ ") + encodeURI(window.location.href);

var question_start = "<div class='question'>";
var question_end = "</div>";
var option_start = "<button class='option-btn btn-secondary btn-block' type='button'>";
var option_end = "</button>";

function getData(u) {
  $.get(u, function (data) {
    var h = question_start;
    h += data.question;
    h += question_end;

    for (var i = 0; i < data.options.length; i++) {
      var o = option_start;
      o += data.options[i];
      o += option_end;
      h += o;
    }

    $('#p-c').append(h);
  });
}

function tweet() {

}

$(document).ready(function () {
  $('#tweet').attr('href', tweet);
  getData("/api" + path);
});
