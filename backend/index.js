const express = require("express")
const cors = require("cors")
require("dotenv").config()
const connectDB = require("./config/db")
const router = require('./routes')
const cookieParser = require('cookie-parser')
const app = express()
app.use(cors({
    origin : process.env.FRONTEND_URL,
    credentials : true
}))
console.log("env details", process.env.FRONTEND_URL)

app.use(cookieParser())
app.use(express.json());
// app.use(express.json({ limit: '50mb' }));
app.use('/api', router)




const PORT = 8080 || process.env.PORT


connectDB()
app.listen(PORT, ()=> {
    console.log("Server is running")
})