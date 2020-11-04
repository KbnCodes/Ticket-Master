const mongoose=require('mongoose')
const validator=require('validator')
const Schema=mongoose.Schema

const customerSchema=new Schema({
    name:{
        type:String,
        required:true
    },
    email:{
        type:String,
        required:true,
        validate:{
            validator:function(value){
                return validator.isEmail(value)
            },
            message:function(){
                return 'invalid email format'
            }
        }
    },
    mobile:{
        type:String,
        minlength:10,
        maxlength:10,
        required:true,
        unique:true,
        validate:{
            validator:function(value){
                return validator.isNumeric(value)
            },
            message:function(){
                return 'invalid mobile format'
            }
        }

    },
    user:{
        type:Schema.Types.ObjectId,
        ref:'User',
        require:true
    }
})

const Customer=mongoose.model('Customer',customerSchema)

module.exports=Customer
