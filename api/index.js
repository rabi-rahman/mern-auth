import express, { json } from 'express'
import mongoose from 'mongoose'
import dotenv from 'dotenv'
import userRoutes from './routes/user.route.js'
import authRoutes from './routes/auth.route.js'
import cookieParser from 'cookie-parser'
import cors from 'cors'

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

App.use(cookieParser());

App.use(cors({origin:'http://localhost:5173',credentials:true}))

App.listen(3000, () =>{
    console.log("Server listening on port 3000")
})

App.use("/api/user", userRoutes)
App.use("/api/auth", authRoutes)

App.use((err,req,res,next) => {
    const statusCode = err.statusCode || 500;
    const message = err.message || 'Internal Server Error';
    return res.status(statusCode).json({
        success : false,
        message,
        statusCode,
    })
})