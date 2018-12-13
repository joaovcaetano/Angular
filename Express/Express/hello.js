var express = require('express')
var app = express()

var bodyParser = require('body-parser')
app.use(bodyParser.urlencoded({
    extended: true
}))
app.use(bodyParser.json())

var alunos = [{nome: 'Joao', email: 'joao@gmail.com'},
    			{nome: 'Maria', email: 'maria@gmail.com'},
    			{nome: 'Jose', email: 'jose@gmail.com'}]

app.get('/', function (req, res) { 
	res.send('Express');
})

app.get('/alunos', function(req, res) {
	res.setHeader('Content-Type','application/json')
	res.status(200)
	res.send(JSON.stringify(alunos))
})

app.post('/alunos', function(req, res) {
	var aluno = req.body
	alunos.push(aluno)
	res.status(201)
    res.send()
})

app.put('/alunos/:index', function(req, res) {
    var index_aluno = req.params.index

	if ( index_aluno > alunos.length ) {
        res.status(404)
	} else {
        var aluno = JSON.parse(req.body)
        alunos[index_aluno] = aluno
        res.status(200)
        res.send()
	}
})

app.get('/alunos/:index', function(req, res) {
    var index_aluno = req.params.index

	if ( index_aluno > alunos.length ) {
        res.status(404)
    } else {
		res.status(200)
        res.send(JSON.stringify(alunos[index_aluno]))
    }
})

app.get('/alunos/:index/nome', function(req,res) {
	var index_aluno = req.params.index

    if ( index_aluno > alunos.length ) {
        res.status(404)
    } else {
    	res.status(200)
        res.send(JSON.stringify(alunos[index_aluno].nome))
    }
})

app.delete('/alunos/:index',function(req,res) {
    var index_aluno = req.params.index

	if ( index_aluno > alunos.length ) {
        res.status(404)
    } else {
		res.status(204)
        delete alunos[index_aluno]
    }
})
 
app.listen(3000, function () { 
	console.log('Example app listening on port 3000!')
})
