const express = require('express');
const app = express();
const routes = require('./public/javascript/routes');
const bodyParser = require('body-parser');
const path = require('path');
const mongoose = require('mongoose');


app.set('port', 8080);

app.use(express.static(path.join(__dirname, 'public')));

app.engine('html', require('ejs').renderFile);
app.set('view engine', 'html');
app.set('views', path.join(__dirname, 'views'));

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: false}));

app.use(function (req, res, next) {
    res.renderWithData = function (view, model, data) {
        model.data = JSON.stringify(data);
        res.render(view, model);
    };
    next();
});

app.use('/', routes);

mongoose.Promise = global.Promise;

mongoose.connect('mongodb://localhost/SimpleCalculatorDB',
  { useNewUrlParser: true, useUnifiedTopology: true})
.then(() => {
  console.log("Connection to the database successfull");
  app.listen(app.get('port'), () => {
   console.log('Express started on http://localhost:' + app.get('port') + ' press Ctrl-C to terminate');
  });
})
.catch(err => console.log(err));

module.exports = app;
