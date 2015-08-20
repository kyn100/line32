var express = require('express');
var router = express.Router();
var app = express();

//app.use('/api', apiRoutes);
app.use(express.static(__dirname + '/public'));
// Here's the new code:
app.use('/*', function (req, res) {
    res.sendFile(__dirname + '/public/index.html');
});


//app.get('/', router);
//app.get('*', router);
//app.use(express.static(__dirname + '/public'));


var mongoose = require('mongoose');
mongoose.connect('mongodb://localhost/sp500', function (error) {
    if (error) {
        console.log(error);
    }
});

var Schema = mongoose.Schema;
var pwdSchema = new Schema( {
    name: String,
    value: String
});

// Mongoose Model definition
var SP500 = mongoose.model('SP500', pwdSchema, 'sp500');
//app.get('/', function (req, res) {
//    res.send('Hello World');
//});
app.get('/sp500', function (req, res) {
    SP500.find({ 'etf': 'true' }, function (err, docs) {
        if (err) return console.error(err);
        res.json(docs);
    });

});

app.listen(3000);