const UserModel = require("../models/userModel");
const ExerciseModel = require("../models/exerciseModel");

const createUser = async function (req, res) {
  const { username } = req.body;
  let userDoc;

  try {
    userDoc = await UserModel.create({ username });

    if (!userDoc) {
      return res.status(500).json({ error: `User not created !` });
    }
  } catch (error) {
    console.log(`Error : ${error}`);
    return res.status(500).json({ error: `User not created !` });
  }

  return res
    .status(201)
    .json({ success: true, msg: `User created successfully !` });
};

const createExercise = async function (req, res) {
  const { id: userId } = req.params;

  const { description, duration, date } = req.body;

  let exerciseDoc;

  try {
    // Format date as yyyy-mm-dd for response
    const user = await UserModel.findById(userId);

    if (!user) {
      return res
        .status(400)
        .json({ success: false, error: `User not found !` });
    }

    // Parse and format date
    let exerciseDate;
    if (date) {
      exerciseDate = new Date(date);
      if (isNaN(exerciseDate)) {
        return res
          .status(400)
          .json({ success: false, error: "Invalid date format" });
      }
    } else {
      exerciseDate = new Date();
    }

    exerciseDoc = await ExerciseModel.create({
      user: userId,
      description: description,
      duration: duration,
      date: exerciseDate,
    });

    if (exerciseDoc) {
      return res.status(201).json({
        success: true,
        exercise: exerciseDoc,
      });
    }
  } catch (error) {
    return res.status(500).json({ success: false, error: error.message });
  }
};

module.exports = { createUser, createExercise };
