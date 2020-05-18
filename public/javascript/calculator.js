window.onload = function(){
  var inDisplay = document.getElementById("inDisplay");
  var outDisplay = document.getElementById("outDisplay");
}

function validateIndex(){
  let index = document.getElementById('indexSave');
  let length = JSON.parse(window.sessionStorage.getItem('sessionsArray')).length;
  return 0 <= index && index <= length;
}

function solveExpression(){
  inDisplay.classList.remove("error");
  let sessionsArray = JSON.parse(window.sessionStorage.getItem('sessionsArray'));
  if (sessionsArray == null){
    sessionsArray = [];
  }
  console.log(sessionsArray);
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
}

function getSessionsArray(idInput){
  let sessionsArray = JSON.parse(window.sessionStorage.getItem('sessionsArray'));
  if (sessionsArray == null){
    sessionsArray = [];
  }
  let sessions = { expressions : sessionsArray }
  document.getElementById(idInput).value = JSON.stringify(sessions);
  console.log(JSON.stringify(sessions));
}
