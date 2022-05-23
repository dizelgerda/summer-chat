const router = require("express").Router();
const { createChat, deleteChat, getChats } = require("../controllers/chats");

router.post("/", createChat);
router.get("/", getChats);
router.delete("/:chatID", deleteChat);

module.exports = router;
