const mongoose = require("mongoose")
const userSchema = mongoose.Schema({
    email:{
        type:String,
        require:true
    },
    fullname:{
        type:String,
        require:true
    },
    username:{
        type:String,
        require:true,
    },
    password:{
        type:String,
        require:true,
    },
    date:{
        type:Date,
        default:Date.now

    }


})
let userModel = mongoose.model("user_tb",userSchema)
module.exports=userModel
