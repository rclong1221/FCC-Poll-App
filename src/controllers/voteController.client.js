var path = window.location.pathname;

var tweet = 'https://twitter.com/intent/tweet?text=' + encodeURI("Check out my poll @ ") + encodeURI(window.location.href);

var question_start = "<h3 class='question text-center'>";
var question_end = "</h3>";
var option_start = "<button class='option-btn btn-secondary btn-block' type='button' onClick={castVote('";
var option_middle = "')}>";
var option_end = "</button>";

function getData(u) {
  $.get(u, function (data) {
    var h = question_start;
    h += data.question;
    h += question_end;

    for (var i = 0; i < data.options.length; i++) {
      var o = option_start;
      o += i;
      o += option_middle;
      o += data.options[i];
      o += option_end;
      h += o;
    }

    $('#p-c').append(h);

    makeChart(data);
  });
}

function castVote(index) {
  var reqUrl = "/api" + path;
  var reqBody = {
    "index": index
  }
  $.ajax({
    type: "PUT",
    url: reqUrl,
    data: reqBody,
    dataType: "json",
    success: function(data) {
      if (data.redirect) {
        window.location.href = data.redirect;
      }
      else {
        // toast
        console.log("Else");
      }
    },
    error: function (data) {
        console.log("Error");
        console.log(data);
      },
  });
}

function getVotes(data) {
  var a = [];
  for (var i = 0; i < data.voters.length; i++) {
    a.push(data.voters[i].voters.length);
  }
  return a;
}

function makeChart(data) {
  var votes = getVotes(data);
  var ctx = $("#myChart");
  var myChart = new Chart(ctx, {
    type: 'bar',
    data: {
      labels: data.options,
      datasets: [{
        label: 'Number of Votes',
          data: votes,
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
