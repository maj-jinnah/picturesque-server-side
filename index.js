const express = require('express');
const cors = require('cors');
const app = express();
const Port = process.env.Port || 5000;
require('dotenv').config();
const { MongoClient, ServerApiVersion, ObjectId } = require('mongodb');

app.use(cors());
app.use(express.json());


const uri = `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASSWORD}@cluster0.ea93pzh.mongodb.net/?retryWrites=true&w=majority`;
const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true, serverApi: ServerApiVersion.v1 });

async function run() {

    try {
        const serviceCollection = client.db('picturesque').collection('services');

        app.get('/services', async (req, res) =>{
            const query = {}
            const cursor  = serviceCollection.find(query)
            const services = await cursor.toArray()
            res.send(services)
        })
        app.get('/services/:id', async(req,res) =>{
            const id = req.params.id
            const query = {_id : ObjectId(id)}
            const service  = await serviceCollection.findOne(query)
            res.send(service)
        })
    }
    finally {

    }
}
run().catch(error => console.error(error));


app.get("/", (req, res) => {
    res.send("Now server is running!");
});

app.listen(Port, () => {
    console.log(`server is running, ${Port}`);
});