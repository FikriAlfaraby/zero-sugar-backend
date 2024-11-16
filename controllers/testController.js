const db = require("../config/database");

exports.test = (req, res) => {
  db.execute({
    sqlText: "DELETE FROM user_journey WHERE ID_JOURNEY = ?",
    binds: [777],
    complete: (err, stmt) => {
      if (err) {
        console.log("Error deleting user profile: ", err);
        res.status(500).send({ message: err.message });
      } else {
        console.log("User profile deleted successfully");
        res.status(200).send({ message: "Success" });
      }
      return;
    },
  });
};
