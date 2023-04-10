const router = require("express").Router();
const { login, logoff, createUser } = require("../controllers/users");

router.post("/signin", login);
router.post("/signout", logoff);
router.post("/signup", createUser);

router.use(require("../middlewares/auth"));

router.use("/users", require("./users"));
router.use("/chats", require("./chats"));
router.use("/messages", require("./messages"));
router.use(require("../middlewares/notFound"));

module.exports = router;
