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

myHeaders.append("Content-Type", "application/vnd.worldpay.sessions-v1.hal+json");
myHeaders.append("Accept", "application/vnd.worldpay.sessions-v1.hal+json");
myHeaders.append("Authorization", "Basic " + btoa(`${username}:${password}`));


// POST endpoint to forward requests to Worldpay
app.post('/api/worldpay', async (req, res) => {
    /*
  try {
    const response = await axios.post(
      'https://try.access.worldpay.com/sessions/card',
      req.body, // Forward the request body
      
      {
        headers: {
            'Content-Type': 'application/vnd.worldpay.sessions-v1.hal+json', 
    'Accept': 'application/vnd.worldpay.sessions-v1.hal+json', 
    'Authorization': 'Basic ' + btoa(`${username}:${password}`)
       
        },
      }
    );

    // Forward the response from Worldpay back to the client
    res.status(response.status).json(response.data);
    
  } catch (error) {
    // Handle any errors
    
    res.status(error.response ? error.response.status : 500).json({
      error: error.response ? error.response.data : 'An unexpected error occurred',
    });
  }*/
    const axios = require('axios');
    
    
    /*
    let data = JSON.stringify({
      "cardNumber": "4000000000001091",
    
      "cardExpiryDate": {
        "month": 5,
        "year": 2035
      },
      "cvc": "123",
      "identity": "aea4cd9e-ecd8-4b13-bb33-a6baafa53409"
    });*/

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

    console.info(data);

    
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
      console.log(JSON.stringify(response.data));
    })
    .catch((error) => {
      console.log(error);
    });
    


});

app.listen(port, () => {
  console.log(`Server running at http://localhost:${port}`);
});
