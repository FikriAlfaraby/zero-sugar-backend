const userModel = require("../models/userModel");
const Clerk = require("@clerk/express");

const clerkClient = Clerk.createClerkClient({
  secretKey: process.env.CLERK_SECRET_KEY,
});

console.log(clerkClient);

exports.handleWebhook = async (req, res) => {
  const { type, data } = req.body;

  try {
    switch (type) {
      case "user.created":
        userModel.createUser(
          {
            email: data.email_addresses[0]?.email_address,
            username: data.username
              ? data.username
              : `${data.first_name} ${data.last_name}`,
            password: "",
            roles: "user",
            is_active: true,
          },
          async (err, newUser) => {
            if (err) {
              console.log(err);
            }
            try {
              const userClerkUpdate = await clerkClient.users.updateUser(
                data.id,
                {
                  publicMetadata: { id_user: newUser._ID },
                }
              );
              console.log("User updated in Clerk:", userClerkUpdate);
            } catch (error) {
              console.error("Error updating user in Clerk:", error);
            }
          }
        );
        break;

      case "user.updated":
        console.log("webhook update clerk");
        break;

      case "user.deleted":
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
