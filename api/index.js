import express from 'express'
import mongoose from 'mongoose'
import dotenv from 'dotenv'
import userRoutes from './routes/user.route.js'

dotenv.config()

mongoose.connect(process.env.MONGO)
.then(() => {
    console.log('database connected')
})
.catch((err) => {
    console.log(err)
})

const App = express()

App.listen(3000, () =>{
    console.log("Server listening on port 3000")
})

App.use("/api/user", userRoutes)