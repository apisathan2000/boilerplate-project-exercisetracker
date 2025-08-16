const express = require("express");
const {
  createUser,
  createExercise,
  getExercise,
  getAllUsers
} = require("../controllers/exerciseController");
const router = express.Router();

router.post("/", createUser);
router.post("/:id/exercises", createExercise);
router.get("/" , getAllUsers)
router.get("/:id/logs", getExercise);

module.exports = router;
