// endpoints here

const Bears = require('./bears-model.js')
const express = require('express');
const router = express.Router();


router.get('/', (req, res) => {
    //res.send('hello world')
    Bears.find()
    .then(bears => {
      res.status(200).json({bears})
    })
    .catch(err => {
      res.status(500).json({message: err})
    })
  })
  
router.get('/:id', validateBearId, async (req, res) => {

   Bears.findById(req.params.id)
    .then(bear => {
        res.status(200).json({bear})
    })
    .catch(err => {
        res.status(500).json({message: err})
    })
})
  
router.post('/', validatePost, (req,res) => {
    Bears.add(req.body)
    .then(newItem => {    
        res.status(201).json({newItem})
    })
    .catch(err => {
     
        res.status(500).json({message: err})
        
    })
})
  
router.delete('/:id', validateBearId, async (req, res) => {
    Bears.remove(req.params.id)
    .then(bear => {

        res.status(200).json({message: 'You have deleted this item'})
    
    })
    .catch(err => {
        res.status(500).json({message: err})
    })
 })
  
router.put('/:id', validateBearId, validatePost, async (req, res) => { 
    Bears.update(req.params.id, req.body)
    .then(bear => {
        res.status(200).json({bear})
    })
    .catch(err => {
        res.status(500).json({message: err})    
    })
})

  async function validateBearId( req, res, next) {
 
    const id = await Bears.findById(req.params.id);
  if (id.length !== 0) {
    next()
  } else {
    res.status(400).json({message: "Invalid bear id"})
  }
  };

  function validatePost(req, res, next) {
    const body = Object.keys(req.body);//converts object to array to get length
    const bear = req.body;
    if (bear && bear.name) {
      next();
    }
    if (body.length <= 0)  {
      res.status(400).json({message: 'missing bear data'})
    }
    if ( !bear.name ) {
      res.status(400).json({message: 'missing required name field'})
    }
  };

  module.exports = router;