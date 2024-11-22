var express = require('express');
var app = express();


app.get('/cursos', function(req,res){

    var mysql = require('mysql2');
    var connection = mysql.createConnection({
        host: "localhost",
        user: "root",
        password: "Root@123",
        database: "crudnode"
    });

    connection.query("SELECT descricao FROM curso", function (error, result){
        res.send(result);
    });
});

app.listen(3000, function(){
    console.log("Servidor rodando com Express.")
});
