const express = require('express');
const cors = require('cors');
const { MongoClient, ServerApiVersion, ObjectId } = require('mongodb');
const port = process.env.PORT || 5000;
require('dotenv').config()

const app = express();

app.use(cors())
app.use(express.json())


// user store
// password 5xg4idBmIN95YwVN



const uri = `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASS}@cluster5.xu2ob.mongodb.net/?retryWrites=true&w=majority`;
const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true, serverApi: ServerApiVersion.v1 });
async function run() {
    try {
        await client.connect();

        const storeCollection = client.db("store").collection("product");

        app.get('/product', async (req, res) => {
            const query = {};
            const cursor = storeCollection.find(query);
            const products = await cursor.toArray();
            res.send(products);
        })

        app.get('/product/:id', async (req, res) => {
            const id = req.params.id;
            console.log(id);
            const query = { _id: ObjectId(id) };
            const result = await storeCollection.findOne(query);
            res.send(result)
        })

        app.post('/product', async (req, res) => {
            const newProduct = req.body;
            const result = await storeCollection.insertOne(newProduct);
            res.send(result);
        })
        app.delete('/product/:id', async (req, res) => {
            const id = req.params.id;
            const query = { _id: ObjectId(id) };
            const result = await storeCollection.deleteOne(query)
            res.send(result);
        })

    }
    finally {

    }
}
run().catch(console.dir)

app.get('/', (req, res) => {
    res.send('hello girl')
})

app.listen(port, () => {
    console.log('listening to port', port)
})
