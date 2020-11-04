const Customer=require('../models/customer')

module.exports.list=(req,res)=>{
    Customer.find({user:req.user._id})
        .then(customers=>{
            res.json(customers)
        })
        .catch(err=>{
            res.json(err)
        })
}
module.exports.create=(req,res)=>{
    const body=req.body
    const customer=new Customer(body)
    customer.user=req.user._id

    customer.save()
    .then(customers=>{
            res.json(customers)
        })
        .catch(err=>{
            res.json(err)
        })
}
module.exports.show=(req,res)=>{
    const id=req.params.id
    Customer.findOne({_id:id,user:req.user._id})
        .then(customers=>{
            if(customers){
            res.json(customers)
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
    Customer.findOneAndUpdate({_id:id,user:req.user._id},body,{new:true,runValidators:true})
        .then(customers=>{
            if(customers){
            res.json(customers)
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
    Customer.findOneAndDelete({_id:id,user:req.user._id})
        .then(customers=>{
            if(customers){
            res.json(customers)
            }else{
                res.json({})
            }
        })
        .catch(err=>{
            res.json(err)
        })
}