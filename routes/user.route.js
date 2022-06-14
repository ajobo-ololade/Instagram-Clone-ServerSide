const express= require('express')
const router = express.Router()
const userController = require("../controllers/user.controller")
router.get("/", userController.displayOne)
router.post('/signup',userController.displaySignup)
router.post("/signin",userController.displaySignin)
router.post('/uploads',userController.uploadFile)
module.exports= router