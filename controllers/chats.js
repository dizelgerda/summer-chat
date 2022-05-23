const Chat = require("../models/chat");
const User = require("../models/user");

function getChats(req, res, next) {
  const userID = req.user;

  Chat.find({ members: { $in: [userID] } })
    .populate(['members'])
    .then((chats) => res.status(200).send([...chats]))
    .catch(next);
}

function createChat(req, res, next) {
  const { email } = req.body;
  const owner = req.user;

  User.findOne({ email })
    .then(({ _id: userID }) => {
      Chat.create({ members: [owner, userID] })
        .then((chat) => res.status(200).send(chat))
        .catch((e) => {
          if (e.name === "ValidationError") {
            const err = new Error("Данные невалидны");
            err.statusCode = 400;
            next(err);
          } else next(e);
        });
    })


}

function deleteChat(req, res, next) {
  const { chatID } = req.params;
  const owner = req.user;

  Chat.findById(chatID)
    .then((chat) => {
      if (!chat) {
        const err = new Error("Чат ненайден");
        err.statusCode = 404;
        throw err;
      }

      if (chat.members.includes(owner)) {
        chat
          .remove()
          .then(() => res.status(200).send({ message: "Чат удален" }))
          .catch(next);
      } else {
        const err = new Error("Нет прав для удаления");
        err.statusCode = 403;
        throw err;
      }
    })
    .catch((e) => {
      if (e.name === "CastError") {
        const err = new Error("ID невалиден");
        err.statusCode = 400;
        next(err);
      } else next(e);
    });
}

module.exports = {
  getChats,
  createChat,
  deleteChat,
};
