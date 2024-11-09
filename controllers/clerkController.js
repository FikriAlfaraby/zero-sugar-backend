const userModel = require("../models/userModel");

exports.handleWebhook = async (req, res) => {
  const { type, data } = req.body;

  try {
    switch (type) {
      case "user.created":
        await userModel.createUser({
          email: data.email_addresses[0]?.email_address,
          username: data.username
            ? data.username
            : `${data.first_name} ${data.last_name}`,
          password: "",
          roles: "user",
          is_active: true,
        });
        break;

      case "user.updated":
        await userModel.updateUser(data.id, {
          email: data.email_addresses[0]?.email_address,
          username: data.username,
          roles: data.public_metadata?.roles || "user",
          is_active: data.status === "active",
        });
        break;

      case "user.deleted":
        await userModel.deleteUser(data.id);
        break;

      case "email.created":
        console.log("New email created:", data.email_address);
        break;

      default:
        console.log(`Unhandled event type: ${type}`);
    }

    res.status(200).send("Webhook processed");
  } catch (error) {
    console.error("Error processing webhook", error);
    res.status(500).send("Error processing webhook");
  }
};
