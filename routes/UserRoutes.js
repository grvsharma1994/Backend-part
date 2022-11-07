const express = require('express');
const {signUpUser,loginUser} = require('../controllers/UserController');
const UserRouter = express.Router();
UserRouter.use(express.json());
UserRouter.get("/");
UserRouter.post("/signup",signUpUser);
UserRouter.post("/login",loginUser);
module.exports = {UserRouter};