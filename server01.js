
/**
 * Module dependencies
 */

var express = require('express'),
  bodyParser = require('body-parser'),
  methodOverride = require('method-override'),
  //errorHandler = require('error-handler'),
  morgan = require('morgan'),
  routes = require('./routes'),
  api = require('./routes/api'),
  http = require('http'),
  path = require('path');

var app = module.exports = express();

/**
 * Configuration
 */

// all environments
app.set('port', process.env.PORT || 3000);
app.set('views', __dirname + '/views');

//app.set('view engine', 'jade');
app.engine('html', require('ejs').renderFile);
app.set('view engine', 'html');

app.use(morgan('dev'));
app.use(bodyParser());
app.use(methodOverride());
app.use(express.static(path.join(__dirname, 'public')));

var env = process.env.NODE_ENV || 'development';

/*
 database
 */
var mongoose = require('mongoose');
mongoose.connect('mongodb://localhost/sp500', function (error) {
    if (error) {
        console.log(error);
    }
});

var pwdSchema = new mongoose.Schema({
    symbol: String,
    name: String,
    category: String,
    etf: String,
    issuer: String,
    action: String,
    modified: String
});

app.get('/', routes.index);
/**
 * View Routes
 */
var routerView = express.Router();
routerView.get('/partials/:name', routes.partials);
app.use('/', routerView);

/**
 * API Routes
 */
var routerApi = express.Router();              // get an instance of the express Router
routerApi.get('/sp500', function(req, res) {
// Mongoose Model definition
    var SP500 = mongoose.model('SP500', pwdSchema, 'sp500');
    SP500.find({ 'etf': 'true' }, function (err, docs) {
        if (err) return console.error(err);
        res.json(docs);
    });
});

// REGISTER OUR ROUTES -------------------------------
//api
app.use('/api', routerApi);
// redirect all others to the index (HTML5 history)
app.get('*', routes.index);


/**
 * Start Server
 */
http.createServer(app).listen(app.get('port'), function () {
    console.log('Express server listening on port ' + app.get('port'));
});