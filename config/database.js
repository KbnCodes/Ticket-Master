const mongoose=require('mongoose')
const connectDB=()=>{
    mongoose.connect('mongodb://localhost:27017/ticket-master',{ useNewUrlParser: true, useUnifiedTopology: true ,useCreateIndex:true})
    .then(()=>{
        console.log('connected to DB')
    })
    .catch((err)=>{
        console.log(err)
    })
}
module.exports=connectDB