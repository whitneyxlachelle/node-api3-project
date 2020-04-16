const express = require('express');
const logger = require('./middleware/logger');
const userRouter = require('./users/userRouter');
const postRouter = require("./posts/postRouter");

require('dotenv').config(); 
const server = express();
const port = process.env.PORT || 4000;

// Express takes all the info that the client added 
// to the body and makes it available as a nice JavaScript 
// object
// When we parse JSON, it means we are converting the string 
// into a JSON object 
// Parsing JSON means interpreting the data
server.use(express.json());
server.use(logger);

server.use('/users', userRouter);
server.use('/posts', postRouter);

server.use('/', (req, res) => {
    res.send('API is up and running')
});

server.listen(port, () => {
    console.log(`API is running at http://localhost:${port}`)
})