var express = require('express');
var mysql = require('mysql2');
var app = express();

// Configuração do EJS para renderizar as views
app.set('view engine', 'ejs');
app.set('views', './views');

// Configuração de Middleware
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

// Criando a conexão com o banco de dados
var connection = mysql.createConnection({
    host: "localhost",
    user: "root",
    password: "Root@123",
    database: "crudnode"
});

connection.connect(function(err) {
    if (err) {
        console.error('Erro ao conectar ao banco de dados: ' + err.stack);
        return;
    }
    console.log('Conectado ao banco de dados com ID ' + connection.threadId);
});


app.get('/cursos', function(req, res) {
    connection.query("SELECT * FROM curso", function(error, result) {
        if (error) {
            console.log(error);
            res.status(500).send("Erro ao consultar o banco de dados.");
        } else {
            res.render('cursos', { dados: result }); // Renderiza a view 'cursos.ejs' com os dados
        }
    });
});


app.post('/cursos/salvar', function(req, res) {
    const descricao = req.body.DESCRICAO;
    const carga_horaria = req.body.CARGA_HORARIA;

    connection.query('INSERT INTO curso (DESCRICAO, CARGA_HORARIA) VALUES (?, ?)', [descricao, carga_horaria], function(error, result) {
        if (error) {
            console.log(error);
            res.status(500).send("Erro ao salvar o curso.");
        } else {
            res.redirect('/cursos');
        }
    });
});


app.get('/editar/:id', function(req, res) {
    const id = req.params.id;
    connection.query('SELECT * FROM curso WHERE ID = ?', [id], function(error, result) {
        if (error) {
            console.log(error);
            res.status(500).send("Erro ao buscar curso.");
        } else {
            res.render('editar', { id: result[0].ID, descricao: result[0].DESCRICAO, carga_horaria: result[0].CARGA_HORARIA });
        }
    });
});


app.post('/atualizar/:id', function(req, res) {
    const id = req.params.id;
    const descricao = req.body.descricao;
    const carga_horaria = req.body.carga_horaria;

    connection.query('UPDATE curso SET DESCRICAO = ?, CARGA_HORARIA = ? WHERE ID = ?', [descricao, carga_horaria, id], function(error, result) {
        if (error) {
            console.log(error);
            res.status(500).send("Erro ao atualizar o curso.");
        } else {
            res.redirect('/cursos');
        }
    });
});


app.get('/cursos/Deletar/:id', function(req, res) {
    const id = req.params.id;
    connection.query('DELETE FROM curso WHERE ID = ?', [id], function(error, result) {
        if (error) {
            console.log(error);
            res.status(500).send("Erro ao excluir curso.");
        } else {
            res.redirect('/cursos');
        }
    });
});


app.listen(3000, function() {
    console.log("Servidor rodando em http://127.0.0.1:3000");
});
