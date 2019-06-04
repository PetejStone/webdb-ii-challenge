const express = require('express'); // importing a CommonJS module
const helmet = require('helmet');
const zooRouter = require('../zoos/zooRouter.js')
const bearsRouter = require('../bears/bearsRouter.js')
const server = express();

//global middleware
server.use(express.json());
server.use(helmet());
server.use(logger)

server.use('/api/zoos',  zooRouter);
server.use('/api/bears',  bearsRouter);

server.get('/', (req, res) => {
  res.status(200).json({messageOfTheDay: 'Hello World'})
});

function logger(req, res, next) {
  console.log(`${req.method} was requested at ${req.url} on [${new Date().toISOString()}]`)
  next();
};



module.exports = server;