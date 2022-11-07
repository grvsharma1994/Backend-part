const express = require('express');
const { connection } = require('./config/db');
const { authentication } = require('./middlewares/authentication');
const { UserRouter } = require('./routes/UserRoutes');
const { TodoRouter } = require('./routes/TodosRoutes');
const app = express();
app.use(express.json());
require('dotenv').config();
const cors = require('cors');
app.use(cors());
app.get("/", (req, res) => {
    res.send("This is Our Homepage");
})
app.use("/",UserRouter);
app.use("/",TodoRouter);
app.listen(8000, async() => {
    try{
        await connection;
        console.log("Connection to DB successfully");
    }
    catch(err) {
        console.log("Error connecting to DB");
        console.log(err);
    }
    console.log("Listening on PORT 8000");
})