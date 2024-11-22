var express = require('express');
var app = express();
app.set('view engine', 'ejs');
var bodyParser = require('body-parser');
app.use(bodyParser.urlencoded({extended: true}));

app.get('/cursos', function(req,res){

    var mysql = require('mysql');
    var connection = mysql.createConnection({
        host: "localhost",
        user: "root",
        password: "Root@123",
        database: "crudnode"
    });

    connection.query("SELECT * FROM curso", function (error, result){
        res.render('./cursos',{dados : result});
    });
});

app.post('/cursos/salvar', function(req, res){
    var dados = req.body;

    connection.query('INSERT INTO curso SET ?', dados, function(error, result){
        res.redirect('/cursoInsert');
    });
});

app.get('/editar/:id', function(req, res, next){

    connection.query('SELECT * FROM curso WHERE id = '+ req.params.id, function(err, linha){

        res.render('editar', {
            id: linha[0].ID,
            descricao: linha[0].DESCRICAO,
            carga_horaria: linha[0].CARGA_HORARIA
        })
    })
});

app.post('/atualizar/:id', function(req,res){
    
    var dados = req.body;

    connection.query('UPDATE curso SET ? WHERE id = '+ req.params.id,dados, function(error, result){
        res.redirect('/cursosDelUpd');
    });
});

app.get('/cursos/Deletar/:id', function(req, res){

    var id = req.params.id;

    connection.query('DELETE FROM curso WHERE ID =' + id, function(error, result){
        res.redirect('cursosDelUpd');
    });
});

app.listen(3000, function(){
    console.log("Servidor rodando com Express.")
});
