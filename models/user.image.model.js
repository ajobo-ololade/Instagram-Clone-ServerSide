const mongoose = require("mongoose")

const imageSchema =mongoose.Schema({
    image:String,
})
let imageModel =mongoose.model('image_tb',imageSchema)
module.exports = imageModel