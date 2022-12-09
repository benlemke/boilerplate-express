const { application } = require('express');
let express = require('express');
let app = express();
const bodyParser = require('body-parser');
dotenv = require('dotenv').config();

console.log("Hello World");


app.use('/public',express.static(__dirname + '/public'));
app.use(function(req, res, next) {
    console.log(req.method + " " + req.path + " - " + req.ip);
    next();
});

app.use(bodyParser.urlencoded({extended: false}));

app.get('/json', function(req, res){
    let objMsg = {"message": "Hello json"};
    if(process.env.MESSAGE_STYLE === "uppercase") objMsg["message"] = objMsg["message"].toUpperCase();
    res.json(objMsg);
});

app.get('/', function(req, res) {
    absolutePath = __dirname + '/views/index.html';
    res.sendFile(absolutePath);
});

app.get('/now', function(req, res, next) {
    req.time = new Date().toString();
    next();
}, function(req,res) {
    req.send({time: req.time});
});

app.get('/:word/echo', function(req, res)  {
    res.json({echo: req.params.word});
    next();
});


app.route('/name').get(function(req,res) {
    res.json({name: req.query.first + ' ' + req.query.last});
})
.post(function(req,res) {
    res.json({name: req.body.first + ' ' + req.body.last});
})











 module.exports = app;
