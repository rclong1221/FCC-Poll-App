var optionsCount = 2;
var inputs1 = "<div class='input-group input-group-md mb-3'><div class='option input-group-prepend'><span class='input-group-text' id='inputGroup-sizing-md'>Option "
var inputs2 = ": </span><input type='text' aria-label='Medium' class='option-input form-control' aria-describedby='inputGroup-sizing-md'  id='q-i-"
var inputs3 = "'></input></div></div>"

// <div class="input-group input-group-sm mb-3">
//   <div class="input-group-prepend">
//     <span class="input-group-text" id="inputGroup-sizing-sm">Small</span>
//   </div>
//   <input type="text" class="form-control" aria-label="Small" aria-describedby="inputGroup-sizing-sm">
// </div>

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
  var reqUrl = "/api/polls/";
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
