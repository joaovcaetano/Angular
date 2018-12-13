var express = require('express')
var app = express()
var body_parser = require('body-parser')
var url = require('url')
var querystring = require('querystring')
app.use(body_parser.urlencoded({
	extended: true
}))
app.use(body_parser.json())
var mongo_cliente = require('mongodb').MongoClient
var dbo

app.get('/alunos', function(req, res){
	dbo.collection('alunos').find().toArray(function(err,alunos){
		res.setHeader('Content-Type', 'application/json')
		res.status(200)
		res.send(JSON.stringify(alunos))
	
	})
	
})

app.get('/professores', function(req, res){
	dbo.collection('professores').find().toArray(function(err,professores){
		res.setHeader('Content-Type', 'application/json')
		res.status(200)
		res.send(JSON.stringify(professores))
	
	})
	
})

app.get('/professores/cpf', function(req, res){
	var cpf_professor = req.query.eq
	var id = {cpf : cpf_professor}
	dbo.collection('professores').find(id).toArray(function(err,professores){
		res.setHeader('Content-Type', 'application/json')
		res.status(200)
		res.send(JSON.stringify(professores))
	
	})
	
})
app.get('/disciplinas', function(req, res){
	dbo.collection('disciplinas').find().toArray(function(err,disciplinas){
		res.setHeader('Content-Type', 'application/json')
		res.status(200)
		res.send(JSON.stringify(disciplinas))
	
	})
})

app.get('/disciplinas/nome', function(req,res){
	var disciplina = req.query.eq
	var id = {nome : disciplina}
	dbo.collection('disciplinas').find(id).toArray(function(err,disciplinas){
		if(err) return console.log(err)
		var id2 = {cpf: disciplinas[0].cpf}
		console.log(disciplinas[0].cpf)
		dbo.collection('professores').find(id2).toArray(function(err,professores){
			res.setHeader('Content-Type', 'application/json')
			res.status(200)
			res.send(JSON.stringify(professores))
		})
	})
})
app.post('/alunos', function(req, res){
	var aluno = req.body
	dbo.collection('alunos').insertOne(aluno, function(err,result){
		if (err) throw console.log(err)
		res.status(200)
		res.send('Aluno adicionado')
	})
})

app.post('/professores', function(req, res){
	var professor = req.body
	dbo.collection('professores').insertOne(professor, function(err,result){
		if (err) throw console.log(err)
		res.status(200)
		res.send('Professor adicionado')
	})
})

app.put('/alunos', function(req,res){
	var aluno = req.body
	var id = {nome : aluno.nome}

	dbo.collection('alunos').updateOne(id, {$set : aluno}, function(err, result){
		if(err) return console.log(err)
		res.status(200)
		res.send('Aluno' + aluno.nome + ' alterado com sucesso!!')
	})
})
app.put('/professores', function(req,res){
	var professor = req.body
	var id = {cpf : professor.cpf}

	dbo.collection('professores').updateOne(id, {$set : professor}, function(err, result){
		if(err) return console.log(err)
			res.status(200)
		res.send('Professor' + professor.cpf + ' alterado com sucesso!!')
	})
})

app.put('/disciplinas', function(req,res){
	var disciplina = req.body
	var id = {nome : disciplina.nome}
	dbo.collection('disciplinas').updateOne(id,{$set : disciplina}, function(err, result){
		if(err) return console.log(err)
			res.status(200)
		res.send('Professor' + disciplina.cpf + ' inserido com sucesso!!')
	})
})

app.delete('/alunos', function(req,res){
	dbo.collection('alunos').remove({}, function(err,result){
		res.status(200)
		res.send('Alunos removidos com sucesso!')
	})
})

app.delete('/alunos/nome', function(req,res){
	var nome_aluno = req.query.eq
	var id = {nome : nome_aluno}
	dbo.collection('alunos').deleteOne(id, function(err,result){
		res.status(204)
		res.send('Alunos removidos com sucesso!')
	})
})
app.delete('/professores', function(req,res){
	dbo.collection('professores').remove({}, function(err,result){
		res.status(200)
		res.send('Professores removidos com sucesso!')
	})
})

app.delete('/disciplinas', function(req,res){
	dbo.collection('disciplinas').remove({}, function(err,result){
		res.status(200)
		res.send('Disciplinas removidos com sucesso!')
	})
})

app.delete('/professores/cpf', function(req,res){
	var cpf_professor = req.query.qd
	var id = {cpf : cpf_professor}
	dbo.collection('professores').deleteOne(id, function(err,result){
		res.status(204)
		res.send('Professor removidos com sucesso!')
	})
})

mongo_cliente.connect('mongodb://localhost:27017/', {useNewUrlParser: true}, function(err, db){
	if(err) throw err
	dbo = db.db('UFSJ')
	app.listen(3000, function(){
		console.log('Funcionando...')
	})	
})