const express = require('express')
const { MongoClient, ServerApiVersion, ObjectId } = require('mongodb');

const cors = require('cors');
 require("dotenv").config();

const port = process.env.PORT || 5000;
const app = express()

// middleware
app.use(cors());
app.use(express.json());  


  
 const uri = "mongodb+srv://service-review2:nZ93ZiSQe64_$!*@cluster0.lnoy20s.mongodb.net/?retryWrites=true&w=majority";
const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true, serverApi: ServerApiVersion.v1 });
  

 async function run() {
  try{
    const servicesCollection = client.db("serviceReview2").collection("services")
    const reviewCollection = client.db("serviceReview2").collection("review")

    app.get('/services', async(req, res) => {
      const query = {}
      const services = await servicesCollection.find(query).toArray();
      res.send(services)
    })
    app.get('/services3', async(req, res) => {
      const query = {}
      const services = await servicesCollection.find(query).limit(3).toArray();
      res.send(services)
    });

    app.get('/service/:id', async (req, res) => {
      const id = req.params.id
      const query = {_id: new ObjectId(id)}
      const service = await servicesCollection.find(query).toArray() 
      res.send(service)
    });

    app.post('/review', async (req, res) => {
      const review = req.body;
      const result = await reviewCollection.insertOne(review)
      res.send(result)
    });

    app.get('/reviewss', async(req, res) => {
       
      let query = {};
      if (req.query.titlle){
        query = {
          titlle : req.query.titlle
        }
      }
      const reviewss = await reviewCollection.find(query).toArray();
       res.send(reviewss)
    });

    app.get('/review', async(req, res) => {
      let query = {}
      console.log(req.query.email)
      if(req.query.email){
         query= {
          email: req.query.email
         }
      }
      const reviews = await reviewCollection.find(query).toArray();
      res.send(reviews)
    })

  }
  finally{
 
  }
}
run().catch(console.log)

app.get('/', async(req, res) => {
  res.send('service review2 running ')
})

app.listen(port, () => console.log( `service review2 running ${port}`))
