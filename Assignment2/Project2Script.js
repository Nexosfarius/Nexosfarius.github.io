document.addEventListener("DOMContentLoaded", function() {
  var arr = [];
  document.querySelector("#inputdata").onsubmit = function() {

    const li  = document.createElement('li');

    let task_text = document.querySelector('#myInput').value;
    let new_task_html = `<span> ${task_text}</span>  <button class="remove btn-danger">X</button> <button class="line btn-success">X</button>`;
    li.innerHTML = new_task_html;
    var newarr = new_task_html;
    arr.push(newarr);
    let options = document.getElementById("priority").value;

    if (options == "high") {
      li.style.backgroundColor ="#ff6d6d";
    }
    else if (options == "medium") {
        li.style.backgroundColor ="#ffff64";
    }
    else if (options == "low") {
        li.style.backgroundColor ="#81fa75";
    }

    let radio = document.forms.inputdata.radioOption.value;
    if(radio == 'complete') {
          li.firstElementChild.style.textDecoration = "line-through";
    }

    document.querySelector("#list").append(li);
    document.querySelector("#myInput").value = '';

    return false;
  }
  document.addEventListener('click', function(event){
    element = event.target;
    if (element.className === 'remove btn-danger') {
      element.parentElement.remove();
      var c = arr.indexOf(element.parentElement);
      arr.splice(c, 1);
    }
    if (element.className === 'line btn-success') {
      element.previousElementSibling.previousElementSibling.style.textDecoration = "line-through";
    }
  })
});
