window.onload = function(){
  var inDisplay = document.getElementById("inDisplay");
  var outDisplay = document.getElementById("outDisplay");
  var paramURL = getParameterByName('errMsg');
  if (paramURL !== ""){
    outDisplay.value = paramURL;
  }
  inDisplay.onchange = function() {
    window.history.pushState("object or string", "Basic calculator", "/");
  };
}

var sessionsArray = [];

function getParameterByName(name) {
    name = name.replace(/[\[]/, "\\[").replace(/[\]]/, "\\]");
    var regex = new RegExp("[\\?&]" + name + "=([^&#]*)"),
    results = regex.exec(location.search);
    return results === null ? "" : decodeURIComponent(results[1].replace(/\+/g, " "));
}

function solveExpression(){
  inDisplay.classList.remove("error");
  try{
      let result = eval(inDisplay.value);
      outDisplay.value = result;
      sessionsArray.push(inDisplay.value);
  }catch (err){
    if (err instanceof SyntaxError){
      outDisplay.classList.add("error");
      outDisplay.value = "SyntaxError";
    }
  }

}

function saveSession(){
  let indexSession = prompt('Indique el numero de la sesion');
  let sessionSave = {
    numberSession : indexSession,
    expression : sessionsArray[indexSession],
  }
  document.getElementById("saveExpression").value = JSON.stringify(sessionSave);
}
