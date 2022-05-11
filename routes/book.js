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
                message: ' Book Created Successfully',
                book: createdBook
            })
        }
    })
})

// list all books  
router.get('/', (req, res) =>{
    Book.find((error, Book) => {
        if(error){
            console.log(error)
            res.status(400).json({error: "an error has occurred"})
        } else {
            console.log("all books listed")
            res.status(200).json({books: Book})
        }
    })
})


// Update a book by id
router.put('/:id', (req, res) => {
   const id = req.params.id
   const updatedBook = req.body
   Book.updateOne({_id:id}, updatedBook, {new: true}, (error, updatedBook) => {
       if(error){
           res.status(404).json({message: error.message})
       } else {
           res.status(202).json(updatedBook)
       }
   })
})

// shows a book by id
router.get('/:id', (req, res) => {
   const id = req.params.id
   Book.findById(id, (error, Book) =>{
       if(error){
           res.status(404).json({message: error.message})
       } else {
           res.status(202).json(Book)
       }
   })
})

// delete a book by id
router.delete('/:id', (req, res) => {
   Book.deleteOne({ id: req.params.id}, (error, result) =>{
       if(error){
           console.error(error)
           res.status(404).json({error: "book not found"})
       } else {
           console.log("deleted book successfully")
           res.status(204).json({})
       }
   })
})
module.exports = router;