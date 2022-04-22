let congrats = "Congrats, you passed!";
let sorry = "Sorry but you failed.";
let correct = 0;
let total = 0;
let name1 = "";
const appState = {
  current_view : "#intro_view",
  current_question : 0,
  current_model : {}
}
function timer(x){
  let hours = 0;
  let minutes = 0;
  let seconds = 0;
  window.interval = window.setInterval(function function1(){
    document.getElementById("seconds").innerHTML = seconds;
    if (seconds == 60) {
      seconds = 0;
      minutes++;
      document.getElementById("minutes").innerHTML = minutes;
    }
    if (minutes == 60) {
      minutes = 0;
      hours++;
      document.getElementById("hours").innerHTML = hours;
    }
    seconds++;
  }, 1000);

};

document.addEventListener('DOMContentLoaded', () => {

  appState.current_view =  "#chooseQuiz";
  appState.current_model = {
    action : "start_app"
  }
  update_view(appState);

  document.querySelector("#widget_view").onclick = (e) => {
    handle_widget_event(e)
  }
});

async function get_data_fetch_async(x) {
  console.log(total);
  console.log(correct);
  const response = await fetch("https://my-json-server.typicode.com/nexodius-gen/NeXoDiUs-GeN.github.io/questions");
  const data = await response.json();
  appState.current_model = data[x.current_question];
  setQuestionView(appState);
  update_view(appState);
}
function handle_widget_event(e) {
  if (appState.current_view == "#chooseQuiz") {


  }
  if (appState.current_view == "#intro_view"){
    if (e.target.dataset.action == "start_app") {
      timer(appState);
      correct = correct*0;
      total = total*0;
      var x = document.getElementById('correct_answers');
      var y = document.getElementById('total_answers');
      x.innerHTML = correct;
      y.innerHTML = total;
      appState.current_question = 0
      get_data_fetch_async(appState);

    }
  }

  if (appState.current_view == "#intro_view2"){
    if (e.target.dataset.action == "start_app") {
      timer(appState);
      correct = correct*0;
      total = total*0;
      var x = document.getElementById('correct_answers');
      var y = document.getElementById('total_answers');
      x.innerHTML = correct;
      y.innerHTML = total;
      appState.current_question = 10
      get_data_fetch_async(appState);

    }
  }

  if (appState.current_view == "#question_view_true_false") {

    if (e.target.dataset.action == "answer") {
      isCorrect = check_user_response(e.target.dataset.answer, appState.current_model);
      if (isCorrect == true) {
        correct += 1;
        total += 1;
      }
      else {
        total += 1;
      }
      console.log("true false success");
      updateQuestion(appState);
      setQuestionView(appState);
      update_view(appState);
    }
  }
  // Handle answer event for  text questions.
  if (appState.current_view == "#question_view_text_input") {
    if (e.target.dataset.action == "submit") {

      user_response = document.querySelector(`#${appState.current_model.answerFieldId}`).value;
      isCorrect = check_user_response(user_response, appState.current_model);
      if (isCorrect == true) {
        correct += 1;
        total += 1;
      }
      else {
        total += 1;
      }
      console.log("text input success");
      updateQuestion(appState);
      setQuestionView(appState);
      update_view(appState);
    }
  }
  if (appState.current_view == "#question_view_multiple_choice") {
    if (e.target.dataset.action == "answer2") {
      // Controller - implement logic.
      isCorrect = check_user_response(e.target.dataset.answer, appState.current_model);
      if (isCorrect == true) {
        correct += 1;
        total += 1;
      }
      else {
        total += 1;
      }
      console.log("multiple choice success");
      updateQuestion(appState);
      setQuestionView(appState);
      update_view(appState);
    }
  }
  if (appState.current_view == "#question_view_narrative_text_response") {
    if (e.target.dataset.action == "answer3") {
      // Controller - implement logic.
      isCorrect = check_user_response(e.target.dataset.answer, appState.current_model);
      if (isCorrect == true) {
        correct += 1;
        total += 1;
      }
      else {
        total += 1;
      }
      console.log("narrative text response success");
      updateQuestion(appState);
      setQuestionView(appState);
      update_view(appState);
    }
  }
  if (appState.current_view == "#question_view_image_selection") {
    if (e.target.dataset.action == "submit2") {

      isCorrect = check_user_response(e.target.dataset.answer, appState.current_model);
      if (isCorrect == true) {
        correct += 1;
        total += 1;
      }
      else {
        total += 1;
      }
      console.log("image selection success");
      updateQuestion(appState);
      setQuestionView(appState);
      update_view(appState);
    }
  }

  if (appState.current_view == "#end_view") {
    window.clearInterval(interval);
    if ((correct/total) > .80) {
      var message = document.getElementById('message');
      message.innerHTML = congrats;
      let score_message = `You scored a ${correct} out of ${total} which is equal to ${(correct*100)/total}%.`
      var message2 = document.getElementById('message2');
      message2.innerHTML = score_message;
    }
    else {
      var message = document.getElementById('message');
      message.innerHTML = sorry;
      let score_message = `You scored a ${correct} out of ${total} which is equal to ${(correct*100)/total}%.`
      var message2 = document.getElementById('message2');
      message2.innerHTML = score_message;
    }
    if (e.target.dataset.action == "start_again") {
      appState.current_view =  "#intro_view";
      appState.current_model = {
        action : "start_app"
      }
      update_view(appState);
    }
  }
}

function check_user_response(user_answer, model) {
  if (user_answer == model.correctAnswer) {
    return true;
  }
  return false;
}


function updateQuestion(appState) {
  var x = document.getElementById('correct_answers');
  var y = document.getElementById('total_answers');
  x.innerHTML = correct;
  y.innerHTML = total;


  if (appState.current_question < 19) {
    appState.current_question =   appState.current_question + 1;
    get_data_fetch_async(appState);
  }
  else {
    appState.current_question = -2;
    appState.current_model = {};
  }
}

function setQuestionView(appState) {

  if (appState.current_question == -2) {
    appState.current_view  = "#end_view";
    return
  }
  else if (appState.current_model.questionType == "true_false") {
    appState.current_view = "#question_view_true_false";
  }
  else if (appState.current_model.questionType == "text_input") {
    appState.current_view = "#question_view_text_input";

  }
  else if (appState.current_model.questionType == "multiple_choice") {
    appState.current_view = "#question_view_multiple_choice";

  }
  else if (appState.current_model.questionType == "narrative_text_response") {
    appState.current_view = "#question_view_narrative_text_response";

  }
  else if (appState.current_model.questionType == "image_selection") {
    appState.current_view = "#question_view_image_selection";

  }
}

function update_view(appState) {
  const html_element = render_widget(appState.current_model, appState.current_view)
  document.querySelector("#widget_view").innerHTML = html_element;
}
//

const render_widget = (model,view) => {
  // Get the template HTML
  template_source = document.querySelector(view).innerHTML
  // Handlebars compiles the above source into a template
  var template = Handlebars.compile(template_source);

  // apply the model to the template.
  var html_widget_element = template({...model,...appState})

  return html_widget_element
}
