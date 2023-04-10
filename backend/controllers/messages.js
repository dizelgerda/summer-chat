const Message = require("../models/message");

function getMessagesByChatID(req, res, next) {
  const { chatID: chat } = req.params;

  Message.find({ chat })
    .populate(["owner"])
    .then((messages) => res.status(200).send(messages))
    .catch(next);
}

function createMessage(req, res, next) {
  const { chatID: chat } = req.params;
  const { text } = req.body;
  const owner = req.user;

  Message.create({ text, chat, owner })
    .then((message) => res.status(200).send(message))
    .catch((e) => {
      if (e.name === "ValidationError") {
        const err = new Error("Данные невалидны");
        err.statusCode = 400;
        next(err);
      } else next(e);
    });
}

module.exports = {
  createMessage,
  getMessagesByChatID,
};
