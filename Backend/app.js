const express = require('express');
const bodyParser = require('body-parser');
const { connection } = require('./config/db');
const {router} = require("./routes/routes")
const cors = require('cors');
require("dotenv").config();
const app = express();
app.use(express.json());
app.use(bodyParser.json());
app.use(cors());

app.get('/' , (req,res) => {
    res.send("Welcome To Task Managent");
})
app.use("/api",router);
app.listen(process.env.PORT, async () => { 
    try {
        await connection;
        console.log('Connected to DB');
        
    } catch (error) {
        console.log(error.message);
        console.log('Not connection');
    }
    console.log(`server is running on port ${process.env.PORT}`);
    
})