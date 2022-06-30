const userModel = require('../models/user.model')
const imageModel = require('../models/user.image.model')
const cloudinary = require('cloudinary')
const jwt = require("jsonwebtoken")
const JWT = process.env.JWT_SECRET
cloudinary.config({
    cloud_name:process.env.CLOUD_NAME,
    api_key: process.env.API_KEY,
    api_secret:process.env.API_SECRET
});
const displaynav=(req,res)=>{
    const token = req.headers.authorization.split(' ')[1]
    jwt.verify(token,JWT,(err,result)=>{
        if (err) {
            console.log(err)
            res.send({message: `unathorized`,status:false})
            
            
        } else {
            userModel.findOne({email:result.email},(err,userDetails)=>{
                if (err) {
                    res.status(501).send({status:false,message:`internal server error`})
                    
                } else {
                    res.send({status:true,message:`Valid`,userDetails,result})
                    
                }
            })
            
        }
    })

}

const displayOne=(req, res)=>{
    const token = req.headers.authorization.split(' ')[1]
    jwt.verify(token,JWT,(err,result)=>{
        if (err) {
            console.log(err)
            res.send({message: `unathorized`,status:false})
            
            
        } else {
            userModel.findOne({email:result.email},(err,userDetails)=>{
                if (err) {
                    res.status(501).send({status:false,message:`internal server error`})
                    
                } else {
                    res.send({status:true,message:`Valid`,userDetails,result})
                    
                }
            })
            
        }
    })
    
   
    
}
const displaySignup = ((req, res) => {
    
    console.log(req.body)
    const newUser = req.body
    userModel.findOne({email:req.body.email}, (err, result) => {
        if (err) {
            console.log(`An ERROR OCCURED IN SIGNING UP`)

        } else {
            if (result) {
                res.send({message:`Email already exist`,status:false})
                console.log(`EMAIL ALREADY EXIST`)

            } else {
                userModel.findOne({username:req.body.username},(err,result)=>{
                    if (result) {
                        console.log(`USERNAME ALREADY EXIST`)
                        res.send({message:`Username already exist `,status:false})
                        
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
    const email = req.body.email
    const password = req.body.password 
    userModel.findOne({email:email},(err,user)=>{
        if (err) {
            res.status(501).send({message:`Server error`,status:false})
            
        } else {
            if (!user) {
                res.send({message:`NOT FOUND`,status:false})

                
            } else {
                user.validatePassword(password,(err,same)=>{
                    if (err) {
                        console.log(`ERROR in getting token`)
                        
                    } else {
                        if (same) {
                            const token = jwt.sign({email},JWT,{expiresIn:3600})
                            // console.log(token)
                            res.send({message:`CORRECT PASSWORD`,status:true,token,user})
                            
                        } else {
                            res.send({message:`INVALID PASSWORD`,status:false})
                            
                        }
                        
                    }
                })
                
            }
            
        }
    })
    
    // userModel.findOne({email:req.body.email, password:req.body.password},(err,result)=>{
    //     if (result) {
            
    //         res.send({message:"Welcome to your homepage", status:true,result})
            
    //     } else {
    //         res.send({message:"NOT FOUND"})
            
    //     }
      
    // })

})
const displayProfile =(req,res)=>{
    const token = req.headers.authorization.split(' ')[1]
    jwt.verify(token,JWT,(err,result)=>{
        if (err) {
            console.log(err)
            res.send({message: `unathorized`,status:false})
            
            
        } else {
            userModel.findOne({email:result.email},(err,userDetails)=>{
                if (err) {
                    res.status(501).send({status:false,message:`internal server error`})
                    
                } else {
                    res.send({status:true,message:`Valid`,userDetails,result})
                    
                }
            })
            
        }
    })

}
const uploadFile =(req,res)=>{
    const file = req.body.myfile
    const username = req.body.username
    const captions = req.body.captions
    
  
    
    cloudinary.v2.uploader.upload(file,(err,result)=>{
        if (err) {
            console.log(err)
            res.send({message:`UPLOAD FAILED`,status:false})
            
        } else {
            userModel.updateMany({username:username},{$push:{Post:{"image_url":result.secure_url,"caption":captions,"username":username}}},(err,result)=>{
                if (err) {
                    console.log(`Unable to save Post`)
                    res.send({message:`Upload Failed`,status:false})
                    
                } else {
                    res.send({message:`Upload Successful`,status:true,result})
                    
                }

            })
            console.log(result.secure_url)
                    
        }
    })

}
            

            // const form = new imageModel({image_url:result.secure_url,userId:req.body.id})
            // form.save((err)=>{
            //     if (err) {
            //         console.log(`UNABLE TO SAVE`)
                    
            //     } else {
            //         console.log(`SUCCESSFUL`)
            //         res.send({message:`UPLOAD SUCCESSFUL`,image:result.secure_url,status:true})
            //         // console.log(form)
                    
            //     }
            // })
            // console.log(result.secure_url)
           

            
    
const displayUpload = (req,res)=>{
    imageModel.find((err,result)=>{
        if (err) {
            console.log(`NO IMAGE FOUND`)
            res.send({message:"COULD NOT FIND ANY IMAGE",status:false})
            
        } else {
            res.send({message:"IMAGE FOUND",result,status:true})
            
        }
    })
}
module.exports = { displaySignup, displaySignin, displayOne,uploadFile,displayUpload,displayProfile,displaynav}