const express = require("express");
const bcrypt = require("bcrypt");
const { userModel } = require("../model/user.model");
const jwt = require("jsonwebtoken");

const userRouter = express.Router();

userRouter.post("/register", (req,res) => {
    let {name, username, email, password} = req.body;

    try {
        bcrypt.hash(password, 5, async (err,hash) => {
            if(err) {
                res.status(200).send({"error": err.message})
            }
            else {
                const user = new userModel({
                    name,
                    username,
                    email,
                    password: hash
                })

                await user.save();
                res.status(200).send({"msg":"A new user has been registered", "registeredUser":user});
            }
        })
    }
    catch(err) {
        res.status(400).send({"error": err});
    }
})

userRouter.post("/login", async (req, res) => {

    const { email, password } = req.body;

    try {
        const user = await userModel.findOne({email});

        bcrypt.compare(password, user.password, (err,result) => {
            if(result) {
                const token = jwt.sign({username: user.username, userID:user._id}, "puppy")
                res.status(200).send({message: "Login successful!", "token": token});
            }
            else {
                res.status(200).send({"message": "Login failed! Invalid Credentials!"});
            }
        })
    }
    catch(err) {
        console.log(err);
        res.status(400).send({"error": err.message});
    }
})

module.exports = {
    userRouter
}