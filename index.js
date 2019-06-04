const express = require('express');
const helmet = require('helmet');
const knex = require('knex');
const server = express();


const knexConfig = {
  client: 'sqlite3',
  connection: {
    filename: './data/lambda.db3'
  },
  useNullAsDefault: true
}
const db = knex(knexConfig)
server.use(express.json());
server.use(helmet());

// endpoints here
server.get('/api/zoos', (req, res) => {
  db('zoos')
  .then(zoos => {
    res.status(200).json({zoos})
  })
  .catch(err => {
    res.status(500).json({message: err})
  })
})

server.post('/api/zoos', (req,res) => {
  db('zoos').insert(req.body, 'id')
  .then(newItem => {
    console.log(req.body.name.length)
      res.status(201).json({newItem})
  })
  .catch(err => {
    console.log(err.errno)
    if (err.errno === 19) {
      res.status(401).json({message: 'Please provide content'})
    } else if (err.errno === 1) {
      res.status(401).json({message: 'Please provide a name'})
    } else {
      res.status(500).json({message: err})
    }
  })
})

const port = 3300;
server.listen(port, function() {
  console.log(`\n=== Web API Listening on http://localhost:${port} ===\n`);
});
