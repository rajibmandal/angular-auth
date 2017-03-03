var express = require('express');
var app = express();
var jwt = require("express-jwt");
var cors = require("cors");

app.use(cors());

var authcheck = jwt({
    secret:new Buffer('abzfmxk0laGrtOdyTtPulEhzez869OLIa3Ne6gT9uzBymHu0Kbxg1mV-3UgX16zD'),
    audience:'Kn3BNciMcEWtWSFD1Gchy4v16sLZVcbk'
});

app.get('/api/public',function(req, res){
    res.json({message:"Hello This is a public end point. You don't need to be authenticated for this!!"});
});

app.get('/api/private',authcheck, function(req, res){
    res.json({message:"Hello This is a private end point. You need to be authenticated for this!!"});
});
var port = 5001;
app.listen( port, function() {
console.log( 'Express server listening on port %d in %s mode', port, app.settings.env );
});
