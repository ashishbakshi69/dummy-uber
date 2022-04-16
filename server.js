var express = require('express'),
app = express(),
port = 3000,
bodyParser = require('body-parser');

app.use(bodyParser.json({limit: '100mb'}));
app.use(bodyParser.urlencoded({limit: '100mb'}));

var routes = require('./service/api/routes/serviceRoutes');
routes(app);

app.use(function (req, res){
    res.status(404).send({url:req.originalUrl + ' not found'})
});

app.listen(port);
console.log("service running on port " + port);

module.exports = app;