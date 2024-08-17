const express = require('express');
const cors = require('cors');
const path = require('path');
const bodyParser = require('body-parser');
const jwt = require('jsonwebtoken');
const sequelize = require('./util/database');


const app = express()


// Middleware to protect blocked by CORS policy
app.use(cors())

// Middleware to parse JSON request bodies
// app.use(express.json());
app.use(bodyParser.json({limit: "1000mb"}));
app.use(bodyParser.urlencoded({limit: "1000mb", extended: true, parameterLimit:200000}));


// Serve static files from the "public" directory
app.use(express.static(path.join(__dirname, 'public/browser')));


// require('./app/router/userRouter')(app);
require('./app/router/userRouter')(app);
require('./app/router/propertyRouter')(app);


// verify Token is valid
app.post('/verify-token', (req, res) => {    
    const token = req.body.token;    
    if (!token) {        
        res.send(JSON.stringify({ status: false }))
    }
    try {
        const verifyToken = jwt.verify(token, 'estatecorp');          
        if (verifyToken) {            
            res.send(JSON.stringify({ status: true }))
        }
    } catch (error) {        
        res.send(JSON.stringify({ status: false }))
    }
})



sequelize
.sync()
// .sync({force: true})


app.listen(3000, () => {
    console.log('listening on port 3000')
})