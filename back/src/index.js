//*Libraries
const express = require('express');
const bodyParser = require('body-parser');
require('dotenv').config(); 

//*Other imports
const router = require('./routes/restaurant.routes')

//*Creating app
const app = express();
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(router);

app.listen(process.env.PORT, () => {
    console.log(`Server running on port ${process.env.PORT}`)
})
