var mongo_cliente = require('mongodb').MongoClient

mongo_cliente.connect('mongodb://localhost:27017/UFSJ', { useNewUrlParser: true },
    function (err, db) {

    if (err) throw err
    console.log('Banco de dados UFSJ criado!')
    db.close()
})