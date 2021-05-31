const validator =  require('fastest-validator');
const bcryptjs = require('bcryptjs')
const jwt = require('jsonwebtoken');
const models = require('../models');

// signup User 
function signUp(req,res) {
    // checking user exist or not
    models.User.findOne({where:{email:req.body.email}}).then(result => {
        // show error if user exist sotherwise enter the data into the table,
        if (result) {
            res.status(200).json({
                message:"Email already Exists",
            });
        }else{
            // hashing the password
            bcryptjs.genSalt(10,function(err,salt){
                bcryptjs.hash(req.body.password, salt, function(err,hash){
                    let userInputs = {
                        name: req.body.name,
                        email: req.body.email,
                        password: hash
                    };
                    // creating user, making entry to DB table 
                    models.User.create(userInputs).then(result => {
                        res.status(200).json({
                            message:"User resigtered successfully.",
                            data:result
                        });
                    }).catch(error => {
                        res.status(500).json({
                            message:"Something went wrong.",
                            data:error
                        });
                    });
                });
            });
        }
    }).catch(error => {
        res.status(500).json({
            message:"Something went wrong.",
            data:error
        });
    });
}

// login user
function login(req,res) {
    // checking user exists or not
    models.User.findOne({where:{email:req.body.email}}).then(user => {
        if (user === null) {
            res.status(201).json({
                message: "Invalide credendtials.",
                token:""
            });
        }else{
            // checking user password meching
            bcryptjs.compare(req.body.password, user.password, function(err,result){
                if (result) {
                    let token = jwt.sign({
                        email:req.body.email,
                    }, process.env.JWT_KEY, function(err, token){
                        res.status(200).json({
                            message: "Authentication successfull.",
                            token: token
                        });
                    });
                }else{
                    res.status(200).json({
                        message: "Invalide credendtials.",
                        token:''
                    });
                }
            });
        }
    }).catch(error => {
        res.status(500).json({
            message:"Something went wrong.",
            data:error
        });
    });
}

// user profile
function profile(req,res){
    models.User.findOne({where:{email:req.userData.email}}).then(user => {
        res.status(200).json({
            message:"User details.",
            data:user
        }); 
    }).catch(error => {
        res.status(500).json({
            message:"something went wrong.",
            data:''
        }); 
    });
}

module.exports = {
    signUp:signUp,
    login:login,
    profile:profile,
}