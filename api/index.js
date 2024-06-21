import express, { json } from 'express'
import mongoose from 'mongoose'
import dotenv from 'dotenv'
import userRoutes from './routes/user.route.js'
import authRoutes from './routes/auth.route.js'

dotenv.config()

mongoose.connect(process.env.MONGO)
.then(() => {
    console.log('database connected')
})
.catch((err) => {
    console.log(err)
})

const App = express()
App.use(express.json());

App.listen(3000, () =>{
    console.log("Server listening on port 3000")
})

App.use("/api/user", userRoutes)
App.use("/api/auth", authRoutes)