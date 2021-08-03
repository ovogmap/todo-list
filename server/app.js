const express = require('express')
const cors = require('cors')
const todo = require('./api/todo')

const app = express()
const port = 5000

app.use(cors())

app.use(express.json())
app.use(express.urlencoded({ extended: true }))

app.use('/todos', todo)

app.get('/', (req, res) => {
  res.status(200).json({ message: 'Hello World!' })
})

app.listen(port, () => {
  console.log('...start server')
})
