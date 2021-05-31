const jwt = require('jsonwebtoken');

function checkAuth(req, res, next){
    try {
        let token = req.headers.authorization.split(" ")[1];
        let decodeToken = jwt.verify(token, process.env.JWT_KEY);
        req.userData = decodeToken;
        next();
    } catch (error) {
        return res.status(201).json({
            message:"Unauthorized user.",
            error:error
        });
    }
}

module.exports = {
    checkAuth:checkAuth
}