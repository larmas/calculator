const express = require('express');
const app = express();
const routes = require('./javascript/routes');
const bodyParser = require('body-parser');
const path = require('path');

app.use('/', routes);

app.set('port', 8080);

app.use(express.static(path.join(__dirname, 'public')));

//app.engine('html', cons.swig)
app.set('views', path.join(__dirname, 'views'));
app.engine('html', require('ejs').renderFile);
app.set('view engine', 'html');

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: false}));

app.listen(app.get('port'), () => {
 console.log('Express started on http://localhost:' + app.get('port') + ' press Ctrl-C to terminate');
});

module.exports = app;
