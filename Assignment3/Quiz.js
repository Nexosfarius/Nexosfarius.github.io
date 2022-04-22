const questions = [
  {
    questionType : "multiple_choice",
    questionText : "What is the value of the expression 1+1?",
    correctAnswer : "2",
    options : ["1", "23", "2"],
  },
  {
    questionType : "narrative_text_response",
    questionText : "What common fruit is usually depicted as red?",
    correctAnswer : "apple is correct",
    options : ["banana is correct", "pear is correct", "apple is correct"],
  },
  {
    questionType : "true_false",
    questionText : "The earth is round",
    correctAnswer : "true",
    options : ["true", "false"],
  },
  {
    questionType : "image_selection",
    questionText : "What is the value of the expression 1+1",
    correctAnswer : "apple",
    options : ["true", "false", "apple"],
  },
  {
    questionType : "text_input",
    questionText : "What is the value of the expression 1+1",
    correctAnswer : "2",
    answerFieldId : "answer_to_question"
  }
]

const appState = {
    current_view : "#intro_view",
    current_question : -1,
    current_model : {}
}

document.addEventListener('DOMContentLoaded', () => {

  appState.current_view =  "#intro_view";
  appState.current_model = {
    action : "start_app"
  }
  update_view(appState);

  document.querySelector("#widget_view").onclick = (e) => {
      handle_widget_event(e)
  }
});

function handle_widget_event(e) {

  if (appState.current_view == "#intro_view"){
    if (e.target.dataset.action == "start_app") {

        // Update State (current model + state variables)
        appState.current_question = 0
        appState.current_model = questions[appState.current_question];
        // process the appState, based on question type update appState.current_view
        setQuestionView(appState);

        update_view(appState);
    }
  }
  if (appState.current_view == "#question_view_true_false") {

    if (e.target.dataset.action == "answer") {
       // Controller - implement logic.
       isCorrect = check_user_response(e.target.dataset.answer, appState.current_model);
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
           isCorrect = check_user_response(e.target.dataset.answer, appState.current_model);
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
          console.log("narrative text response success");
          updateQuestion(appState);
          setQuestionView(appState);
          update_view(appState);
        }
      }
      if (appState.current_view == "#question_view_image_selection") {
          if (e.target.dataset.action == "submit2") {

              isCorrect = check_user_response(e.target.dataset.answer, appState.current_model);
              console.log("image selection success");
              updateQuestion(appState);
              setQuestionView(appState);
              update_view(appState);
          }
       }

    // Handle answer event for  text questions.
    if (appState.current_view == "#end_view") {
        if (e.target.dataset.action == "start_again") {
          appState.current_view =  "#intro_view";
          appState.current_model = {
            action : "start_app"
          }
          update_view(appState);

        }
      }

 } // end of hadnle_widget_event


function check_user_response(user_answer, model) {
  if (user_answer == model.correctAnswer) {
    return true;
  }
  return false;
}

function updateQuestion(appState) {
    if (appState.current_question < questions.length-1) {
      appState.current_question =   appState.current_question + 1;
      appState.current_model = questions[appState.current_question];
    }
    else {
      appState.current_question = -2;
      appState.current_model = {};
    }
}
function updateQuestion2(appState) {
    if (appState.current_question < questions.length-1) {
      appState.current_question =   appState.current_question + 2;
      appState.current_model = questions[appState.current_question];
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
  if (appState.current_model.questionType == "true_false")
    appState.current_view = "#question_view_true_false";
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
