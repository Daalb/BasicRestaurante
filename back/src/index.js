//*Libraries
const express = require('express');
const cors = require("cors");
const bodyParser = require('body-parser');
require('dotenv').config(); 

//*Other imports
const router = require('./routes/restaurant.routes')

//*Creating app
const app = express();
app.use(cors());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(router);

//*handling errors on endpoints
app.use((err, req, res, next) => { //*Se visistará cuando ocurra un error
    return res.status(500).json({
      status: "error",
      message: err.message,
    });
})

app.listen(process.env.PORT, () => {
    console.log(`Server running on port ${process.env.PORT}`)
})
