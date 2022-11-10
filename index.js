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
        const reviewCollection = client.db('picturesque').collection('reviews');

        //get limited 3 data from database 
        app.get('/home', async (req, res) => {
            const query = {}
            const cursor = serviceCollection.find(query)
            const services = await cursor.limit(3).toArray()
            res.send(services)
        })
        //this route will get all services data from data base
        app.get('/services', async (req, res) => {
            const query = {}
            const cursor = serviceCollection.find(query)
            const services = await cursor.toArray()
            res.send(services)
        })
        //this will for specification data card
        app.get('/services/:id', async (req, res) => {
            const id = req.params.id
            const query = { _id: ObjectId(id) }
            const service = await serviceCollection.findOne(query)
            res.send(service)
        })
        //this will post/create data in database 
        app.post('/services', async (req, res) => {
            const service = req.body
            const result = await serviceCollection.insertOne(service)
            res.send(result)
        })
        //this will get all reviews data from database for my reviews page
        app.get('/reviews', async (req, res) => {
            let query = {}
            if (req.query.email) {
                query = {
                    email: req.query.email
                }
            }
            const cursor = reviewCollection.find(query)
            const reviews = await cursor.toArray()
            res.send(reviews)
        })

        //this will get data for a service reviews page
        app.get('/review', async (req, res) => {
            let query = {}
            if (req.query.service) {
                query = {
                    service: req.query.service
                }
            }
            const cursor = reviewCollection.find(query)
            const reviews = await cursor.toArray()
            res.send(reviews)
        })
        //this will post/crest reviews in data base
        app.post('/reviews', async (req, res) => {
            const review = req.body
            const result = await reviewCollection.insertOne(review)
            res.send(result)
        })
        //this will delete data from data base
        app.delete('/reviews/:id', async (req, res) => {
            const id = req.params.id
            const query = { _id: ObjectId(id) }
            const result = await reviewCollection.deleteOne(query)
            res.send(result)

        })
        //this will edit review 
        app.patch('/reviews/:id', async (req, res) => {
            const id = req.params.id
            const newReview = req.body
            console.log(newReview)
            const query = { _id: ObjectId(id) }
            const updateDoc = {
                $set: {
                    newReview: newReview
                }
            }
            const result = await reviewCollection.updateOne(query, updateDoc)
            res.send(result)
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