const express = require('express')
const cors = require('cors')

const app = express()
const port = 5000

app.use(cors())

app.get('/', (req, res) => {
  res.status(200).json({ message: 'Hello World!' })
})

app.listen(port, () => {
  console.log('...start server')
})
