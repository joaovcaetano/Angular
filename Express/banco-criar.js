var mongo_cliente = require('mongodb').MongoClient
mongo_cliente.connect('mongodb://localhost:27017/MAL', {useNewUrlParser: true},
	function(err,db){
		if(err) throw err
			console.log("Banco de Dados MAL criado!")
		db.close()
	})
