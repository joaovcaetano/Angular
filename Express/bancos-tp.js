
var express = require('express')
var app = express()
var body_parser = require('body-parser')
var url = require('url')
var querystring = require('querystring')

app.use(body_parser.urlencoded({
	extended: true
}))

app.use(body_parser.json())
app.use(express.static('public'));

var jwt = require('jsonwebtoken');
var mongo_cliente = require('mongodb').MongoClient
var dbo

const cors = require('cors')

app.use(cors())

app.post('/login', function(req, res) {
    var user = req.body;

    dbo.collection('usuarios').findOne({ nome: user.nome }, function(err, usuario) {
        if (err) return res.status(500).send();

        if (!usuario) {
        	return res.status(401).send({ token: null, tipo: null });

        } else {
        	console.log(user.password)
        	console.log(usuario.password)
            if ( usuario.password == user.password ) {
                var token = jwt.sign({ id: usuario._id }, 'supersecret', {
                    expiresIn: 86400
                });

                res.status(200);
                if(usuario.nome == 'Administrador'){
                	res.send({token: token, tipo: 'administrador'})
                }
                else{
      				console.log(usuario.nome)
                	res.send({ token: token, tipo: 'usuarios' });	
                }
                
            } else {
                return res.status(401).send({ token: null, tipo: null });
            }
        }
    });
});

function verificaToken(req, res, next) {

    var token = req.headers['x-access-token'];

    if (!token)
        return res.status(403).send({ auth: false, message: 'Nenhum token disponvível.' });

    jwt.verify(token, 'supersecret', function(err, decoded) {
        if (err)
            return res.status(500).send({ auth: false, message: 'Erro de autenticação.' });

        req.userId = decoded.id;
        next();
    });
}

app.get("/anime/:genero", verificaToken, function(req,res) {
	var genero = req.params.genero
	dbo.collection(genero).find().toArray(function(err,genero){
		res.setHeader('Content-Type', 'application/json')
		res.status(200)
		res.send(JSON.stringify(genero))
	})
})

app.get("/anime/:genero/nome", verificaToken, function(req,res) {
	var genero = req.params.genero
	var nome_anime = req.query.eq
	var id = {nome : nome_anime}
	console.log(id)
	dbo.collection(genero).find(id).toArray(function(err,genero){
		res.setHeader('Content-Type', 'application/json')
		res.status(200)
		res.send(JSON.stringify(genero))
	
	})
})

app.get("/anime/:genero/top", verificaToken, function(req,res){
	var genero = req.params.genero
	var quantidade = req.query.eq
	var quant = + quantidade
	var retorno = new Array(quant)
	if (quant != 0){
		dbo.collection(genero).find().toArray(function(err,genero){
			for(var x = 0; x< quant; x++){
				retorno[x] = genero[x].nome
			}
			res.setHeader('Content-Type', 'application/json')
			res.status(200)
			res.send(JSON.stringify(retorno))
		})
	}else{
		res.status(400)
		res.send('Nao existe top 0')
	}
})


app.delete('/anime/:genero', verificaToken, function(req,res){
	var genero = req.params.genero
	dbo.collection(genero).remove({}, function(err,result){
		res.status(200)
		res.send(genero + ' limpo com sucesso!')
	})
})

app.get('/usuarios', verificaToken, function(req, res){
	dbo.collection('usuarios').find().toArray(function(err,usuarios){
		res.setHeader('Content-Type', 'application/json')
		res.status(200)
		res.send(JSON.stringify(usuarios))
	
	})
})

app.get('/usuarios/nome', verificaToken, function(req, res){
	var nome_usuario = req.query.eq
	var id = {nome : nome_usuario}
	console.log(id)
	dbo.collection('usuarios').find(id).toArray(function(err,usuarios){
		res.setHeader('Content-Type', 'application/json')
		res.status(200)
		res.send(JSON.stringify(usuarios))
	
	})
})
app.get('/usuarios/apelido', verificaToken, function(req, res){
	var nome_usuario = req.query.eq
	var id = {apelido : nome_usuario}
	console.log(id)
	dbo.collection('usuarios').find(id).toArray(function(err,usuarios){
		res.setHeader('Content-Type', 'application/json')
		res.status(200)
		res.send(JSON.stringify(usuarios))
	
	})
})

app.post('/usuarios', verificaToken, function(req, res){
	var usuario = req.body
	console.log(usuario.length)
	var email = usuario.email
	var existe = false
	dbo.collection('usuarios').find().toArray(function(err,usuarios){
		for(var x = 0; x< usuarios.length; x++){
			if(email == usuarios[x].email){
				existe = true
			}
		}
		if(!existe){
			dbo.collection('usuarios').insertOne(usuario, function(err,result){
				console.log(usuario)
				if (err) throw console.log(err)
				res.status(200)
				res.send('Usuario adicionado')
			})
		}else{
			res.status(400)
			res.send('Email ' + email + ' ja cadastrado!')
		}
	})
})
app.put('/usuarios', verificaToken, function(req,res){
	var usuario = req.body
	var id = {email : usuario.email}
	dbo.collection('usuarios').updateOne(id, {$set : usuario}, function(err, result){
		if(err) return console.log(err)
		res.status(200)
		res.send('Usuario ' + usuario.email + ' alterado com sucesso!!')
	})
})
app.delete('/usuarios', verificaToken, function(req,res){
	dbo.collection('usuarios').remove({}, function(err,result){
		res.status(200)
		res.send('Usuarios limpos com sucesso!')
	})
})

app.delete('/usuarios/email', verificaToken, function(req, res){
	var email_usuario = req.query.eq
	var id = {email : email_usuario}
	console.log(id)
	dbo.collection('usuarios').removeOne(id, {}, function(err,usuarios){
		res.setHeader('Content-Type', 'application/json')
		res.status(200)
		res.send(JSON.stringify(usuarios))
	
	})
})
mongo_cliente.connect('mongodb://localhost:27017/', {useNewUrlParser: true}, function(err, db){
	if(err) throw err
	dbo = db.db('MAL')
	app.listen(3000, function(){
		console.log('Funcionando...')
	})	
})
