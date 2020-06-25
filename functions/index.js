const functions = require('firebase-functions');
const express = require('express');
const stripeloader = require("stripe");
const app = express();


const cors = require('cors')


app.use(cors())

const stripe=new stripeloader(functions.config().s.key)

// // Create and Deploy Your First Cloud Functions
 //https://firebase.google.com/docs/functions/write-firebase-functions
 const chargew=(id,amt)=>{
    stripe.charges.create({
      amount:parseInt(amt)*100,
      currency: "inr",
      source:id,
      description:'some des'
    })
  }

 app.post("/pay",async(req,res)=>{
    
    try{
        const result=await chargew(req.body.id,req.body.amount);
        console.log(result);
        res.send(result);
      }catch (e) {
        res.send(e)
      }
       
        
    
    
 })

 exports.widgets = functions.https.onRequest(app);

