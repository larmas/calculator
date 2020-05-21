window.onload = function(){
  var inDisplay = document.getElementById("inDisplay");
  var outDisplay = document.getElementById("outDisplay");
}

/* Get a mathematical expression and solve it. Save the expression in a
   locally stored array. */
function solveExpression(){
  outDisplay.classList.remove("error");
  if (inDisplay.value != ''){
    let sessionsArray = JSON.parse(window.sessionStorage.getItem('sessionsArray'));
    if (sessionsArray == null){
      sessionsArray = [];
    }
    try{
        let result = eval(inDisplay.value);
        outDisplay.value = result;
        sessionsArray.push({ number: sessionsArray.length, expression: inDisplay.value });
    }catch (err){
      if (err instanceof SyntaxError){
        outDisplay.classList.add("error");
        outDisplay.value = "SyntaxError";
      }
    }
    window.sessionStorage.setItem('sessionsArray', JSON.stringify(sessionsArray));
  } else {
    outDisplay.classList.add("error");
    outDisplay.value = "The expression is required";
  }
}

/* Gets an array with the expressions that the user has calculated  and 
  stores it in an html input. */
function getSessionsArray(idInput){
  let sessionsArray = JSON.parse(window.sessionStorage.getItem('sessionsArray'));
  if (sessionsArray == null){
    sessionsArray = [];
  }
  let sessions = { expressions : sessionsArray }
  document.getElementById(idInput).value = JSON.stringify(sessions);
}
