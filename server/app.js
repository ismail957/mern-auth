import dotenv from 'dotenv'
dotenv.config()

import express from 'express'
import mongoose from 'mongoose'
import cors from 'cors'
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
app.use(cors())

app.use('/api/user', userRoute)
app.use('/api/auth', authRoute)

app.use((err, req, res, next) => {
    const statusCode = err.statusCode || 500;
    const message = err.message || 'Internal server error';
    return res.status(statusCode).json({
      success: false,
      message,
      statusCode
    })
})

const port = process.env.PORT || 5005

app.listen(port, () => {console.log(`The App running on port ${port}`)})