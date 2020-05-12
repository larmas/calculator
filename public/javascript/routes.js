var express = require('express');
var router = express.Router();
var SessionCalculator = require('../../models/sessionCalculator');
var url = require('url');

router.get('/', function(req,res){
  res.render('index');
})

router.post('/save', function(req,res){
  var errMsg = "";
  console.log(req.body);
  if ( req.body.saveExpression == -1 )
    res.redirect('/?errMsg=Operation aborted.');
  else if (req.body.saveExpression !== ''){
    let saveSession = JSON.parse(req.body.saveExpression);
    SessionCalculator.findOne({numberSession : saveSession.numberSession}, function(err, prevSession){
      if (prevSession == null){
        let sessionCalculator = new SessionCalculator({
          numberSession : saveSession.numberSession,
          expression : saveSession.expression
        });
        sessionCalculator.save(function(err){
        	if(err){
        		console.log(String(err));
            errMsg = String(err);
        	} else {
            console.log("Successfully saved.");
            errMsg = "Successfully saved.";
          }
          res.redirect('/?errMsg=' + errMsg);
        });
      }else{
        console.log("The session already exists.");
        res.redirect('/?errMsg=The session already exists.');
      }
    });
  } else {
    console.log("Index out of the bound.");
    res.redirect('/?errMsg=Index out of bound.');
  }
});

module.exports = router;
