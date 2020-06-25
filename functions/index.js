const functions = require('firebase-functions');
const express = require('express');
const stripeloader = require("stripe");
const app = express();


const cors = require('cors')


app.use(cors())

const stripe=new stripeloader(functions.config().s.key)

// // Create and Deploy Your First Cloud Functions
 //https://firebase.google.com/docs/functions/write-firebase-functions
const charge=(token,amount)=>{
    return stripe.paymentIntents.create({
        amount:parseInt(amount)*100,
        currency: 'inr',
        source:token,
        metadata: {integration_check: 'accept_a_payment'},
        description :" some des"
    })
}

 app.post("/pay",(req,res)=>{
    
      stripe.charges.charge(req.body.id,req.body.amount).then((data)=>{
       return res.send(data);
      }).catch((e)=>{

            res.send(e);
      })
       
        
    
    
 })

 exports.widgets = functions.https.onRequest(app);

