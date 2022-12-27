const db = require("../models");
const NotificationModel = db.notifications;

exports.getUnsentNotification = async (req, res) => {
  const today = new Date().toISOString().split("T")[0];
  let notification = await NotificationModel.findOne({
    sent: false,
    sentDate: today,
  }).exec();

  return res.status(200).send({
    message: "Here's your notification",
    data: notification,
  });
};
