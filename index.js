const express = require('express');
const cors = require('cors');
const app = express();
const Port = process.env.Port || 5000;
require('dotenv').config();
const { MongoClient, ServerApiVersion } = require('mongodb');

app.use(cors());
app.use(express.json());


const uri = `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASSWORD}@cluster0.ea93pzh.mongodb.net/?retryWrites=true&w=majority`;
const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true, serverApi: ServerApiVersion.v1 });

async function run() {

    try{

    }
    finally{
        
    }
}
run().catch(error => console.error(error));


app.get("/", (req, res) => {
    res.send("Now server is running!");
});

app.listen(Port, () => {
    console.log(`server is running, ${Port}`);
});