const UserProfile = require("../models/userProfileModel");

exports.getUserProfileByIdUser = (req, res) => {
    const { id } = req.params;
    UserProfile.getUserProfile(id, (err, userProfile) => {
        if (err) return res.status(500).json({ error: err.message });
        return res.status(200).json(userProfile ?? null);
    });
};

exports.createUserProfile = (req, res) => {
    const { id } = req.params;
    const updatedData = req.body;
    console.log(updatedData)
    UserProfile.createUserProfile(id, updatedData, (err) => {
      if (err) return res.status(500).json({ error: err.message });
      res.status(200).json({ message: "User Profile updated successfully" });
    });
  };