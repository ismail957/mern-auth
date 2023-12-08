import dotenv from 'dotenv'
dotenv.config()

import express from 'express'

const app = express()
const port = process.env.PORT || 5005

app.get('/', (req, res) => {
  res.send('server running');
})

app.listen(port, () => {console.log(`The App running on port ${port}`)})