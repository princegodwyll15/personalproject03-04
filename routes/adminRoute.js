const express = require("express");
const router = express.Router();
const { adminDatabase }= require("../models/adminModel");
const { adminvalidationRules, validate } = require('../validation/adminValidate');
// POST /admin - Create a new admin
router.post("/admin", adminvalidationRules(), validate, async (req, res) => {
    try {
        const existingAdmin = await adminDatabase.findOne({ employeeId: req.body.employeeId });
        if (existingAdmin) {
            return res.status(400).json({ 
                status: "error", 
                message: "An admin with this employeeId already exists" 
            });
        }
        const newAdmin = new adminDatabase(req.body);
        const saveAdmin = await newAdmin.save();
        res.status(201).json({ status: "success", data: saveAdmin });
    } catch (err) {
        console.error({ error: err.message });
        res.status(400).json({ status: "error", message: err.message });
    }
});

// GET /admin - Fetch all admins
router.get('/admin', adminvalidationRules(), validate, async (req, res, next) => {
    try {
        const allAdmin = await adminDatabase.find();
        res.status(200).json({ status: "success", data: allAdmin });
    } catch (err) {
        console.error({ error: err.message });
        next(err);
    }
});

// GET /admin/:id - Fetch a single admin by ID
router.get('/admin/:id', adminvalidationRules(), validate, async (req, res, next) => {
    try {
        const singleAdmin = await adminDatabase.findById(req.params.id);
        if (!singleAdmin) {
            return res.status(404).json({ status: "error", message: "Admin not found" });
        }
        res.status(200).json({ status: "success", data: singleAdmin });
    } catch (err) {
        console.error({ error: err.message });
        next(err); 
    }
});

// DELETE /admin/:id - Delete an admin by ID
router.delete('/admin/:id', adminvalidationRules(), validate, async (req, res, next) => {
    try {
        const adminToDelete = await adminDatabase.findByIdAndDelete(req.params.id);
        if (!adminToDelete) {
            return res.status(404).json({ status: "error", message: "Admin not found" });
        }
        res.status(200).json({ status: "success", message: "Admin deleted successfully" });
    } catch (err) {
        console.error({ error: err.message });
        next(err); 
    }
});

router.put('/admin/:id', adminvalidationRules(), validate, async (req, res, next) => {
    try {
        const adminToUpdate = await adminDatabase.findByIdAndUpdate(req.params.id);
        if (!adminToUpdate) {
            return res.status(404).json({ status: "error", message: "Admin not found" });
        }
        res.status(200).json(adminToUpdate);
    } catch (err) {
        console.error({ error: err.message });
        next(err);
    }
});


module.exports = router;