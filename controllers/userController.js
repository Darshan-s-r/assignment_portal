const User = require("../models/user");
const Admin = require("../models/admin");
const Assignment = require("../models/assignment");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

exports.registerUser = async (req, res) => {
    try {
        const { name, email, password } = req.body;
        const hashedPassword = await bcrypt.hash(password, 10);
        const user = new User({ name, email, password: hashedPassword });
        await user.save();
        res.status(201).json({ message: "User registered successfully" });
    } catch (err) {
        res.status(400).json({ error: err.message });
    }
};

exports.loginUser = async (req, res) => {
    try {
        const { email, password } = req.body;
        const user = await User.findOne({ email });
        if (!user || !(await bcrypt.compare(password, user.password))) {
            return res.status(401).json({ message: "Invalid credentials" });
        }
        const token = jwt.sign({ id: user._id, role: "user" }, process.env.JWT_SECRET);
        res.json({ token });
    } catch (err) {
        res.status(400).json({ error: err.message });
    }
};

exports.uploadAssignment = async (req, res) => {
    try {
        const { task, adminId } = req.body;
        const assignment = new Assignment({ userId: req.user.id, adminId, task });
        await assignment.save();
        res.status(201).json({ message: "Assignment uploaded successfully" });
    } catch (err) {
        res.status(400).json({ error: err.message });
    }
};

exports.getAdmins = async (req, res) => {
    try {
        const admins = await Admin.find({}, "name email");
        res.json(admins);
    } catch (err) {
        res.status(400).json({ error: err.message });
    }
};
