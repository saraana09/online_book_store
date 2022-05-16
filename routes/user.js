const express = require('express');
const router = express.Router();
const User = require('../models/Users')
const Book = require('../models/Books')

// Create a new user
router.post('/', (req, res) => {
    const userData = req.body
    User.create(userData, (error, createdUser) =>{
        if(error){
            console.error(error);
            res.status(400).json({
              error: 'an error has occurred'})
        } else {
            console.log('created user successfully');
            res.status(201).json({
                message: 'User Created Successfully',
                user: createdUser
            })
        }
    })
})



// list all users  
router.get('/', (req, res) =>{
     User.find((error, User) => {
         if(error){
             console.log(error)
             res.status(400).json({error: "an error has occurred"})
         } else {
             console.log("all users listed")
             res.status(200).json({users: User})
         }
     })
 })


// Update an user by id
router.put('/:id', (req, res) => {
    const id = req.params.id
    const updatedUser = req.body
    User.updateOne({_id:id}, updatedUser, {new: true}, (error, updatedUser) => {
        if(error){
            res.status(404).json({message: error.message})
        } else {
            res.status(202).json(updatedUser)
        }
    })
})

// shows an individual user by id
router.get('/:id', (req, res) => {
    const id = req.params.id
    User.findById(id, (error, User) =>{
        if(error){
            res.status(404).json({message: error.message})
        } else {
            res.status(202).json(User)
        }
    })

})

// delete an user by id
router.delete('/:id', (req, res) => {
    User.deleteOne({ id: req.params.id}, (error, result) =>{
        if(error){
            console.error(error)
            res.status(404).json({error: "user not found"})
        } else {
            console.log("deleted successfully")
            res.status(204).json({})
        }
    })
})

router.put('/cart/:userId/:bookId', (req, res) => {
    User.updateOne ({ 
      _id: req.params.userId 
    }, {
      $push: {
        cart: req.params.bookId 
      }
    }, (error, updatedUser) => {
      if (error) {
        console.error(error);
        res.status(404).json({ 
          error: 'User not found'
        });
      } else {
        Book.updateOne({ 
          _id: req.params.bookId 
        }, {
          $push: {
            cart_user: req.params.userId 
          }
        }, (error, updatedBook) => {
          if (error) {
            console.error(error); 
            res.status(404).json({
              error: 'Book not found'
            })
          } else {
            res.status(202).json({
              message: 'Successfully added in cart'
            }) 
          }
        })
      }
    })
  })




module.exports = router;