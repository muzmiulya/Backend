const router = require("express").Router();
const {
  registerUser,
  loginUser,
  patchUser,
  getUserById,
} = require("../controller/users");
const { authorization2 } = require("../middleware/auth");

router.post("/register", registerUser);
router.patch("/patch/:id", authorization2, patchUser);
router.post("/login", loginUser);
router.get("/user/:id", authorization2, getUserById);

module.exports = router;
