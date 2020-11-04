const mongoose=require('mongoose')
const validator=require('validator')
const Schema=mongoose.Schema

const employeeSchema=new Schema({
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
        required:true,
        minlength:10,
        maxlength:10,
        validate:{
            validator:function(value){
                return validator.isNumeric(value)
            },
            massage:function(){
                return 'invalid mobile format'
            }
        }
    },
    department:{
        type:Schema.Types.ObjectId,
        required:true,
        ref:'Department'
    },
    user:{
        type:Schema.Types.ObjectId,
        ref:'User',
        require:true
    }
})

const Employee=mongoose.model("Employee",employeeSchema)

module.exports=Employee