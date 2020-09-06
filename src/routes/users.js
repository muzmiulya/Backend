const router = require("express").Router();
const { registerUser, loginUser, patchUser } = require("../controller/users");
const { authorization2 } = require("../middleware/auth");

router.post("/register", registerUser);
router.patch("/patch/:id", authorization2, patchUser);
router.get("/login", loginUser);

module.exports = router;
