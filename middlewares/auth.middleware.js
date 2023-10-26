const jwt = require("jsonwebtoken");

const auth = (req,res,next) => {

    const token = req.headers.authorization?.split(" ")[1];

    if(token) {
        jwt.verify(token, "puppy", (err,decoded) => {
            if(decoded) {
                // console.log(decoded);
                const { username, userID } = decoded;
                req.body.username = username;
                req.body.userID = userID;
                next();
            }
            else {
                res.send({"message": "Not authorized!"});
            }
        })
    }
    else {
        res.send({"error": "Please login to continue!"});
    }
}

module.exports = {
    auth
}