const router = require("express").Router();
const {
  getAllHistory,
  getHistoryById,
  postHistory,
  patchHistory,
  deleteHistory,
} = require("../controller/history");

router.get("/", getAllHistory);
router.get("/:id", getHistoryById);

router.post("/", postHistory);

router.patch("/:id", patchHistory);

router.delete("/:id", deleteHistory);

module.exports = router;
