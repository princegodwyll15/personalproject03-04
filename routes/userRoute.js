const express = require('express');
const router = express.Router();
const { User } = require('../models/userModel');
const { userValidationRules, validate } = require('../validation/userValidate'); 
const { isAuthenticated } = require('../authenticate/authenticateUser'); 
const bcrypt = require('bcrypt');

// Create a new user
router.post('/users', userValidationRules(), validate, async (req, res) => {
    try {
        const existingUser = await User.findOne({ email: req.body.email });
        if (existingUser) return res.status(400).json({ error: "Email already in use" });

        const hashedPassword = await bcrypt.hash(req.body.password, 10);
        const newUser = new User({
            name: req.body.name,
            email: req.body.email,
            password: hashedPassword,
            age: req.body.age,
        });

        const savedUser = await newUser.save();
        res.status(201).json(savedUser);
    } catch (err) {
        res.status(400).json({ error: err.message });
    }
});

// Get a single user by ID
router.get('/users/:id', isAuthenticated, async (req, res) => {
    try {
        const singleUser = await User.findById(req.params.id);
        if (!singleUser) return res.status(404).json({ message: 'User not found' });
        res.status(200).json(singleUser);
    } catch (err) {
        res.status(400).json({ error: err.message });
    }
});

// Get all users
router.get('/users', isAuthenticated, async (req, res) => {
    try {
        const allUsers = await User.find();
        res.status(200).json(allUsers); 
    } catch (err) {
        res.status(400).json({ error: err.message });
    }
});

// Update a user
router.put('/users/:id', isAuthenticated, userValidationRules(), validate, async (req, res) => {
    try {
        let updateData = { ...req.body };

        // Hash password if it's being updated
        if (req.body.password) {
            updateData.password = await bcrypt.hash(req.body.password, 10);
        }

        const userToUpdate = await User.findByIdAndUpdate(req.params.id, updateData, { new: true });
        if (!userToUpdate) return res.status(404).json({ message: "User not found" });

        res.status(200).json(userToUpdate);
    } catch (err) {
        res.status(400).json({ error: err.message });
    }
});

// Delete a user
router.delete('/users/:id', isAuthenticated, async (req, res) => {
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
