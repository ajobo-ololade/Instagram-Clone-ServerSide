const mongoose = require("mongoose")

const imageSchema =mongoose.Schema({
    image_url:{
        require:true,
        type:String,
    },
    userId:{
        require:true,
        type:String,

    }
    
})
let imageModel =mongoose.model('image_tb',imageSchema)
module.exports = imageModel