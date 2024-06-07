const mongoose = require("mongoose");

// User Schema
const userSchema = new mongoose.Schema({
  email_user: {
    type: String,
    required: true,
  },
  name_user: {
    type: String,
    required: true,
  },
  password_user: {
    type: String,
    required: true,
  },
  habits: [
    {
      habitId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Habit",
      },
      habitName: {
        type: String,
        required: true,
      },
    },
  ],
});

// Habit Schema
// HabitType Schema
const habitTypeSchema = new mongoose.Schema({
  type: {
    type: String,
    required: true,
    enum: ["Build", "Quit"],
  },
  // type_name : {
  //   type: String,
  //   required : true,
  // }
});

// HabitPeriod Schema
const habitPeriodSchema = new mongoose.Schema({
  period: {
    type: String,
    required: true,
    enum: ["Day", "Week", "Month"],
  },
});

// Updated Habit Schema
const habitSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    maxlength: 255,
  },
  description: {
    type: String,
    required: true,
    maxlength: 255,
  },
  type: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "HabitType",
    required: true,
  },
  unit: {
    type: String,
    required: true,
    maxlength: 50,
  },
  goalTarget: {
    type: Number,
    required: true,
  },
  period: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "HabitPeriod",
    required: true,
  },
  startDate: {
    type: Date,
    required: true,
  },
  endDate: {
    type: Date,
  },
  reminders: [
    {
      label: {
        type: String,
        required: true,
        maxlength: 255,
      },
      time: {
        type: String,
      },
    },
  ],
  users: [
    {
      userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
        required: true,
      },
      userName: {
        type: String,
        required: true,
      },
    },
  ],
  occurrences: [
    {
      date: {
        type: Date,
        required: true,
      },
      progress: {
        type: Number,
        required: true,
      },
      status: {
        type: String,
        required: true,
        maxlength: 50,
      },
    },
  ],
});
const User = mongoose.model("User", userSchema);
const HabitType = mongoose.model("HabitType", habitTypeSchema);
const HabitPeriod = mongoose.model("HabitPeriod", habitPeriodSchema);
const Habit = mongoose.model("Habit", habitSchema);

module.exports = {
  User,
  Habit,
  HabitType,
  HabitPeriod,
};
