// helpers.js
const callback = (err, stmt) => {
  if (err) {
    console.error(
      "Failed to execute statement due to the following error: " + err.message
    );
  } else {
    console.log("Successfully executed statement: " + stmt.getSqlText());
  }
};

module.exports = { callback };
