const Admin = require("../models/admin");
const Assignment = require("../models/assignment");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

exports.registerAdmin = async (req, res) => {
    try {
        const { name, email, password } = req.body;
        const hashedPassword = await bcrypt.hash(password, 10);
        const admin = new Admin({ name, email, password: hashedPassword });
        await admin.save();
        res.status(201).json({ message: "Admin registered successfully" });
    } catch (err) {
        res.status(400).json({ error: err.message });
    }
};

exports.loginAdmin = async (req, res) => {
    try {
        const { email, password } = req.body;
        const admin = await Admin.findOne({ email });
        if (!admin || !(await bcrypt.compare(password, admin.password))) {
            return res.status(401).json({ message: "Invalid credentials" });
        }
        const token = jwt.sign({ id: admin._id, role: "admin" }, process.env.JWT_SECRET);
        res.json({ token });
    } catch (err) {
        res.status(400).json({ error: err.message });
    }
};

exports.viewAssignments = async (req, res) => {
    try {
        const assignments = await Assignment.find({ adminId: req.user.id }).populate("userId", "name").select("task status createdAt");
        res.json(assignments);
    } catch (err) {
        res.status(400).json({ error: err.message });
    }
};

exports.acceptAssignment = async (req, res) => {
    try {
        await Assignment.findByIdAndUpdate(req.params.id, { status: "Accepted" });
        res.json({ message: "Assignment accepted" });
    } catch (err) {
        res.status(400).json({ error: err.message });
    }
};

exports.rejectAssignment = async (req, res) => {
    try {
        await Assignment.findByIdAndUpdate(req.params.id, { status: "Rejected" });
        res.json({ message: "Assignment rejected" });
    } catch (err) {
        res.status(400).json({ error: err.message });
    }
};
