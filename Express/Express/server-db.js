var express = require('express')
var app = express()

var body_parser = require('body-parser')
app.use(body_parser.urlencoded({
    extended: true
}))
app.use(body_parser.json())

var MongoClient = require('mongodb').MongoClient
var db

app.get('/alunos', function(req, res) {
    var alunos = db.collection('alunos').find().toArray(function(err, results) {
        res.setHeader('Content-Type','application/json')
        res.status(200)
        res.send(results)
    })
})

app.post('/alunos', function(req, res) {

    var aluno = req.body

    db.collection('alunos').insertOne(aluno, function(err, result) {
        if (err) return console.log(err)

        res.status(201)
        res.send('Aluno adicionado com sucesso!')
    })
})

app.put('/alunos', function(req, res) {

    var aluno = req.body

    var id = {_id : aluno._id}

    db.collection('alunos').updateOne(id, {$set : aluno}, function(err, result) {
        if (err) return console.log(err)

        res.status(200)
        res.send('Aluno ' + aluno.nome + ' alterado com sucesso!')
    })
})

app.delete('/alunos', function(req, res) {

    db.collection('alunos').remove({}, function(err, result) {
        res.status(204)
        res.send('Alunos removidos com sucesso')
    })
})

MongoClient.connect('mongodb://localhost:27017', { useNewUrlParser: true }, function(err, client) {
    if (err) return console.log(err)

    db = client.db('UFSJ')

    app.listen(3000, function() {
        console.log('Funcionando ...')
    })
})