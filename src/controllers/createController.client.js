var optionsCount = 2;

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
  var reqUrl = "/api/polls/";
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
