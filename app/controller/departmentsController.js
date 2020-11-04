const Department=require('../models/department')
const Ticket=require('../models/ticket')

module.exports.list=(req,res)=>{
    Department.find({user:req.user._id})
        .then(department=>{
            res.json(department)
        })
        .catch(err=>{
            res.json(err)
        })
}
module.exports.create=(req,res)=>{
    const body=req.body
    const department=new Department(body)
    department.user=req.user._id

    department.save()
        .then(department=>{
            res.json(department)
        })
        .catch(err=>{
            res.json(err)
        })
}
module.exports.show=(req,res)=>{
    const id=req.params.id
    Promise.all([Department.findOne({_id:id,user:req.user._id}),Ticket.find({department:id})])
    // Department.findOne({_id:id,user:req.user._id})
        .then(value=>{
            const [department,ticket]=value
            if(department){
                res.json({department,ticket})
            }else{
                res.json({})
            }
        })
        .catch(err=>{
            res.json(err)
        })
}
module.exports.update=(req,res)=>{
    const body=req.body
    const id=req.params.id
    Department.findOneAndUpdate({_id:id,user:req.user._id},body,{new:true,runValidators:true})
        .then(department=>{
            if(department){
                res.json(department)
            }else{
                res.json({})
            }
        })
        .catch(err=>{
            res.json(err)
        })
}
module.exports.destroy=(req,res)=>{
    const id=req.params.id
    Department.findOneAndDelete({_id:id,user:req.user._id})
        .then(department=>{
            if(department){
                res.json(department)
            }else{
                res.json({})
            }
        })
        .catch(err=>{
            res.json(err)
        })
}

