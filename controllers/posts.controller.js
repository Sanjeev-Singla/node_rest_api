const validator = require('fastest-validator')
const models = require('../models'); 

function index(req,res){
    models.Post.findAll().then(result => {
        res.status(200).json({
            message:"Posts details.",
            post:result
        });
    }).catch(error => { 
        res.status(500).json({
            message:"Something went wrong.",
            post:error
        });
    });
}

function create(req,res) {
    let postInputs = {
        title:      req.body.title,
        content:    req.body.content,
        imageURL:   req.body.image_url,
        categoryId: req.body.category_id,
        userId:     1
    }

    let schema = {
        title: {type:"string", optional:false, max:"100"},
        content: {type:"string", optional:false, max:"500"},
        categoryId: {type:"number", optional:false}
    }

    let v = new validator();
    let validationResponse = v.validate(postInputs,schema);

    if (validationResponse !== true) {
        return res.status(201).json({
            message:"validation failed",
            errors:validationResponse
        });
    }

    models.Post.create(postInputs).then(result => {
        res.status(200).json({
            message:"Post is created successfully.",
            post:result
        });
    }).catch(error => { 
        res.status(500).json({
            message:"Something went wrong.",
            post:error
        });
    });
}

function show(req,res) {
    let postId = req.body.postId;

    models.Post.findByPk(postId).then(result => {
        res.status(200).json({
            message:"Post Details.",
            post:result
        });
    }).catch(error => {
        res.status(500).json({
            message:"Something went wrong.",
            post:error
        });
    });
}


function update(req,res) {
    // data to update
    let postId = req.body.post_id;
    let postUpdateInputs = {
        title:      req.body.title,
        content:    req.body.content,
        imageURL:   req.body.image_url,
        categoryId: req.body.category_id,
        userId:     1
    };
    // validations
    let schema = {
        title: {type:"string", optional:false, max:"100"},
        content: {type:"string", optional:false, max:"500"},
        categoryId: {type:"number", optional:false},
        postId: {type:"number", optional:false}
    }

    let v = new validator();
    let validationResponse = v.validate(postUpdateInputs,schema);

    if (validationResponse !== true) {
        return res.status(201).json({
            message:"validation failed",
            errors:validationResponse
        });
    }
    // Updatig the data
    models.Post.update(postUpdateInputs, {where:{id:postId}}).then(result => {
        res.status(200).json({
            message:"Post update successfully.",
            post:result
        });
    }).catch(error => {
        res.status(500).json({
            message:"Something went wrong.",
            post:error
        });
    });
}


function destroy(req,res){
    let postId = req.body.post_id;

    let deleletData = {
        postId: req.body.post_id
    };

    // validations
    let schema = {
        postId: {type:"number", optional:false}
    };

    let v = new validator();
    let validationResponse = v.validate(deleletData,schema);

    if (validationResponse !== true) {
        return res.status(201).json({
            message:"validation failed",
            errors:validationResponse
        });
    }

    models.Post.destroy({where:{id:postId}}).then(result => {
        if (result) {
            res.status(200).json({
                message:"Post update successfully.",
                post:true
            });
        }else{
            res.status(200).json({
                message:"Post is not available.",
                post:true
            });
        }
    }).catch(error => {
        res.status(500).json({
            message:"Something went wrong.",
            post:error
        });
    });
}

module.exports = {
    create: create,
    show: show,
    index: index,
    update: update,
    destroy: destroy,
}