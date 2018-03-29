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

    makeChart(data);
  });
}

function makeChart(data) {
  var ctx = $("#myChart");
  var myChart = new Chart(ctx, {
    type: 'bar',
    data: {
      labels: data.options,
      datasets: [{
        label: 'Number of Votes',
          data: data.votes,
          backgroundColor: [
            'rgba(255, 99, 132, 0.2)',
            'rgba(54, 162, 235, 0.2)',
            'rgba(255, 206, 86, 0.2)',
            'rgba(75, 192, 192, 0.2)',
            'rgba(153, 102, 255, 0.2)',
            'rgba(255, 159, 64, 0.2)'
          ],
          borderColor: [
            'rgba(255,99,132,1)',
            'rgba(54, 162, 235, 1)',
            'rgba(255, 206, 86, 1)',
            'rgba(75, 192, 192, 1)',
            'rgba(153, 102, 255, 1)',
            'rgba(255, 159, 64, 1)'
          ],
          borderWidth: 1
        }]
    },
    options: {
        scales: {
            yAxes: [{
                ticks: {
                    beginAtZero:true
                }
            }]
        }
    }
});
}

function makeTweet() {
  $('#tweet').attr('href', tweet);
}

$(document).ready(function () {
  makeTweet();
  getData("/api" + path);
});
