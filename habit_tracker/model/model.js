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
    rule_user: {
      type: Number,
      default: 0,  // Default value for regular users
      required: true,
    },
  });

  // Habit Schema


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
    reminderLabel: {
      type: String,
    },
    reminders: [
      {
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

  // Middleware to handle habit deletion

  const User = mongoose.model("User", userSchema);

  const HabitPeriod = mongoose.model("HabitPeriod", habitPeriodSchema);
  const Habit = mongoose.model("Habit", habitSchema);

  module.exports = {
    User,
    Habit,
    HabitPeriod,
  };
