#!/usr/bin/node

let http = require("http");
let mongo_client = require("mongodb").MongoClient;

let url = "mongodb://localhost/";
console.log("Iniciando Script mongo_http");
mongo_client.connect(url, function(error,conn){
	console.log("Dentro de Mongo >:\)");
	if (error){
		console.log("Esto no furula TwT");
		return;
	}
	let db=conn.db("tffhd");
	let characters=db.collection("characters").find();
	console.log(characters);
});

/*http.createServer(function(req,res) {
	res.writeHead(200);

	let saludo="<h1>esta wea rula de lujo >:\)</h1>";
	res.end(saludo);

}).listen(1095);*/
