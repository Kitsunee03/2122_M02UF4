#!/usr/bin/node

//Vars
let http = require("http");
let mongo_client = require("mongodb").MongoClient;
let ObjectId = require("mongodb").ObjectID;

let url = "mongodb://localhost/";
let db;
let fs = require("fs");
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

function send_data_list(db, req, res) {
	let col = "";

	if (req.url == "/characters") {col = "characters";}
	else if (req.url == "/items") {col = "items";}
	else {res.end(); return;}
	
	let col_data = db.collection(col).find({},{projection: {name:1} });
	col_data.toArray(function(err, data){
		let string = JSON.stringify(data);
		res.end(string);
	});
}

//HTTP Server
http.createServer(function(req, res) {
	res.writeHead(200);

	let url = req.url.split("/");
	console.log(url);

	if (req.url == "/") {
		fs.readFile("index.html",function(err, data){
			res.writeHead(200, {"Content-Type":"text/html"});
			res.end(data);
		});
		return;
	}
	
	if(url.length == 2) {
		send_data_list(db, req, res);
	}
	else{
		if (url[2].length != 24) {res.end(); return;}
		if (url[1] == "characters"){
			let obj_id = new ObjectId(url[2]);
			let col_data = db.collection("characters").find({"_id":obj_id});
			
			col_data.toArray(function(err, data){
				let string = JSON.stringify(data);

				res.end(string);
			});
		}
		else if (url[1] == "items") {

		}
	}

}).listen(1095);
