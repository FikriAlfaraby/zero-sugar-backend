const UserJourney = require("../models/userJourneyModel");

exports.getUserJourney = (req, res) => {
  const { id } = req.params;
  UserJourney.getUserJourneyOneMonth(id, (err, result) => {
    console.log(result);
    if (err) return res.status(500).json({ error: err.message });
    return res.status(200).json(result ?? null);
  });
};

exports.createUserJourney = (req, res) => {
  const { id } = req.params;
  const newJourney = req.body;
  UserJourney.createUserJourney(id, newJourney, (err) => {
    if (err) {
      return res.status(500).json({ error: err.message });
    }
    return res
      .status(201)
      .json({ message: "User journey created successfully" });
  });
};
