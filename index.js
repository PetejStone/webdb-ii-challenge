const express = require('express');
const helmet = require('helmet');
// const knex = require('knex');
const server = express();
const Zoos= require('./zoos/zoos-model.js')

// const knexConfig = {
//   client: 'sqlite3',
//   connection: {
//     filename: './data/lambda.db3'
//   },
//   useNullAsDefault: true
// }
// const db = knex(knexConfig)
server.use(express.json());
server.use(helmet());

// endpoints here
server.get('/api/zoos', (req, res) => {
  Zoos.find()
  .then(zoos => {
    res.status(200).json({zoos})
  })
  .catch(err => {
    res.status(500).json({message: err})
  })
})

server.get('/api/zoos/:id', async (req, res) => {
  const id = await Zoos.findById(req.params.id)
  //console.log(id.length)
  Zoos.findById(req.params.id)
  .then(zoo => {
    //console.log(`the length of the id is ${id.length}`)
    if (id.length !== 0) {
      res.status(200).json({zoo})
    } else {
      res.status(404).json({message: 'That zoo does not exist'})
    }
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
      res.status(404).json({message: 'Please provide content'})
    } else if (err.errno === 1) {
      res.status(404).json({message: 'Please provide a name'})
    } else {
      res.status(500).json({message: err})
    }
  })
})

server.delete('/api/zoos/:id', async (req, res) => {
  const id = await db('zoos').where({id: req.params.id})
  //console.log(id.length)
  db('zoos').where({id: req.params.id}).del()
  .then(zoo => {
    //console.log(`the length of the id is ${id.length}`)
    if (id.length !== 0) {
      res.status(200).json({message: 'You have deleted this item'})
    } else {
      res.status(404).json({message: 'That zoo does not exist'})
    }
  })
  .catch(err => {
    res.status(500).json({message: err})
  })
})

server.put('/api/zoos/:id', async (req, res) => {
  const id = await db('zoos').where({id: req.params.id})
  //console.log(id.length)
  db('zoos').where({id: req.params.id}).update(req.body)
  .then(zoo => {
    //console.log(`the length of the id is ${id.length}`)
    if (id.length !== 0) {
      res.status(200).json({zoo})
    } else {
      res.status(404).json({message: 'That zoo does not exist'})
    }
  })
  .catch(err => {
    console.log(err.errno)
    if (err.errno === undefined) {
      res.status(404).json({message: 'Please provide content'})
    } else if (err.errno === 1) {
      res.status(404).json({message: 'Please provide a name'})
    } else {
      res.status(500).json({message: err})
    }
  })
})

const port = 3300;
server.listen(port, function() {
  console.log(`\n=== Web API Listening on http://localhost:${port} ===\n`);
});
