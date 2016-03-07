var express = require('express');
var url = require('url');
var cities = require('./cities.js');
//var cors = require('cors');

var app = express();

app.use(function(req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
  next();
});

/*var cities = [
	{city: 'Provo'},
	{city: 'Panguitch'},
	{city: 'Paris'}
];*/

var jsonresult = [];

app.get('/getcities', function(req, res) {
	var query = url.parse(req.url, true).query.q;
	if (query == void 0) {
		res.send([]);
		return;
	}
	var regEx = new RegExp("^"+query+".*$");
	res.send(cities.filter(function(value) {
		jsonresult = regEx.test(value);
		return jsonresult;
	}));

	//console.log(JSON.stringify(jsonresult));
	//res.writeHead(200);
	//res.end(JSON.stringify(jsonresult));
});

app.get('/multiply', function(req, res) {
	var a = url.parse(req.url, true).query.a;
	var b = url.parse(req.url, true).query.b;
	if (a === void 0 || b === void 0) {
		res.send([]);
		return;
	}
	var result = parseInt(a)*parseInt(b);
	var json = '{"answer": '+result+'}';
	/*var jsonresult = [
		{answer: result}
	];*/
	res.send(json);
});

// use it before all route definitions
//app.use(cors({origin: 'http://localhost:8888'}));

app.use(express.static('public'));

app.listen(3005);

