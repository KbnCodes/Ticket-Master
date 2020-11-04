const mongoose=require('mongoose')
const jwt=require('jsonwebtoken')
const bcryptjs=require('bcryptjs')
const validator=require('validator')

const Schema=mongoose.Schema

const userSchema=new Schema({
    username:{
        type:String,
        required:true,
        unique:true
    },
    email:{
        type:String,
        required:true,
        unique:true,
        validate:{
            validator:(value)=>{
                return validator.isEmail(value)
            },
            
            message:()=>{
                return 'invalid email'
            }
        }
    },
    password:{
        type:String,
        minlength:6,
        maxlength:128,
        required:true
    },
    tokens:[
        {
            token:{
                type:String
            },
            createdAt:{
                type:Date,
                default:Date.now
            }
        }
    ]
})

userSchema.pre('save',function(next){
    const user=this
    if(user.isNew){
        bcryptjs.genSalt(10)
        .then((salt)=>{
            bcryptjs.hash(user.password,salt)
             .then((encrypt)=>{
                    user.password=encrypt
                    next()
             })
        })
    }else{
        next()
    }
})

userSchema.statics.findByCredentials=function(email,password){
    const User=this
    return User.findOne({email:email})
    .then(user=>{
        if(!user){
          return  Promise.reject({error:'invalid email/password'})
        }else{
           return bcryptjs.compare(password,user.password)
           .then(result=>{
               if(result){
               return Promise.resolve(user)
            }
               else{
                return   Promise.reject({error:'invalid email/password'})
               }
           })
        }
    })
    .catch(err=>{
        return Promise.reject(err)
    })
}
userSchema.statics.findByToken=function(token){
    const user=this
    let tokenData
    try{
        tokenData=jwt.verify(token,'jwt@123')
    }catch(err){
        return Promise.reject(err)
    } 
    return user.findOne({
        _id:tokenData._id,
        'tokens.token':token
    })
}



//own instance methods
userSchema.methods.generateToken=function(){
    const user=this
    const tokenData={
        _id:user._id,
        username:user.username,
        createdAt:Number(new Date())
    }
    const token=jwt.sign(tokenData,'jwt@123')
    user.tokens.push({
        token:token
    })
    return user.save()
    .then(function(user){
        return Promise.resolve(token)
    })
    .catch(function(err){
        return Promise.reject(err)
    })
}


const User=mongoose.model('User',userSchema)

module.exports=User