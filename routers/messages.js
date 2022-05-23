const router = require("express").Router();
const { createMessage, getMessagesByChatID } = require("../controllers/messages");

router.get("/:chatID", getMessagesByChatID)
router.post("/:chatID", createMessage);

module.exports = router;
