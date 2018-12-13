var mongo_cliente = require('mongodb').MongoClient;

mongo_cliente.connect('mongodb://localhost:27017/', { useNewUrlParser: true }, function( err, db) {
    if (err) throw err;

    var dbo = db.db('UFSJ');

    dbo.createCollection('alunos', function(err, res) {
        if (err) throw err;

        var alunos = [
            {nome: 'Joao', email: 'joao@gmail.com', cr: '9.0'},
            {nome: 'Maria', email: 'maria@gmail.com', cr: '9.5'},
            {nome: 'Jose', email: 'jose@gmail.com', cr: '7.0'}
        ];

        dbo.collection('alunos').insertMany(alunos, function(err, res) {
            if (err) throw err;
            console.log('Alunos inseridos!');
        });
    });

    dbo.createCollection('professores', function(err, res) {
        if (err) throw err;

        var professores = [
            {nome: 'Elder', cpf: '001', qi: '100'},
            {nome: 'Matheus', cpf: '002', qi: '150'},
            {nome: 'Carol', cpf: '033', qi: '200000'}
        ];

        dbo.collection('professores').insertMany(professores, function(err, res) {
           if (err) throw err;
           console.log('Professores inseridos!');
        });
    });

    dbo.createCollection('disciplinas', function(err, res) {
        if (err) throw err;

        var disciplinas = [
            {nome: 'Tecweb', carga: '72'},
            {nome: 'CLP', carga: '72'},
            {nome: 'AEDSIII', carga: '72'}
        ];

        dbo.collection('disciplinas').insertMany(disciplinas, function(err, res) {
            if (err) throw err;
            console.log('Disciplinas inseridos!');
        });
    });
});