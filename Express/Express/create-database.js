var MongoClient = require('mongodb').MongoClient

MongoClient.connect('mongodb://localhost:27017/UFSJ', { useNewUrlParser: true }, function(err, db) {
    if (err) throw err
    console.log('Database created!')
    db.close()
})