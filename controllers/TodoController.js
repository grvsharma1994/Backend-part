const jwt = require('jsonwebtoken');
const { Todo } = require('../models/TodoModel');
const checkValidation = (req,res,next) => {
    let {taskName,status,tag } = req.body;
    console.log(typeof req.body.taskName);
    console.log(typeof req.body.status);
    console.log(typeof req.body.tag);
    if ((taskName && typeof (taskName) == "string") && (status && typeof (status) == "string") && (tag && typeof (tag) == "string")) {
        next();
    } else {
        res.send({ "msg": "Status Pending" });
    }
 }
 const getTodos = async (req, res) => {
    const { user_id } = req.body;
    const all_todos = await Todo.find({ user_id: user_id })
    res.send({ Todos: all_todos })
}
const postTodos = async (req, res) => {
    let {user_id,taskName,status,tag} = req.body;
    let newStatus = new Todo({user_id,taskName,status,tag});
    await newStatus.save();
    console.log(newStatus);
    res.send({ "msg": "Status Created Successfully"})
}
const patchTodos = async (req, res) => {
    let {user_id} = req.body;
    let {id} = req.params;
    console.log(id, user_id);
    let {taskName,status,tag } = req.body;
    await Todo.findOneAndUpdate({user_id,id},{taskName,status,tag});
    let updatedStatus = await Todo.find({ user_id,id});
    console.log(updatedStatus);
    res.send({ "msg": "Status Updated Successfully", updatedStatus: updatedStatus })
}
 const deleteTodos = async (req, res) => {
    let { user_id } = req.body;
    let { id } = req.params;
    console.log(id,user_id);
    const data = await Todo.findOneAndDelete({user_id,_id:id});
    await data;
    let remaining = await Todo.find({ user_id });
    console.log(remaining);
    res.send({ "msg": "Data Deleted Successfully", data: data, remaining: remaining })
}
module.exports = {getTodos,postTodos,patchTodos,deleteTodos,checkValidation};