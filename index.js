// index.js
const express = require('express');
const axios = require('axios');
const cors = require('cors'); // To handle CORS issues
const app = express();
const port = 3001;
const connectDB = require("./db/connect");
const recordRoute = require("./routes/records");

app.use(cors()); // Enable CORS for all routes
app.use(express.json());
app.use("/api/v1/records", recordRoute);

const username = "LEkZEmhPbdhDxjXO";
const password = "CCWSEXL7TRr8vfpYPSmEJ1gXJjWqLNHSKg9vvI7JUnzL8cMquwtY9EHE9pI8rw7A";



//connecting to the DB
const start = async () =>{
    try {
        connectDB("mongodb+srv://bayerleverkusen680:wander5150@cluster0.whyme.mongodb.net/");
        console.log("connected to mongoDB")

        //const singleRecord = axios.get('http://localhost:3001/api/v1/records/' + 'shopper001');
        //console.log("value is " + singleRecord[uniqueid]);
    } catch (err){
        console.log(err)
    }
}

// 1. sessions/card API
app.post('/api/worldpay', async (req, res) => {
    const axios = require('axios');
    
    let data = 
        {
            "cardNumber": req.body.number,
            "cardExpiryDate": {
                "month": req.body.expiryMonth,
                "year": req.body.expiryYear
            },
            "cvc": req.body.cvv,
            "identity": "aea4cd9e-ecd8-4b13-bb33-a6baafa53409"
        }
    ;
    
    let config = {
      method: 'post',
      maxBodyLength: Infinity,
      url: 'https://try.access.worldpay.com/sessions/card',
      headers: { 
        'Content-Type': 'application/vnd.worldpay.sessions-v1.hal+json', 
        'Accept': 'application/vnd.worldpay.sessions-v1.hal+json', 
        'Authorization': 'Basic ' + btoa(`${username}:${password}`)
      },
      data : data
    };
    
    await axios.request(config)
    .then((response) => {
      //console.log(JSON.stringify(response.data) + " at Express");
      //href = response.data["_links"]["sessions:session"]["href"];

      //Sep22 add mongoDb
      
      try{
            axios.post("http://localhost:3001/api/v1/records", { session_href: response.data["_links"]["sessions:session"]["href"], uniqueid: req.body.uniqueid});
            return res.send(200,response.data);
            
        }catch(err){            
            console.log(err);
        }

    })

    .catch((error) => {
      console.log(error);
    });
});



// 2. sessions/payments/cvc API
app.post('/api/worldpay/cvc', async (req, res) => {
    const axios = require('axios');
    
    
    let data = 
        {
            "cvc": req.body.cvv,
            "identity": "aea4cd9e-ecd8-4b13-bb33-a6baafa53409"
        }
    ;
    
    let config = {
      method: 'post',
      maxBodyLength: Infinity,
      url: 'https://try.access.worldpay.com/sessions/payments/cvc',
      headers: { 
        'Content-Type': 'application/vnd.worldpay.sessions-v1.hal+json', 
        'Accept': 'application/vnd.worldpay.sessions-v1.hal+json', 
        'Authorization': 'Basic ' + btoa(`${username}:${password}`)
      },
      data : data
    };
    
    await axios.request(config)
    .then((response) => {
        return res.send(200,response.data);
      //console.log(JSON.stringify(response.data) + " at Express");
      //nextAction();
    })

    .catch((error) => {
      console.log(error);
    });

});

// 3. Create Verified Token -one time API
app.post('/api/worldpay/verifiedTokens', async (req, res) => {
    

    const axios = require('axios');

    //retrieve the session_href from MongoDB
    //let singleRecord;
    /*
    const showRecord = async () => {
      
        try{
            singleRecord = await axios.get(`http://localhost:3001/api/v1/records/${req.body.uniqueid}`);
            console.log(singleRecord);
        }catch(err){            
            console.log(err);
            }
    } */   
   console.log("sessionHref is : " + req.body.sessionHref);

    
    let data = 
        {
            "description": "Token-Description",
            "paymentInstrument": {
                "type": "card/checkout",
                "cardHolderName": req.body.holdername,
                "sessionHref": req.body.sessionHref,//ここにhrefを入れる,
                "billingAddress": {
                  "address1": "221BBakerStreet",
                  "address2": "Marylebone",
                  "address3": "Westminster",
                  "postalCode": "NW16XE",
                  "city": "London",
                  "state": "GreaterLondon",
                  "countryCode": "GB"
                }
              },
              "narrative": {
                "line1": "TheMindPalaceLtd",
                "line2": "Memory265-13-08-1876"
              },
              "merchant": {
                "entity": "default"
              },
              "verificationCurrency": "GBP",
              "namespace": "SHOPPER_ID_1234567890"
        }
    ;
    
    let config = {
      method: 'post',
      maxBodyLength: Infinity,
      url: 'https://try.access.worldpay.com/verifeidTokens/oneTime',
      headers: { 
        'Content-Type': 'application/vnd.worldpay.verified-tokens-v3.hal+json', 
        'Accept': 'application/vnd.worldpay.verified-tokens-v3.hal+json', 
        'Authorization': 'Basic ' + btoa(`${username}:${password}`)
      },
      data : data
    };
    
    await axios.request(config)
    .then((response) => {
        return res.send(200,response.data);
      //console.log(JSON.stringify(response.data) + " at Express");
      //nextAction();
    })

    .catch((error) => {
      console.log(error);
    });
});



app.listen(port, () => {
  console.log(`Server running at http://localhost:${port}`);
});

start();