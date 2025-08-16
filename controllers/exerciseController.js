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

const getAllUsers = async function (req, res) {
  try {
    const users = await UserModel.find();

    return res.status(200).json({ users });
  } catch (error) {
    return res.status(500).json({ success: false, msg: error });
  }
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

const getExercise = async function (req, res) {
  const { id } = req.params;

  const { from, to, limit } = req.query;

  let userDoc;
  let userName;

  try {
    userDoc = await UserModel.findById(id);

    if (!userDoc) {
      return res
        .status(404)
        .json({ status: false, msg: `User ${id} not found !` });
    }

    if (userDoc) {
      userName = userDoc.username;
    }
  } catch (error) {
    return res.status(500).json({ status: false, msg: `${error}` });
  }

  if (userDoc) {
    try {
      let dateFilter = {};
      if (from) dateFilter.$gte = new Date(from);
      if (to) dateFilter.$lte = new Date(to);

      let query = { user: id };
      if (from || to) query.date = dateFilter;
      const exerciseDoc = await ExerciseModel.find(query).limit(
        Number(limit) || 0
      );

      if (exerciseDoc) {
        return res.status(200).json({
          username: userName,
          count: exerciseDoc.length,
          _id: exerciseDoc.id,
          log: exerciseDoc.map((ex) => ({
            description: ex.description,
            duration: ex.duration,
            date: ex.date.toDateString(),
          })),
        });
      }
    } catch (error) {}
  }

  return res.status(200).json({});
};

module.exports = { createUser, createExercise, getExercise, getAllUsers };
