import dotenv from 'dotenv'
dotenv.config()

import express from 'express'
import mongoose from 'mongoose'
import userRoute from './routes/userRouteApi.js'
import authRoute from './routes/authRoute.js'

mongoose.connect(process.env.MONGO_URL).then(() => {
  console.log("Connected to MongoDB")
})
.catch(err => {
  console.log(err)
})

const app = express()

app.use(express.json());

app.use('/api/user', userRoute)
app.use('/api/auth', authRoute)

const port = process.env.PORT || 5005

app.listen(port, () => {console.log(`The App running on port ${port}`)})