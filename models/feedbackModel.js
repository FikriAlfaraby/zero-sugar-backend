const db = require("../config/database");
const { callback } = require("../helpers/callback");

const Feedback = {
  createFeedback: (idUser, data, cb) => {
    const { rating, category, feedback } = data;

    db.execute({
      sqlText: `
        INSERT INTO feedback (id_user, rating, category, feedback, created_at, updated_at)
        VALUES (?, ?, ?, ?, CURRENT_DATE, CURRENT_DATE)
      `,
      binds: [idUser, rating, category, feedback],
      complete: (err, stmt) => {
        callback(err, stmt);
        cb(err, stmt);
      },
    });
  },
};

module.exports = Feedback;
