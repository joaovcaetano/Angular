var mongo_cliente = require('mongodb').MongoClient
mongo_cliente.connect('mongodb://localhost:27017/UFSJ', {useNewUrlParser: true}, function(err,db){
	if(err) throw err	
	var dbo = db.db('UFSJ')
	dbo.createCollection('alunos', function(err,res){
		if(err) throw err
		var alunos = [
			{nome: 'Joao', email: 'joao@gmail.com', cr: '9.0'},
			{nome: 'Maria', email: 'maria@gmail.com', cr: '9.5'},
			{nome: 'Jose', email: 'jose@gmail.com', cr: '7.0'}
		]
		dbo.collection('alunos').insertMany(alunos, function(err,res){
			if (err) throw err
			console.log('Alunos inseridos!')
			db.close()
		})
	})
	dbo.createCollection('professores', function(err,res){
		if(err) throw err
		var professores = [
			{nome: 'Elder', email: 'elder@gmail.com', cpf: '00123456789'},
			{nome: 'Cirilo', email: 'cirilo@gmail.com', cpf: '99876543210'},
			{nome: 'Nogueira', email: 'nogueira@gmail.com', cpf: '01234567899'}
		]
		dbo.collection('professores').insertMany(professores, function(err,res){
			if (err) throw err
			console.log('Professores inseridos!')
			db.close()
		})
	})
	dbo.createCollection('disciplinas', function(err,res){
		if(err) throw err
		var disciplinas = [
			{nome: 'TecWeb', carga: '72'},
			{nome: 'WebTec', carga: '60'}
		]
		dbo.collection('disciplinas').insertMany(disciplinas, function(err,res){
			if (err) throw err
			console.log('Disciplinas criadas!')
			db.close()
		})
	})
})