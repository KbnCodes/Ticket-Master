const express=require('express')
const cors=require('cors')
const connectDB=require('./config/database')
const router=require('./config/routes')
const app=express()
const port=3026

connectDB()
app.use(cors())

app.use(express.json())
app.use('/',router)
app.listen(port,()=>{
    console.log('Listening to port',port)
})