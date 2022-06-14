const userModel = require('../models/user.model')
const imageModel = require('../models/user.image.model')
const cloudinary = require('cloudinary')
cloudinary.config({
    cloud_name:process.env.CLOUD_NAME,
    api_key: process.env.API_KEY,
    api_secret:process.env.API_SECRET
});

const displayOne=((req, res)=>{
    res.send("I'm working")
})
const displaySignup = ((req, res) => {
    
    console.log(req.body)
    const newUser = req.body
    userModel.findOne({email:req.body.email}, (err, result) => {
        if (err) {
            console.log(`An ERROR OCCURED IN SIGNING UP`)

        } else {
            if (result) {
                console.log(`EMAIL ALREADY EXIST`)

            } else {
                userModel.findOne({username:req.body.username},(err,result)=>{
                    if (result) {
                        console.log(`USERNAME ALREADY EXIST`)
                        
                    } else {
                        const form = new userModel(newUser)
                        form.save((err) => {
                            if (err) {
                                console.log(`AN ERROR OCCURED `)
                                res.send({ message: `Sign Up failed please try again later`,status:false })
        
                            } else {
                                res.send({ message: `REGISTRATION SUCCESSFUL`,status:true })
        
        
                            }
                        })
                    }

                })
                // const form = new userModel(newUser)
                // form.save((err) => {
                //     if (err) {
                //         console.log(`AN ERROR OCCURED `)
                //         res.send({ message: `Sign Up failed please try again later`,status:false })

                //     } else {
                //         res.send({ message: `REGISTRATION SUCCESSFUL`,status:true })


                //     }
                // })

            }

        }
    })

})

const displaySignin=((req,res)=>{
    userModel.findOne({email:req.body.email, password:req.body.password},(err,result)=>{
        if (result) {
            res.send({message:"Welcome to your homepage", status:true,result})
            
        } else {
            res.send({message:"NOT FOUND"})
            
        }
        // result.map((check, i)=>{
        //     console.log(check)
        //     if (check) {
        //         console.log("user found")
        //         res.send({message:"Welcome to your homepage", status:"true"})
        //     } else{
        //         console.log(`user not found`)
        //         res.send({message:"Welcome to your homepage", status:"true"})
        //     }
        // })
    })

})
const uploadFile =(req,res)=>{
    const file = req.body.myfile
    
    cloudinary.v2.uploader.upload(file,(err,result)=>{
        if (err) {
            console.log(err)
            res.send({message:`UPLOAD FAILED`})
            
        } else {
            const form = new imageModel(result.secure_url)
            form.save((err)=>{
                if (err) {
                    console.log(`UNABLE TO SAVE`)
                    
                } else {
                    console.log(`SUCCESSFUL`)
                    res.send({message:`UPLOAD SUCCESSFUL`,image:result.secure_url})
                    
                }
            })
            console.log(result.secure_url)
           

            
            
        }
    })

}
module.exports = { displaySignup, displaySignin, displayOne,uploadFile}