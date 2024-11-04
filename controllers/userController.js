// controllers/userController.js
const User = require("../models/userModel");

exports.getAllUsers = (req, res) => {
  User.getAllUsers((err, users) => {
    if (err) return res.status(500).json({ error: err.message });
    res.status(200).json(users);
  });
};

exports.getUserById = (req, res) => {
  const { id } = req.params;
  User.getUserById(id, (err, user) => {
    if (err) return res.status(500).json({ error: err.message });
    res.status(200).json(user);
  });
};

exports.createUser = (req, res) => {
  const newUser = req.body;
  User.createUser(newUser, (err) => {
    if (err) return res.status(500).json({ error: err.message });
    res.status(201).json({ message: "User created successfully" });
  });
};

exports.updateUser = (req, res) => {
  const { id } = req.params;
  const updatedData = req.body;
  User.updateUser(id, updatedData, (err) => {
    if (err) return res.status(500).json({ error: err.message });
    res.status(200).json({ message: "User updated successfully" });
  });
};

exports.deleteUser = (req, res) => {
  const { id } = req.params;
  User.deleteUser(id, (err) => {
    if (err) return res.status(500).json({ error: err.message });
    res.status(200).json({ message: "User deleted successfully" });
  });
};
