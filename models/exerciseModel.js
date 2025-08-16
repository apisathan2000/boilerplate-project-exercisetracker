const mongoose = require("mongoose");

const exerciseSchema = mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },

    description: {
      type: String,
      required: true,
    },

    duration: {
      type: Number,
      required: true,
    },
    date: {
      type: Date,
    },
  },

  { timestamps: true }
);

const ExerciseModel = mongoose.model("Exercise", exerciseSchema);

module.exports = ExerciseModel;
