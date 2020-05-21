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
  let resultMsg = "";
  let classErr = '';
  let index = req.body.indexSave;
  let sessions = JSON.parse(req.body.sessions).expressions;
  if ( 0 <= index && index < sessions.length){
    if(! await SessionCalculator.exists({ expression: sessions[index].expression }) ){
      let session = {
        numberSession : sessions[index].number,
        expression : sessions[index].expression
      };
      let sessionCalculator = new SessionCalculator(session);
      await sessionCalculator.save(function(err){
      	if(err){
          resultMsg = String(err);
          classErr = 'error';
        }
      })
      resultMsg = "Successfully saved.";
    } else {
      classErr = 'error';
      resultMsg = "The expression already exists in the database.";
    }
  } else {
    classErr = 'error';
    resultMsg = "Index out of the bound.";
  }
  res.render('resultSave', {resultMsg: resultMsg, classErr: classErr, sessions});
});

router.post('/save', function(req,res){
  let sessions = JSON.parse(req.body.saveExpression).expressions;
  let hidden = '';
  let resultMsg = '';
  if ( sessions.length == 0 ){
    hidden = 'hidden';
    resultMsg = "There are no sessions to save."
  }
  res.render('save', { hiddenClass: hidden, resultMsg: resultMsg, sessions });
});

router.post('/delete', function(req,res){
  deleteSession = {
    numberSession: req.body.numberSession,
    expression: req.body.editExpression
  }
  SessionCalculator.deleteOne(deleteSession, function(err){
    if (err)
      console.log(err);
  });
  res.redirect('/');
});

module.exports = router;
