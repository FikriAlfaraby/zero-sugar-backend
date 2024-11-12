// models/userModel.js
const db = require("../config/database");

const User = {
  getAllUsers: (callback) => {
    db.execute({
      sqlText: "SELECT * FROM users",
      complete: (err, stmt, rows) => {
        callback(err, rows);
      },
    });
  },

  getUserById: (id, callback) => {
    db.execute({
      sqlText: "SELECT * FROM users WHERE _id = ?",
      binds: [id],
      complete: (err, stmt, rows) => {
        callback(err, rows[0]);
      },
    });
  },

  createUser: (userData, callback) => {
    const { email, username, password, roles, is_active } = userData;

    if (!email) {
      const error = new Error("Error: Email Not Found!");
      if (callback) {
        callback(error, null);
        return;
      }
      return Promise.reject(error);
    }

    return new Promise((resolve, reject) => {
      db.execute({
        sqlText:
          "INSERT INTO users (email, username, password, roles, is_active, created_at, updated_at) VALUES (?, ?, ?, ?, ?, CURRENT_TIMESTAMP, CURRENT_TIMESTAMP)",
        binds: [email, username, password, roles, is_active],
        complete: (err, stmt, rows) => {
          if (err) {
            console.error("Failed to execute statement:", err.message);
            if (callback) callback(err, null);
            return reject(err);
          }

          console.log("Insert statement executed successfully");
          db.execute({
            sqlText:
              "SELECT _id, email, username, roles, is_active FROM users WHERE email = ?",
            binds: [email],
            complete: (err, stmt, rows) => {
              if (err) {
                if (callback) callback(err, null);
                return reject(err);
              }

              const newUser = rows[0];
              if (callback) {
                callback(null, newUser);
              } else {
                resolve(newUser);
              }
            },
          });
        },
      });
    });
  },

  updateUser: (id, userData, callback) => {
    const { email, username, password, roles, is_active } = userData;
    db.execute({
      sqlText:
        "UPDATE users SET email = ?, username = ?, password = ?, roles = ?, is_active = ?, updated_at = CURRENT_TIMESTAMP WHERE _id = ?",
      binds: [email, username, password, roles, is_active, id],
      complete: (err, stmt) => {
        callback(err, stmt);
      },
    });
  },

  deleteUser: (id, callback) => {
    db.execute({
      sqlText: "DELETE FROM users WHERE _id = ?",
      binds: [id],
      complete: (err, stmt) => {
        callback(err, stmt);
      },
    });
  },

  deleteAllUser: (callback) => {
    db.execute({
      sqlText: "DELETE FROM users",
      complete: (err, stmt) => {
        callback(err, stmt);
      },
    });
  },
};

module.exports = User;
