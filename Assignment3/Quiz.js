let correct = 0;
let total = 0;
function myFunction() {
  let name1 = prompt("Please enter your name");
  return name1;
}
let name1 =  myFunction();
console.log(name1);

let congrats = `Congrats ${name1}, you passed!`;
let sorry = `Sorry ${name1} but you failed.`;
const appState = {
  current_view : "#chooseQuiz",
  current_model : {
    action : "start_app"
  }}

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
    update_view(appState);
    document.querySelector("#widget_view").onclick = (e) => {
      handle_widget_event(e)
    }
  });

  function goodFeedback(appState) {
    console.log("good");
    appState.current_model.questionType = "compliment";
    setQuestionView(appState);
    update_view(appState);
  }
  function badFeedback(appState) {
    console.log("bad");
    appState.current_model.questionType = "explanation";
    setQuestionView(appState);
    update_view(appState);
  }

  async function get_data_fetch_async(x) {

    const response = await fetch("https://my-json-server.typicode.com/nexodius-gen/NeXoDiUs-GeN.github.io/questions");
    const data = await response.json();
    appState.current_model = data[x.current_question];
    setQuestionView(appState);
    update_view(appState);

  }

  function handle_widget_event(e) {
    if (appState.current_view == "#chooseQuiz") {
      if(e.target.dataset.action == "start_1") {
        appState.current_view =  "#intro_view";
        appState.current_model = {
          action : "start_app"
        }
        update_view(appState);
      }
      else if (e.target.dataset.action == "start_2") {
        appState.current_view = "#intro_view2";
        appState.current_model = {
          action : "start_app2"
        }
      }
      update_view(appState);
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
      if (e.target.dataset.action == "start_app2") {
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
    if (appState.current_view == "#feedback_view1"){
      updateQuestion(appState);
      setQuestionView(appState);
      update_view(appState);
    }
    if (appState.current_view == "#feedback_view2") {
      if (e.target.dataset.action == "OK") {
        isCorrect = check_user_response(e.target.dataset.answer, appState.current_model);
        updateQuestion(appState);
        setQuestionView(appState);
        update_view(appState);
      }
    }
    if (appState.current_view == "#question_view_true_false") {

      if (e.target.dataset.action == "answer") {
        isCorrect = check_user_response(e.target.dataset.answer, appState.current_model);
        if (isCorrect == true) {
          correct += 1;
          total += 1;
          goodFeedback(appState);
          console.log("true false success");
          setTimeout(() => {
            updateQuestion(appState);
            setQuestionView(appState);
            update_view(appState);
          }, 1000);
        }
        else {
          total += 1;
          badFeedback(appState);
          console.log("true false success");
          setTimeout(() => {
            updateQuestion(appState);
            setQuestionView(appState);
            update_view(appState);
          }, 100000);
        }
      }
    }
    if (appState.current_view == "#question_view_text_input") {
      if (e.target.dataset.action == "submit") {
        if (total == 19 || total == 9) {
          user_response = document.querySelector(`#${appState.current_model.answerFieldId}`).value;
          isCorrect = check_user_response(user_response, appState.current_model);
          if (isCorrect == true) {
            correct += 1;
            total += 1;
            console.log("text success");
              updateQuestion(appState);
              setQuestionView(appState);
              update_view(appState);
          }
          else {
            total += 1;
            badFeedback(appState);
            console.log("text success");
            setTimeout(() => {
              updateQuestion(appState);
              setQuestionView(appState);
              update_view(appState);
            }, 100000);
          }
        }
        else {
          user_response = document.querySelector(`#${appState.current_model.answerFieldId}`).value;
          isCorrect = check_user_response(user_response, appState.current_model);
          if (isCorrect == true) {
            correct += 1;
            total += 1;
            goodFeedback(appState);
            console.log("text success");
            setTimeout(() => {
              updateQuestion(appState);
              setQuestionView(appState);
              update_view(appState);
            }, 1000);
          }
          else {
            total += 1;
            badFeedback(appState);
            console.log("text success");
            setTimeout(() => {
              updateQuestion(appState);
              setQuestionView(appState);
              update_view(appState);
            }, 100000);
          }
        }
      }
    }
    if (appState.current_view == "#question_view_multiple_choice") {
      if (e.target.dataset.action == "answer2") {
        console.log("correct");
        isCorrect = check_user_response(e.target.dataset.answer, appState.current_model);
        if (isCorrect == true) {
          correct += 1;
          total += 1;
          goodFeedback(appState);
          console.log("multiple choice success");
          setTimeout(() => {
            updateQuestion(appState);
            setQuestionView(appState);
            update_view(appState);
          }, 1000);
        }
        else {
          total += 1;
          badFeedback(appState);
          console.log("multiple choice bad success");
          setTimeout(() => {
            updateQuestion(appState);
            setQuestionView(appState);
            update_view(appState);
          }, 100000);
        }
      }
    }
    if (appState.current_view == "#question_view_narrative_text_response") {
      if (e.target.dataset.action == "answer3") {
        // Controller - implement logic.
        isCorrect = check_user_response(e.target.dataset.answer, appState.current_model);
        if (isCorrect == true) {
          correct += 1;
          total += 1;
          goodFeedback(appState);
          console.log("narrative success");
          setTimeout(() => {
            updateQuestion(appState);
            setQuestionView(appState);
            update_view(appState);
          }, 1000);
        }
        else {
          total += 1;
          badFeedback(appState);
          console.log("narrative success");
          setTimeout(() => {
            updateQuestion(appState);
            setQuestionView(appState);
            update_view(appState);
          }, 100000);
        }
      }
    }
    if (appState.current_view == "#question_view_image_selection") {
      if (e.target.dataset.action == "submit2") {

        isCorrect = check_user_response(e.target.dataset.answer, appState.current_model);
        if (isCorrect == true) {
          correct += 1;
          total += 1;
          goodFeedback(appState);
          console.log("image success");
          setTimeout(() => {
            updateQuestion(appState);
            setQuestionView(appState);
            update_view(appState);
          }, 1000);
        }
        else {
          total += 1;
          badFeedback(appState);
          console.log("image success");
          setTimeout(() => {
            updateQuestion(appState);
            setQuestionView(appState);
            update_view(appState);
          }, 100000);
        }
      }
    }
    if (appState.current_view == "#end_view") {
      console.log("end view reached");
      window.clearInterval(interval);
      console.log(correct/total);

      if ((correct/total) > .80) {
        console.log("good ending");
        var message = document.getElementById('message');
        message.innerHTML = congrats;
        let score_message = `You scored a ${correct} out of ${total} which is equal to ${(correct*100)/total}%.`
        var message2 = document.getElementById('message2');
        message2.innerHTML = score_message;
      }
      else {
        console.log("bad ending");
        var message = document.getElementById('message');
        message.innerHTML = sorry;
        let score_message = `You scored a ${correct} out of ${total} which is equal to ${(correct*100)/total}%.`
        var message2 = document.getElementById('message2');
        message2.innerHTML = score_message;
      }
      if (e.target.dataset.action == "start_again") {
        appState.current_view =  "#chooseQuiz";
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
      console.log("-2 end");
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
      console.log("tf");
    }
    else if (appState.current_model.questionType == "text_input") {
      appState.current_view = "#question_view_text_input";
      console.log("text");
    }
    else if (appState.current_model.questionType == "multiple_choice") {
      appState.current_view = "#question_view_multiple_choice";
      console.log("mc");
    }
    else if (appState.current_model.questionType == "narrative_text_response") {
      appState.current_view = "#question_view_narrative_text_response";
      console.log("narrative");
    }
    else if (appState.current_model.questionType == "image_selection") {
      appState.current_view = "#question_view_image_selection";
      console.log("image");
    }
    else if (appState.current_model.questionType == "compliment") {
      appState.current_view = "#feedback_view1";
      console.log("compliment");
    }
    else if (appState.current_model.questionType == "explanation") {
      appState.current_view = "#feedback_view2";
      console.log("explained");
    }
  }

  function update_view(appState) {
    console.log(appState)
    const html_element = render_widget(appState.current_model, appState.current_view)
    document.querySelector("#widget_view").innerHTML = html_element;
  }

  const render_widget = (model,view) => {

    template_source = document.querySelector(view).innerHTML

    var template = Handlebars.compile(template_source);

    var html_widget_element = template({...model,...appState})

    return html_widget_element
  }
