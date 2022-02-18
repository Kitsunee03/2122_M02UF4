#!/usr/bin/node

//Vars
let http = require("http");
let mongo_client = require("mongodb").MongoClient;

let url = "mongodb://localhost/";
let db;
console.log("Iniciando Script mongo_http");

//Mongo Client
mongo_client.connect(url, function(error,conn){
	console.log("Dentro de Mongo >:\)");
	if (error){
		console.log("Esto no furula TwT");
		return;
	}
	db = conn.db("tffhd");
});

//HTTP Server
http.createServer(function(req, res) {
	res.writeHead(200);
	let col = "";

	if (req.url == "/") {
		res.end();
		return;
	}
	
	if (req.url == "/characters") {
		col =  db.collection("characters").find();
	}
	else if (req.url == "/items") {
		col = db.collection("items").find();
	}
	else if (req.url == "/weapons") {
		col = db.collection("weapons").find();
	}
	else { return; }
	
	col.toArray(function(err, data) {
		let string = JSON.stringify(data);
		
		res.end(string);
	});
}).listen(1095);
