var express = require('express')
var app = express()
var body_parser = require('body-parser')
var url = require('url')
var querystring = require('querystring')
app.use(body_parser.urlencoded({
	extended: true
}))
app.use(body_parser.json())
var db_alunos = [
	{nome: 'Joao', email: 'joao@gmail.com', cr: '9.0'},
	{nome: 'Maria', email: 'maria@gmail.com', cr: '9.5'},
	{nome: 'Jose', email: 'jose@gmail.com', cr: '7.0'}
]

app.get('/alunos', function(req, res){
	res.setHeader('Content-Type', 'application/json')
	res.status(200)
	res.send(JSON.stringify(db_alunos))

})

app.get('/alunos/nome', function(req, res){
	var nome_aluno = req.query.eq
	var result
	for(var x = 0; x< db_alunos.length; x++){
		if(db_alunos[x].nome == nome_aluno){
			result = db_alunos[x]
		}
	}
	res.setHeader('Content-Type', 'application/json')
	res.status(200)
	res.send(JSON.stringify(result))

})

app.get('/alunos/cr', function(req, res){
	var cr_aluno = req.query.qd
	var results = []
	for(var x = 0; x< db_alunos.length; x++){
		if(db_alunos[x].cr == cr_aluno){
			results.push(db_alunos[x])
		}
	}
	res.setHeader('Content-Type', 'application/json')
	res.status(200)
	res.send(JSON.stringify(results))

})
app.post('/alunos', function(req, res){
	var aluno = req.body
	var nome_aluno = aluno.nome
	var existe = false
	for(var x = 0; x< db_alunos.length; x++){
		var db_aluno = db_alunos[x]
		if(db_aluno.nome == nome_aluno){
			existe = true
		}
	}
	if(!existe){
		db_alunos.push(aluno)
		res.status(201)
		res.send('Aluno adicionado com sucesso')
	}else{
		res.status(400)
		res.send('Aluno ' + nome_aluno + ' existe no banco de dados!')
	}
})

app.put('/alunos', function(req,res){
	var aluno = req.body
	var nome_aluno = aluno.nome
	var existe = false
	var indice_aluno = -1
	for(var x = 0; x< db_alunos.length; x++){
		var db_aluno = db_alunos[x]
		if(db_aluno.nome == nome_aluno){
			db_alunos[x] = aluno
			existe = true
			indice_aluno = x
		}
	}
	if(existe){
		db_alunos[indice_aluno] = aluno
		res.status(200)
		res.send('Aluno ' + nome_aluno + ' alterado com sucesso')
	}else{
		res.status(400)
		res.send('Aluno ' + nome_aluno + ' nao existe no banco de dados')
	}
})
app.delete('/alunos', function(req,res){
	db_alunos = []
	res.status(204)
	res.send('OK')
})
app.listen(3000, function(){
	console.log('Funcionando...')
})