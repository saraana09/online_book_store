const express = require('express');
const router = express.Router();
const Author = require('../models/Authors')
const Book = require('../models/Books')



// Create a new author
router.post('/', (req, res) => {
    const authorData = req.body
    Author.create(authorData, (error, createdAuthor) =>{
        if(error){
            console.error(error);
            res.status(400).json({error: 'an error has occurred'})
        } else {
            console.log('created author successfully');
            res.status(201).json({
                message: 'Author Created Successfully',
                author: createdAuthor
            })
        }
    })
})

// list all authors  
router.get('/', (req, res) =>{
     Author.find((error, Author) => {
         if(error){
             console.log(error)
             res.status(400).json({error: "an error has occurred"})
         } else {
             console.log("all users listed")
             res.status(200).json({authors: Author})
         }
     })
 })


// Update an author by id
router.put('/:id', (req, res) => {
    const id = req.params.id
    const updatedAuhtor = req.body
    Author.updateOne({_id:id}, updatedAuhtor, {new: true}, (error, updatedAuhtor) => {
        if(error){
            res.status(404).json({message: error.message})
        } else {
            res.status(202).json(updatedAuhtor)
        }
    })
})

// shows an individual author by id
router.get('/:id', (req, res) => {
    const id = req.params.id
    Author.findById(id, (error, Author) =>{
        if(error){
            res.status(404).json({message: error.message})
        } else {
            res.status(202).json(Author)
        }
    })
})

// delete an user by id
router.delete('/:id', (req, res) => {
    Author.deleteOne({ id: req.params.id}, (error, result) =>{
        if(error){
            console.error(error)
            res.status(404).json({error: "auhtor not found"})
        } else {
            console.log("deleted author successfully")
            res.status(204).json({})
        }
    })
})

router.put('/book/:authorId/:bookId', (req, res) => {
    Author.updateOne ({ 
      _id: req.params.authorId 
    }, {
      $push: {
        Book: req.params.bookId 
      }
    }, (error, updatedAuhtor) => {
      if (error) {
        console.error(error);
        res.status(404).json({ 
          error: 'Author not found'
        });
      } else {
        Book.updateOne({ 
          _id: req.params.bookId 
        }, {
          $push: {
            books_author: req.params.bookId 
          }
        }, (error, updatedBook) => {
          if (error) {
            console.error(error); 
            res.status(404).json({
              error: 'Book not found'
            })
          } else {
            res.status(202).json({
              message: 'Successfully added in authors book'
            }) 
          }
        })
      }
    })
  })

module.exports = router;