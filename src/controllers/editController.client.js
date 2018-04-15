var pollID = window.location.pathname.split("/")[2];

var optionsCount = 0;

var begin = `<form class="poll-form">`;
var question;
var end = `
  </div>
  <button class="btn btn-primary submit-btn float-right" onClick={submitForm()} type="button">Submit</button>
  <a href="/" role="button" class="btn btn-danger float-right mr-1">Cancel</a>
  <button class="btn btn-info add-option-btn float-right mr-1" onClick={addOption()} type="button">+</button>
</form>
`;
var options = "";

$(document).ready(function () {
  getPoll("/api/polls/" + pollID);
})

function getPoll(u) {
  $.get(u, function (data) {
    setQuestion(data);

    data.options.forEach(function (o) {
      optionsCount++;
      options += `
        <div class="form-group mb-3">
          <div class="option input-group-prepend">
            <span class="input-group-text" id="inputGroup-sizing-md">
              Option ${optionsCount}:
            </span>
            <input type="text" aria-label="Medium" class="option-input form-control" aria-describedby="inputGroup-sizing-md" id="q-i-${optionsCount}"  value="${o}"/>
          </div>
        </div>
      `;
    });

    var h = begin + question + options + end;

    $('#p-c').append(h);
  });
}

function setQuestion(data) {
  question = `
    <div class="form-group mb-3">
      <div class="option input-group-prepend">
        <span class="input-group-text" id="inputGroup-sizing-md">
          Question:
        </span>
        <input type="text" aria-label="Medium" class="question-input form-control" aria-describedby="inputGroup-sizing-md" id="q-i" value="${data.question}"/>
      </div>
    </div>
    <div class='inputs-container'>
  `;
}

function addOption() {
  optionsCount += 1;
  var newChild = `
    <div class='form-group mb-3'>
      <div class='option input-group-prepend'>
        <span class='input-group-text' id='inputGroup-sizing-md'>
          Option ${optionsCount}:
        </span>
        <input type='text' aria-label='Medium' class='option-input form-control' aria-describedby='inputGroup-sizing-md'  id='q-i-${optionsCount}'/>
      </div>
    </div>`;
  $('.inputs-container').append(newChild);
}

function submitForm() {
  var question = $('#q-i').val();
  var options = [];
  for (var i = 1; i <= optionsCount; i++) {
    options.push($(`#q-i-${i}`).val());
  }
  var poll = {
    "question": question,
    "options": options
  };
  postForm(poll);
}

function postForm(reqBody) {
  reqBody.pollID = pollID;
  var reqUrl = "/api/user/:id/polls/";
  $.ajax({
    type: "POST",
    url: reqUrl,
    data: reqBody,
    dataType: "json",
    success: function(data) {
      if (data.redirect) window.location.href = data.redirect;
    },
    error: function (data) {
        console.log("Error");
        console.log(data);
      },
  });
}
