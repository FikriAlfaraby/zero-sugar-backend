const Feedback = require("../models/feedbackModel");

const feedbackController = {
  postFeedback: (req, res) => {
    const { idUser } = req.params; // idUser diambil dari parameter URL
    const { rating, category, feedback } = req.body;

    // Validasi input
    if (!idUser || !rating || !category || !feedback) {
      return res.status(400).json({ message: "All fields are required." });
    }

    // Buat feedback
    Feedback.createFeedback(
      parseInt(idUser),
      { rating, category, feedback },
      (err, result) => {
        if (err) {
          console.error(err);
          return res
            .status(500)
            .json({ message: "Failed to create feedback.", error: err });
        }
        res
          .status(201)
          .json({ message: "Feedback successfully created.", result });
      }
    );
  },
};

module.exports = feedbackController;
