// index.js
const express = require('express');
const axios = require('axios');
const cors = require('cors'); // To handle CORS issues
const app = express();
const port = 3001;

app.use(cors()); // Enable CORS for all routes
app.use(express.json());


const myHeaders = new Headers();
const username = "LEkZEmhPbdhDxjXO";
const password = "CCWSEXL7TRr8vfpYPSmEJ1gXJjWqLNHSKg9vvI7JUnzL8cMquwtY9EHE9pI8rw7A";

let saveCardHref;

//app.use(saveCardHref);

myHeaders.append("Content-Type", "application/vnd.worldpay.sessions-v1.hal+json");
myHeaders.append("Accept", "application/vnd.worldpay.sessions-v1.hal+json");
myHeaders.append("Authorization", "Basic " + btoa(`${username}:${password}`));

//public variables
//let cardHref;


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
      //cardHref = response.data["_links"]["sessions:session"]["href"];
      console.log("href in backend is " + response.data["_links"]["sessions:session"]["href"]);
      //app.set('cardHref', response.data["_links"]["sessions:session"]["href"]);

      saveCardHref = response.data["_links"]["sessions:session"]["href"];
      //nextAction();
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
      //console.log(JSON.stringify(response.data) + " at Express");
      //nextAction();
    })

    .catch((error) => {
      console.log(error);
    });

});

// 3. Create Verified Token -one time API
app.post('/api/worldpay/verifiedTokens', async (req, res) => {
    console.log("saveCardHref is " + saveCardHref);

    const axios = require('axios');
    
    let data = 
        {
            "description": "Token-Description",
            "paymentInstrument": {
                "type": "card/checkout",
                "cardHolderName": req.body.holdername,
                "sessionHref": saveCardHref,
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
        'Content-Type': 'application/vnd.worldpay.sessions-v1.hal+json', 
        'Accept': 'application/vnd.worldpay.sessions-v1.hal+json', 
        'Authorization': 'Basic ' + btoa(`${username}:${password}`)
      },
      data : data
    };
    
    await axios.request(config)
    .then((response) => {
      console.log(JSON.stringify(response.data) + " at Express");
      //nextAction();
    })

    .catch((error) => {
      console.log(error);
    });
});


app.listen(port, () => {
  console.log(`Server running at http://localhost:${port}`);
});
