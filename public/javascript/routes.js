var express = require('express');
var router = express.Router();
var SessionCalculator = require('../../models/sessionCalculator');
var url = require('url');

router.get('/', async function(req,res){
  // Find all sessions stored in the data base.
  const sessionsSaved = await SessionCalculator.find({});
  // All saved sessions are sent to 'index' view.
  res.render('index', { sessionsSaved });
});

router.post('/', async function(req, res){
  // Find all sessions stored in the data base.
  const sessionsSaved = await SessionCalculator.find({});
  // The session to be edited is sent corresponding input in the 'index' view.
  res.render('index', {editExpression: req.body.editExpression, sessionsSaved });
});

router.post('/resultSave', async function(req,res){
  let resultMsg = "";
  let classErr = '';
  // Get the index of the session to save.
  let index = req.body.indexSave;
  // Get array of available sessions to save.
  let sessions = JSON.parse(req.body.sessions).expressions;
  if ( 0 <= index && index < sessions.length){
    // Check that the session does not exist.
    if(! await SessionCalculator.exists({ expression: sessions[index].expression }) ){
      let session = {
        numberSession : sessions[index].number,
        expression : sessions[index].expression
      };
      let sessionCalculator = new SessionCalculator(session);
      // Save the session in the data base.
      await sessionCalculator.save(function(err){
      	if(err){
          resultMsg = String(err);
          classErr = 'error';
        }
      })
      resultMsg = "Successfully saved.";
    } else { // There is a session with the same expression in the database.
      classErr = 'error';
      resultMsg = "The expression already exists in the database.";
    }
  } else { // There is no session with that index.
    classErr = 'error';
    resultMsg = "Index out of the bound.";
  }
  res.render('resultSave', {resultMsg: resultMsg, classErr: classErr, sessions});
});

router.post('/save', function(req,res){
  // Get array of available sessions to save.
  let sessions = JSON.parse(req.body.saveExpression).expressions;
  let hidden = '';
  let resultMsg = '';
  // If there are no sessions to save, hide the 'Save' button.
  if ( sessions.length == 0 ){
    hidden = 'hidden';
    resultMsg = "There are no sessions to save."
  }
  res.render('save', { hiddenClass: hidden, resultMsg: resultMsg, sessions });
});

router.post('/delete', function(req,res){
  // Session to delete.
  deleteSession = {
    numberSession: req.body.numberSession,
    expression: req.body.editExpression
  }
  // Delte session.
  SessionCalculator.deleteOne(deleteSession, function(err){
    if (err)
      console.log(err);
  });
  res.redirect('/');
});

module.exports = router;
