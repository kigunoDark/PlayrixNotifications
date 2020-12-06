// Just a simple api witout a validation
const sendgridTransport = require("nodemailer-sendgrid-transport");
const nodemailer = require("nodemailer");
const Notification = require("../model/notifications");

// Я не стал заморачиваться в плане env и приватности, потому что  так вам будет бытсрее проверять
const transporter = nodemailer.createTransport(
  sendgridTransport({
    auth: {
      api_key:
        "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",
    },
  })
);
exports.getNotifications = async (req, res) => {
  try {
    const notifications = await Notification.find();
    if (notifications.length > 0) {
      res.json(notifications);
    } else {
      res.json([]);
    }
  } catch (err) {
    console.log("err");
  }
};

exports.addNotification = async (req, res) => {
  try {
    const { event, date, status } = req.body;
    const note = { event, date, status };
    const newNote = await new Notification(note);
    await newNote.save();
    res.send(newNote);
  } catch (err) {
    console.log(err);
  }
};

exports.updeteAndSendNote = async (req, res) => {
  try {
    const _id = req.params.id;
    const updatedNote = await Notification.findOne({ _id });
    updatedNote.status = true;
    await Notification.updateOne({ _id }, updatedNote);
    const mailOptions = {
      from: "kigunos@yandex.ru",
      to: "krushenitskii@gmail.com ",
      subject: "Напоминание о предстоящем мероприятии!!!",
      text: `${updatedNote.event} - уже начался. Мы вас заждались, поторопитесь, или нам придется начать без вас. `,
    };

    transporter.sendMail(mailOptions, function (error, info) {
      if (error) {
        console.log(error);
      } else {
        console.log("Email have sent!!");
      }
    });

    // Проверка для постмэна
    res.send(updatedNote);
  } catch (err) {
    console.log(err);
  }
};

exports.deleteNotification = async (req, res) => {
  try {
    const _id = req.params.id;
    const removedDate = await Notification.deleteOne({ _id });
    res.send(removedDate);
  } catch (err) {
    console.log(err);
  }
};
