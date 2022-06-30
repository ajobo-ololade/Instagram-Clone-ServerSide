const mongoose = require("mongoose")
const bcrypt = require("bcryptjs")
const imageSchema =mongoose.Schema({
    image_url:{
        require:true,
        type:String,
    },
    caption:{
        require:true,
        type:String,

    },
    username:{
        require:true,
        type:String
    },
    ProfilePicture:{
        require:true,
        type:String,
    }
    
})
const followersSchema= mongoose.Schema({
    image_url:{
        require:true,
        type:String,
    },
    username:{
        type:String,
        require:true,
    },
    fullname:{
        type:String,
        require:true
    }


})
const followingSchema= mongoose.Schema({
    image_url:{
        require:true,
        type:String,
    },
    username:{
        type:String,
        require:true,
    },
    fullname:{
        type:String,
        require:true
    }

})
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

    },
    Post:[imageSchema],
    ProfilePicture:{
        require:true,
        type:String,
    },
    Followers:[followersSchema],
    Following:[followingSchema],
    



})
let saltRound = 5;
userSchema.pre('save',function(next){
    bcrypt.hash(this.password,saltRound,(err,hashedPassword)=>{
        if (err) {
            console.log(`error in hashing password `)
            
        } else {
            this.password = hashedPassword
            next()
            
        }
    })
})
userSchema.methods.validatePassword = function(password,callback)
{
    bcrypt.compare(password,this.password,(err,same)=>{
        if (!err) {
            callback(err,same)
            
        } 
        else {
           next()
            
        }
    })
}
let userModel = mongoose.model("user_tb",userSchema)
module.exports=userModel
