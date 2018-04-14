var pollID = window.location.pathname.split("/")[2];

var optionsCount = 0;

var inputs1 = "<div class='input-group input-group-md mb-3'><div class='option input-group-prepend'><span class='input-group-text' id='inputGroup-sizing-md'>Option "
var inputs2 = ": </span><input type='text' aria-label='Medium' class='option-input form-control' aria-describedby='inputGroup-sizing-md'  id='q-i-"
var inputs3 = "'></input></div></div>"

var begin = `<form class='poll-form'>`;
var question;
var end = `
  </div>
  <div class='controls-container'>
    <button class='btn btn-info add-option-btn' onClick={addOption()} type='button'>+</button>
    <a class='btn btn-danger cancel-btn'>Cancel</a>
    <button class='btn btn-primary submit-btn' onClick={submitForm()} type='button'>Submit</button>
  </div>
</form>
`;
var options = "";

$(document).ready(function () {
  getPoll("/api/polls/" + pollID);
})

function getPoll(u) {
  $.get(u, function (data) {
    question = `
      <div class='input-group input-group-md mb-3'>
        <div class='option input-group-prepend'>
          <span class='input-group-text' id='inputGroup-sizing-md'>
            Question:
          </span>
          <input type='text' aria-label='Medium' class='question-input form-control' aria-describedby='inputGroup-sizing-md' id='q-i' value='${data.question}'/>
        </div>
      </div>
      <div class='inputs-container'>
    `;

    data.options.forEach(function (o) {
      optionsCount++;
      options += `
        <div class='input-group input-group-md mb-3'>
          <div class='option input-group-prepend'>
            <span class='input-group-text' id='inputGroup-sizing-md'>
              Option ${optionsCount}:
            </span>
            <input type='text' aria-label='Medium' class='option-input form-control' aria-describedby='inputGroup-sizing-md'  id='q-i-${optionsCount}' value='${o}'/>
          </div>
        </div>
      `;
    });

    var h = begin + question + options + end;

    $('#p-c').append(h);
  });
}

function addOption() {
  optionsCount += 1;
  var newChild = inputs1 + optionsCount + inputs2 + optionsCount + inputs3;
  $('.inputs-container').append(newChild);
}

function submitForm() {
  var question = $('#q-i').val();
  var options = [];
  for (var i = 1; i <= optionsCount; i++) {
    var inputID = '#q-i-' + i;
    // console.log(`inputID: ${inputID}`);
    // console.log($(inputID).val());
    options.push($(inputID).val());
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
  });
}
