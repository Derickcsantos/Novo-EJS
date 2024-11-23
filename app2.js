var express = require('express');
var app = express();
app.set('view engine', 'ejs');
var bodyParser = require('body-parser');
app.use(bodyParser.urlencoded({ extended: true }));

// Use mysql2 instead of mysql
var mysql = require('mysql2');

app.get('/cursos', function (req, res) {
    var connection = mysql.createConnection({
        host: "localhost",
        user: "root",  // Make sure to use your MySQL username
        password: "Root@123",  // Your MySQL password
        database: "crudnode"  // Your MySQL database name
    });

    connection.query("SELECT * FROM curso", function (error, result) {
        if (error) {
            console.log(error);
            return res.status(500).send("Database query error");
        }
        res.render('./cursos', { dados: result });
    });
});

app.post('/cursos/salvar', function (req, res) {
    var dados = req.body;

    var connection = mysql.createConnection({
        host: "localhost",
        user: "root",
        password: "Root@123",
        database: "crudnode"
    });

    connection.query('INSERT INTO curso SET ?', dados, function (error, result) {
        if (error) {
            console.log(error);
            return res.status(500).send("Error saving data");
        }
        res.redirect('/cursos');
    });
});

app.get('/editar/:id', function (req, res) {
    var connection = mysql.createConnection({
        host: "localhost",
        user: "root",
        password: "Root@123",
        database: "crudnode"
    });

    connection.query('SELECT * FROM curso WHERE id = ' + req.params.id, function (err, linha) {
        if (err) {
            console.log(err);
            return res.status(500).send("Error fetching data");
        }
        res.render('editar', {
            id: linha[0].ID,
            descricao: linha[0].DESCRICAO,
            carga_horaria: linha[0].CARGA_HORARIA
        });
    });
});

app.post('/atualizar/:id', function (req, res) {
    var dados = req.body;

    var connection = mysql.createConnection({
        host: "localhost",
        user: "root",
        password: "Root@123",
        database: "crudnode"
    });

    connection.query('UPDATE curso SET ? WHERE id = ' + req.params.id, dados, function (error, result) {
        if (error) {
            console.log(error);
            return res.status(500).send("Error updating data");
        }
        res.redirect('/cursos');
    });
});

app.get('/cursos/Deletar/:id', function (req, res) {
    var id = req.params.id;

    var connection = mysql.createConnection({
        host: "localhost",
        user: "root",
        password: "Root@123",
        database: "crudnode"
    });

    connection.query('DELETE FROM curso WHERE ID =' + id, function (error, result) {
        if (error) {
            console.log(error);
            return res.status(500).send("Error deleting data");
        }
        res.redirect('/cursos');
    });
});

app.listen(3000, function () {
    console.log("Servidor rodando com Express.");
});
