const express = require('express')
const bodyParser = require("body-parser")
const mongo = require('mongodb').MongoClient
const ObjectId = require('mongodb').ObjectId;
const app = express()
const port = 3000
const connectionString = 'mongodb://localhost:27017'

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

let db

// conexión a MongoDB
// nombre de db: 'products'
// nombre de colección: 'products'
mongo.connect(connectionString, (err, client) => {
  if (err) throw err

  db = client.db('products')

})

// endpoint para insertar un producto
app.post('/insert', (req, res) => {
  console.log(JSON.stringify(req.body));
  db.collection('products').insertOne(req.body)
  res.send('inserted')
})

// endpoint para obtener todos los productos
app.get('/list', (req, res) => {

  db.collection('products').find().toArray((err, result) => {
    if (err) throw err

    res.json(result)

  })
})

// endpoint para borrar un producto
app.delete('/delete', (req, res) => {

  console.log(req.query.id)

  db.collection('products').deleteOne({ "_id": ObjectId(req.query.id) })
  res.send('deleted')
})

// endpoint para validar servidor
app.get('/ping', (req, res) => {

  res.send('serverconffirmed')
})

app.listen(port, () => {
  console.log(`Listening on port ${port}`)
})
