const express = require("express");

const router = require("./routes/url");
const connectToMongoDB = require("./connection");

const app = express();
const PORT = 8001;

connectToMongoDB("mongodb://127.0.0.1:27017/short-url").then(()=>{
    console.log('connected to mongo')
});
app.use(express.json());
app.use("/url",router);



app.listen(PORT,()=> `Server started at port : ${PORT}`);