var optionsCount = 1;
var inputs1 = "<div class='option'><span>Option "
var inputs2 = ": </span><input class='option-input' id='q-i-"
var inputs3 = "'></input></div>"

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
  var reqUrl = "/submit-poll";
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

// $(document).load()
