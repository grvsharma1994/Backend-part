const mongoose = require("mongoose")
const todoSchema = new mongoose.Schema({
    taskName : {type : String, required : true},
    Status : {type : Boolean, required : true},
    tag : {type : String, required : true},
    userId : {type : String, required : true}
})
const TodoModel = mongoose.model("todo",todoSchema)
module.exports = {TodoModel};

