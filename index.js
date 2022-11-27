const express = require('express');
const cors = require('cors');
const app = express()
require('dotenv').config()
const port = process.env.PORT || 5000

app.use(cors())
app.use(express.json())




const { MongoClient, ServerApiVersion, ObjectId } = require('mongodb');
const uri = `mongodb+srv://${process.env.USER}:${process.env.PASS}@cluster0.vljpuop.mongodb.net/?retryWrites=true&w=majority`;
const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true, serverApi: ServerApiVersion.v1 });


async function run(){
    try{
        const catagorisCollection = client.db('resaleCar').collection('catagories')
        const productsCollection = client.db('resaleCar').collection('products')
        const bookingsCollection = client.db('resaleCar').collection('bookings')
        const usersCollection = client.db('resaleCar').collection('users')
        const addproductsCollection = client.db('resaleCar').collection('addproducts')
        const advertiseCollection = client.db('resaleCar').collection('advertise')


        app.get('/catagories', async(req, res)=>{
            const query = {}
            const result = await catagorisCollection.find(query).toArray()
            res.send(result)
        })


        app.get('/products', async(req, res)=>{
            const query = {}
            const result = await productsCollection.find(query).toArray()
            res.send(result)
        })


        app.get('/products/:id', async(req, res)=>{
            const id = req.params.id 
            const query = {catagori: id}
            const result = await productsCollection.find(query).toArray()
            res.send(result)
        })



        app.post('/products', async(req, res)=>{
            const product = req.body 
            const result = await productsCollection.insertOne(product)
            res.send(result)
        })



        // app.delete('/products/:id', async(req, res)=>{
        //     const id = req.params.id 
        //     const filter = {_id: ObjectId(id)}
        //     const result = await productsCollection.deleteOne(filter)
        //     res.send(result)
        // })





        app.post('/addproducts', async(req, res)=>{
            const product = req.body
            
            const result = await addproductsCollection.insertOne(product)
            res.send(result)
        })




        app.get('/addproducts', async(req, res)=>{
            const email = req.query.email
            const filter = {email: email}
            const result = await addproductsCollection.find(filter).toArray()
            res.send(result)
        })



        app.delete('/addproducts/:id', async(req, res)=>{
            const id = req.params.id 
            const query = {_id: ObjectId(id)}
            const result = await addproductsCollection.deleteOne(query)
            res.send(result)
        })






        app.post('/bookings', async(req, res)=>{
            const car = req.body
            const result = await bookingsCollection.insertOne(car) 
            res.send(result)
        })





        // app.get('/bookings', async(req, res)=>{
        //     const query = {}
        //     const result = await bookingsCollection.find(query).toArray()
        //     res.send(result)
        // })

        app.get('/bookings', async(req, res)=>{
            const email = req.query.email 
            console.log(email)
            const query = {email: email}
            const result = await bookingsCollection.find(query).toArray()
            res.send(result)
        })




        // mora kora ata kora lagba

        app.get('/users/seller', async(req, res)=>{
            const query = {}
            const alluser = await usersCollection.find(query).toArray()
            const filter = alluser.filter(user => user.role === 'Seller')
            res.send(filter)
            
          })


        //   app.get('/users/:id', async(req, res)=>{
        //     const id = req.params.id
        //     const query = {_id: id}
        //     const result = await usersCollection.deleteOne(query)
        //     res.send(result)
            
        //   })



        //   ata o korta hoba mone kora

          app.get('/users/buyer', async(req, res)=>{
            const query = {}
            const alluser = await usersCollection.find(query).toArray()
            const filter = alluser.filter(user => user.role === 'Buyer')
            res.send(filter)
            
          })


          app.delete('/users/:id', async(req, res)=>{
            const id = req.params.id 
            const query = {_id: ObjectId(id)}
            const result = await usersCollection.deleteOne(query)
            res.send(result)
          })




        //   app.put('/users/:id', async(req, res)=>{
        //     const id = req.params.id 
        //     const filter = {_id: ObjectId(id)}
        //     const options = { upsert: true };
        //     const updatedDoc = {
        //         $set: {
        //           role: 'admin'
        //         }
        //       }

        //       const result = await usersCollection.updateOne(filter, updatedDoc, options)
        //       res.send(result)
            
        //   })






        // app.get('/users', async(req, res)=>{
        //     const query = {}
        //     const result = await usersCollection.find(query).toArray()
        //     res.send(result)
            
        //   })




        app.get('/users/admin/:email', async(req, res)=>{
            const email = req.params.email 
  
            const query = {email: email}
            const user = await usersCollection.findOne(query)
            res.send(user)
          })



        app.post('/users', async(req, res)=>{
            const user = req.body 
            const result = await usersCollection.insertOne(user)
            res.send(result)
        })




        app.post('/advertise', async(req, res)=>{
            const ad = req.body 
            const result = await advertiseCollection.insertOne(ad)
            res.send(result)
        })



        app.get('/advertise', async(req, res)=>{
            const query = {}
            const result = await advertiseCollection.find(query).toArray()
            res.send(result)
            
          })







       
        

    }
    finally{

    }
}

run().catch(e =>console.error(e))









app.get('/', (req,res)=>{
    res.send('hellow ')
})





app.listen(port, ()=>{
    console.log(`server is running ${port}`)
})


// https://stimg.cardekho.com/images/carexteriorimages/630x420/Honda/Amaze/8541/1629275024620/front-left-side-47.jpg?tr=w-456