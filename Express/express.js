var express = require('express')
var app = express()
app.get('/', function (req,res){
    res.send('Hello World!')
})
app.get('/alunos', function(req,res){
	var alunos = []
	var joao = {nome: 'Joao', email: 'joao@gmail.com'}
	var maria = {nome: 'Maria', email: 'maria@gmail.com'}
	var jose = {nome: 'Jose', email: 'jose@gmail.com'}

	alunos.push(joao)
	alunos.push(maria)
	alunos.push(jose)

	
	res.send(JSON.stringify(alunos))
})
app.get('/alunos/:num', function(req,res){
	var alunos = []
	var num_alunos = req.params.num
	var joao = {nome: 'Joao', email: 'joao@gmail.com'}
	var maria = {nome: 'Maria', email: 'maria@gmail.com'}
	var jose = {nome: 'Jose', email: 'jose@gmail.com'}

	alunos.push(joao)
	alunos.push(maria)
	alunos.push(jose)

	
	res.send(JSON.stringify(alunos.slice(0,num_alunos)))
})

app.get('/alunos/:index/nome', function(req,res){
	var alunos = []
	var index_alunos = req.params.index
	var joao = {nome: 'Joao', email: 'joao@gmail.com'}
	var maria = {nome: 'Maria', email: 'maria@gmail.com'}
	var jose = {nome: 'Jose', email: 'jose@gmail.com'}

	alunos.push(joao)
	alunos.push(maria)
	alunos.push(jose)

	
	res.send(JSON.stringify(alunos[index_alunos].nome))
})


app.get('/alunos/html', function(req,res){
	res.send('<html>' +
	'<header>' +
		'</title> Joao Exemplo </title>' +
	'</header>' +
	'<body> <b> Joao Exemplo</b>' +
	'<html>')
})
app.listen(3000, function () {
    console.log('Example app listening on port 3000!')
})
