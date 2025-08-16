const express = require("express");
const {
  createUser,
  createExercise,
} = require("../controllers/exerciseController");
const router = express.Router();

router.post("/", createUser);
router.post("/:id/exercises", createExercise);

module.exports = router;
