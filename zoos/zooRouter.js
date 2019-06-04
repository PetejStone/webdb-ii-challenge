// endpoints here

const Zoos = require('./zoos-model.js')
const express = require('express');
const router = express.Router();


router.get('/', (req, res) => {
    Zoos.find()
    .then(zoos => {
      res.status(200).json({zoos})
    })
    .catch(err => {
      res.status(500).json({message: err})
    })
  })
  
router.get('/:id', validateZooId, async (req, res) => {

    Zoos.findById(req.params.id)
    .then(zoo => {
        res.status(200).json({zoo})
    })
    .catch(err => {
        res.status(500).json({message: err})
    })
})
  
router.post('/', validatePost, (req,res) => {
    Zoos.add(req.body)
    .then(newItem => {    
        res.status(201).json({newItem})
    })
    .catch(err => {
     
        res.status(500).json({message: err})
        
    })
})
  
router.delete('/:id', validateZooId, async (req, res) => {
    Zoos.remove(req.params.id)
    .then(zoo => {

        res.status(200).json({message: 'You have deleted this item'})
    
    })
    .catch(err => {
        res.status(500).json({message: err})
    })
 })
  
router.put('/:id', validateZooId, validatePost, async (req, res) => { 
    Zoos.update(req.params.id, req.body)
    .then(zoo => {
        res.status(200).json({zoo})
    })
    .catch(err => {
        res.status(500).json({message: err})    
    })
})

  async function validateZooId( req, res, next) {
 
    const id = await Zoos.findById(req.params.id);
  if (id.length !== 0) {
    next()
  } else {
    res.status(400).json({message: "Invalid zoo id"})
  }
  };

  function validatePost(req, res, next) {
    const body = Object.keys(req.body);//converts object to array to get length
    const zoo = req.body;
    if (zoo && zoo.name) {
      next();
    }
    if (body.length <= 0)  {
      res.status(400).json({message: 'missing zoo data'})
    }
    if ( !zoo.name ) {
      res.status(400).json({message: 'missing required name field'})
    }
  };

  module.exports = router;