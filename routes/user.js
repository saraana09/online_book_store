const express = require('express');
const router = express.Router();
const User = require('../models/Users')

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
                message: 'Created Successfully',
                user: createdUser
            })
        }
    })
})

module.exports = router;