var mongo_cliente = require('mongodb').MongoClient
var csvToJson = require('convert-csv-to-json')
var XMLHttpRequest = require("xmlhttprequest").XMLHttpRequest;
mongo_cliente.connect('mongodb://localhost:27017/MAL', {useNewUrlParser: true}, function(err,db){
	if(err) throw err	
	function criacolecao(nome_genero){
		dbo.createCollection(nome_genero, function(err,res){
			if(err) throw err
			var myInputFile = nome_genero + '.csv'
			var json = csvToJson.getJsonFromCsv(myInputFile);
			var animes = []
			for(var j=0; j<json.length;j++){
				animes[j] = json[j];
			}
			dbo.collection(nome_genero).insertMany(animes, function(err,res){
				if (err) throw err
				console.log(nome_genero + ' inseridos!')
				db.close()
			})
		})
	}
	var dbo = db.db('MAL')
	var nomes = ['action','adventure', 'cars', 'comedy', 'dementia', 'demons',
		'drama', 'ecchi', 'fantasy', 'game', 'harem', 'hentai', 'historical', 'horror',
		'josei', 'kids', 'magic', 'martialarts', 'mecha', 'military', 'music',
		'mystery', 'parody', 'police', 'psychological', 'romance', 'samurai',
		'school', 'scifi', 'seinen', 'shoujo','shoujoai', 'shounenai',
		'sliceoflife', 'space', 'sports', 'supernatural', 'superpower', 'thriller',
		'vampire', 'yaoi', 'yuri']
	/*for(var x = 0; x < 5; x++){
		criacolecao(nomes[x])	
	}

	for(var x = 5; x < 10; x++){
		criacolecao(nomes[x])	
	}
	
	for(var x = 10; x < 15; x++){
		criacolecao(nomes[x])	
	}
	
	for(var x = 15; x < 20; x++){
		criacolecao(nomes[x])	
	}
	
	for(var x = 20; x < 25; x++){
		criacolecao(nomes[x])	
	}
	
	for(var x = 25; x <30; x++){
		criacolecao(nomes[x])	
	}
	
	for(var x = 30; x <32; x++){
		criacolecao(nomes[x])	
	}

	for(var x = 32; x <35; x++){
		criacolecao(nomes[x])	
	}

	for(var x = 35; x <37; x++){
		criacolecao(nomes[x])	
	}
	
	for(var x = 37; x <40; x++){
		criacolecao(nomes[x])	
	}*/
	dbo.createCollection('usuarios', function(err,res){
		if(err) throw err
		var usuarios = [
			{nome: 'Administrador', email: 'admin@gmail.com', apelido: 'Admin' , lista: '', password: '123'}
		]
		dbo.collection('usuarios').insertMany(usuarios, function(err,res){
			if (err) throw err
			console.log('Usuarios criadas!')
			db.close()
		})
	})

	
})
