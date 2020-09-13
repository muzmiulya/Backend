const router = require("express").Router();
const {
  registerUser,
  loginUser,
  patchUser,
  getAllUser,
  getUserById,
  deleteUser,
} = require("../controller/users");
const { authorization2 } = require("../middleware/auth");

router.post("/register", registerUser);
router.patch("/patch/:id", authorization2, patchUser);
router.post("/login", loginUser);
router.get("/user/", authorization2, getAllUser);
router.get("/user/:id", authorization2, getUserById);
router.delete("/delete/:id", authorization2, deleteUser);

module.exports = router;
