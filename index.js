const express = require('express');
const cors = require('cors');
const morgan = require('morgan');
const server = express();
const port = 3000;


// Express takes all the info that the client added 
// to the body and makes it available as a nice JavaScript 
// object
// When we parse JSON, it means we are converting the string 
// into a JSON object 
// Parsing JSON means interpreting the data
server.use(express.json());
server.use(cors());
server.use(morgan());

server.use('/', (req, res) => {
    res.send('API is up and running')
});

server.listen(port, () => {
    console.log(`API is running at http://localhost:${port}`)
})