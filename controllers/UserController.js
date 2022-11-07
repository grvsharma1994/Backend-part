require('dotenv').config();
const { User } = require('../models/UserModel');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const signUpUser = async (req,res) =>{
 let {name,email,password } = req.body;
    const isUser = await User.findOne({email})
    if (isUser) {
        res.send({"msg":"User already exists please try logging in" })
    }
    else {
    bcrypt.hash(password,5,async (err,hash) => {
    let newUser = new User({
    name,
    email,
    password: hash
    })
   try {
    await newUser.save()
    res.send({"msg":"Sign up successfully" })
    }
    catch (err) {
   res.send({"msg":"Something went wrong, please try again later " })
    }
    })
    }
  }
const loginUser = async (req,res) =>{
    let {email,password} = req.body;
    console.log(email,password);
    let user = await User.findOne({email});
    let hash = user.password;
    const user_id = user._id;
    bcrypt.compare(password,hash,async (err,result) => {
        if (err) {
            res.send({ "msg":"Something went wrong please try again later"})
        }
        if(result){
            const token = jwt.sign({user_id}, process.env.SECRET_KEY);
            res.send({message :"Login successfully",token})

        }
        else{
            res.send({"msg" : "Login failed"})
        }
    });
}
module.exports = {signUpUser,loginUser}