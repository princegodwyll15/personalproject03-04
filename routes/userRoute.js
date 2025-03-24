const express = require('express')
const router = express.Router();
const { User } = require('../models/userModel');
const { userValidationRules, validate } = require('../validation/userValiadate')


router.post('/users',userValidationRules(), validate, async (req,res) =>{
 try{
    const newUser = new User(req.body);
    const savedUser = await newUser.save()
    res.status(201).json(savedUser);
 }
 catch(err){
    res.status(400).json({error: err.message});
 }
});


router.get('/users/:id', async (req, res) => {
    try {
        const singleUser = await User.findById(req.params.id);
        if (!singleUser) return res.status(404).json({ message: 'User not found' });
        res.status(200).json(singleUser);
    } catch (err) {
        res.status(400).json({ error: err.message });
    }
});


   router.get('/users', async (req,res) =>{
    try{
       const allUser = await User.find();
       res.status(201).json(allUser);
    }
    catch(err){
       res.status(400).json({error: err.message});
    }
   });



   router.put('/users/:id', userValidationRules(), validate,async (req, res) => {
    console.log(req.params); 
    try {
        const userToUpdate = await User.findByIdAndUpdate(req.params.id, req.body, { new: true });
        if (!userToUpdate) return res.status(404).json({ message: "User not found" });
        res.status(200).json(userToUpdate);
    } catch (err) {
        res.status(400).json({ error: err.message });
    }
});         
+
router.delete('/users/:id', async (req, res) => {
    try {
        const userToDelete = await User.findByIdAndDelete(req.params.id);
        if (!userToDelete) {
            return res.status(404).json({ message: "User not found" });
        }
        res.status(200).json({ message: "User deleted successfully" });
    } catch (err) {
        res.status(400).json({ error: err.message });
    }
});


module.exports = router;