var MongoClient = require('mongodb').MongoClient

MongoClient.connect("mongodb://localhost:27017/", { useNewUrlParser: true }, function(err, db) {
    if (err) throw err

    var dbo = db.db("UFSJ")

    dbo.createCollection("alunos", function(err, res) {
        if (err) throw err

        var alunos = [
            {nome: 'Joao', email: 'joao@gmail.com', cr: '9.0'},
            {nome: 'Maria', email: 'maria@gmail.com', cr: '9.5'},
            {nome: 'Jose', email: 'jose@gmail.com', cr: '7.0'}
        ]

        dbo.collection("alunos").insertMany(alunos, function(err, res) {
            if (err) throw err
            console.log("Alunos Inseridos")
            db.close()
        })

        db.close()
    })
})