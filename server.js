const express = require('express');
const app = express();
const routes = require('./public/javascript/routes');
const bodyParser = require('body-parser');
const path = require('path');
const mongoose = require('mongoose');
const { config, engine } = require('express-edge');
const favicon = require('serve-favicon');

app.set('port', 8080);

app.use(express.static(path.join(__dirname, 'public')));

app.use(engine);
app.set('views', `${__dirname}/views`);

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: false}));

app.use(favicon(path.join(__dirname, './public/images', 'favicon.ico')));

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
