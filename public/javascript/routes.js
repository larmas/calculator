var express = require('express');
var router = express.Router();
var SessionCalculator = require('../../models/sessionCalculator');
var url = require('url');

router.get('/', async function(req,res){
  const sessionsSaved = await SessionCalculator.find({});
  res.render('index', { sessionsSaved });
});

router.post('/', async function(req, res){
  const sessionsSaved = await SessionCalculator.find({});
  res.render('index', {editExpression: req.body.editExpression, sessionsSaved });
});

router.post('/resultSave', async function(req,res){
  console.log(req.body);
  let resultMsg = "";
  let index = req.body.indexSave;
  let sessions = JSON.parse(req.body.sessions).expressions;
  console.log(sessions);
  if ( 0 <= index && index < sessions.length){
    let sessionCalculator = new SessionCalculator({
      numberSession : sessions[index].number,
      expression : sessions[index].expression
    });
    await sessionCalculator.save(function(err){
    	if(err)
        resultMsg = String(err);
    })
    resultMsg = "Successfully saved.";
  } else {
    resultMsg = "Index out of the bound.";
  }
  res.render('resultSave', {resultMsg: resultMsg, sessions});
});

router.post('/save', function(req,res){
  let sessions = JSON.parse(req.body.saveExpression).expressions;
  if ( sessions == [] ){
    // ocultar boton save
    resultMsg = "There are no sessions to save."
  }
  res.render('save', {sessions});
});

router.post('/delete', function(req,res){
  deleteSession = {
    numberSession: req.body.numberSession,
    expression: req.body.editExpression
  }
  SessionCalculator.deleteOne(deleteSession, function(err){
    if (err)
      console.log(err);
    console.log("Successful deletion");
  });
  res.redirect('/');
});

module.exports = router;
