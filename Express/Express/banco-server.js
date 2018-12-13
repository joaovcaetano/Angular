var express = require('express');
var app = express();

var cors = require('cors');
app.use(cors());

var body_parser = require('body-parser');

app.use(body_parser.urlencoded({
    extended: true
}));

app.use(body_parser.json());

app.use(express.static('public'));

var mongo_cliente = require('mongodb').MongoClient;
var dbo;

app.get('/alunos', function(req, res) {
    dbo.collection('alunos').find().toArray(function(err, alunos) {
        res.setHeader('Content-Type','application/json');
        res.status(200);
        res.send(JSON.stringify(alunos));
    });
});

app.post('/alunos', function(req, res) {
    var aluno = req.body;

    dbo.collection('alunos').insertOne(aluno, function(err, result) {
        if (err) throw console.log(err);

        res.status(200);
        res.send('Aluno adicionado com sucesso!');
    });
});

app.put('/alunos', function(req, res) {
    var aluno = req.body;

    delete aluno._id;
    var id = {nome : aluno.nome};

    dbo.collection('alunos').updateOne(id, {$set : aluno}, function(err, result) {
        if (err) return console.log(err);

        res.status(200);
        res.send('Aluno ' + aluno.nome + ' alterado com sucesso!');
    });
});

app.delete('/alunos', function(req, res) {

    dbo.collection('alunos').remove({},function(err, result) {
       res.status(204);
       res.send('Alunos removidos com sucesso!');
    });
});

app.delete('/alunos/nome', function(req, res) {

    var nome_aluno = req.query.eq;

    var id = {nome : nome_aluno};

    dbo.collection('alunos').deleteOne(id,function(err, result) {
        res.status(204);
        res.send('Alunos removidos com sucesso!');
    });
});

//Listar prof por CPF
app.get('/professores', function(req, res) {
    dbo.collection('professores').find().toArray(function(err, professores) {
        res.setHeader('Content-Type','application/json');
        res.status(200);
        res.send(JSON.stringify(professores));
    });
});

//Adicionar
app.post('/professores', function(req, res) {
    var professor = req.body;

    dbo.collection('professores').insertOne(professor, function(err, result) {
        if (err) throw console.log(err);

        res.status(200);
        res.send('Professor adicionado com sucesso!');
    });
});

//Atualizar prof por CPF
app.put('/professores', function(req, res) {

    var cpf_prof = req.query.eq;
    var professor = req.body;
    var where = {cpf : cpf_prof};

    dbo.collection('professores').updateOne(where, {$set : professor}, function(err, result) {
        if (err) return console.log(err);

        res.status(200);
        res.send('Professor ' + professor.nome + ' alterado com sucesso!');
    });
});

//Remover prof por CPF
app.delete('/professores', function(req, res) {

    var cpf_prof = req.query.eq;
    var where = {cpf : cpf_prof};

    dbo.collection('professores').deleteOne(where,function(err, result) {
        res.status(200);
        res.send('Professor removidos com sucesso!');
    });
});

//Adicionar prof em disciplina
app.put('/disciplinas/:nome/professor',function(req, res) {

    var cpf_prof = req.query.eq;
    var nome_disciplina = req.params.nome;

    var where = {nome : nome_disciplina};

    dbo.collection('disciplinas').updateOne(where, {$set: {cpf: cpf_prof}} ,function(err, result) {
        res.status(200);
        res.send('Professor adicionada em disciplina com sucesso!');
    });
});

//Consultar prof em disciplina
app.get('/disciplinas/:nome/professor', function(req, res) {

    var nome_disciplina = req.params.nome;
    var where = {nome: nome_disciplina};

    dbo.collection('disciplinas').aggregate([
        { $lookup:
                {
                    from: 'professores',
                    localField: 'cpf',
                    foreignField: 'cpf',
                    as: 'professor'
                }
        },
        {
          $match: where
        }
    ]).toArray(function(err, disciplinas) {
        if (err) throw err;

        res.setHeader('Content-Type','application/json');
        res.status(200);
        res.send(JSON.stringify(disciplinas));
    });

    // dbo.collection('disciplinas').find(where).toArray(function(err, disciplinas) {
    //     if (err) throw err;
    //
    //     var disciplina = disciplinas[0];
    //     var where_prof = {cpf: disciplina.cpf};
    //
    //     dbo.collection('professores').find(where_prof).toArray(function(err, professores) {
    //         if (err) throw err;
    //
    //         res.setHeader('Content-Type','application/json');
    //         res.status(200);
    //         res.send(JSON.stringify(professores));
    //     });
    // });
});

mongo_cliente.connect('mongodb://localhost:27017/', { useNewUrlParser: true }, function( err, db) {
    if (err) throw err;

    dbo = db.db('UFSJ');

    app.listen(3000, function() {
        console.log('Funcionando ...');
    });
});
