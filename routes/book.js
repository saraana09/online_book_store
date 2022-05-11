const express = require('express');
const router = express.Router();
const Book = require('../models/Books');

// Create a new book
router.post('/', (req, res) => {
    const bookData = req.body
    Book.create(bookData, (error, createdBook) =>{
        if(error){
            console.error(error);
            res.status(400).json({
              error: 'an error has occurred'})
        } else {
            console.log('created book successfully');
            res.status(201).json({
                message: 'Created Successfully',
                user: createdBook
            })
        }
    })
})
// router.get('/', (req, res) => {

// })

// router.get('/:id', (req, res) => {

// })


// router.delete('/:id', (req, res) => {

// })

// router.put('/:id', (req, res) => {

// })
module.exports = router;