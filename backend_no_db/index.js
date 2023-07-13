const express = require('express')
const bodyParser = require("body-parser")
const app = express()
const port = 3000

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

const collection = {}
let seed = 1;

// endpoint para insertar un producto
app.post('/insert', (req, res) => {
  console.log(JSON.stringify(req.body));

  collection[seed.toString()] = { ...req.body, _id: seed }
  seed++;
  res.send('inserted')
})

// endpoint para obtener todos los productos
app.get('/list', (req, res) => {

  const result = Object.keys(collection).map((key) => (collection[key]));

  res.json(result)

})

// endpoint para borrar un producto
app.delete('/delete', (req, res) => {

  console.log(req.query.id)

  delete collection[req.query.id]

  res.send('deleted')
})

// endpoint para validar servidor
app.get('/ping', (req, res) => {

  res.send('serverconffirmed')
})

app.listen(port, () => {
  console.log(`Listening on port ${port}`)
})
