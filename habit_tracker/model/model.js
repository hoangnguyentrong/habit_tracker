const mongoose = require("mongoose");

const usersSchema = new mongoose.Schema({
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
      habitId: { type: mongoose.Schema.Types.ObjectId, ref: "Habit" },
      habitName: {
        type: String,
      },
    },
  ],
});
const GoalPeriodSchema = new mongoose.Schema({
  value: {
    type: String,
    required: true,
  },
});
const typeHabitSchema = new mongoose.Schema({
  value: {
    type: String,
    required : true,
  },
});
const habitSchema = new mongoose.Schema({
  name_habit: {
    type: String,
    required: true,
    maxlength: 255,
  },
  users: [
    {
      userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
      },
      userName: {
        type: String,
      }, // Reference the User model
    },
  ],
  description: {
    type: String,
    required: true,
    maxlength: 255,
  },
  type_habit:{
    type: mongoose.Schema.Types.ObjectId,
    ref: "TypeHabit"
  },
  unit: {
    type: String,
    required: true,
    maxlength: 50,
  },
  goal_target: {
    type: Number,
    required: true,
  },
  goal_period: {
    type: mongoose.Schema.Types.ObjectId,
    required: true,
    ref: "GoalPeriod",
  },
  start_day: {
    type: Date,
    required: true,
  },
  end_day: {
    type: Date,
  },
});
const habitWeekDaySchema = new mongoose.Schema({
  habit_week_day_id: {
    type: Number,
    required: true,
    unique: true,
  },
  habit_id: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Habit",
  },
  day_of_week: {
    type: Number,
    required: true,
  },
});

const habitWeekOccurrenceSchema = new mongoose.Schema({
  habit_occurrence_id: {
    type: Number,
    required: true,
    unique: true,
  },
  habit_id: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Habit",
  },
  week_start_date: {
    type: Date,
    required: true,
  },
  day_of_week: {
    type: Number,
    required: true,
  },
});

const habitMonthDaySchema = new mongoose.Schema({
  habit_month_day_id: {
    type: Number,
    required: true,
    unique: true,
  },
  habit_id: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Habit",
  },
  day_of_month: {
    type: Number,
    required: true,
  },
});

const habitMonthOccurrenceSchema = new mongoose.Schema({
  habit_occurrence_id: {
    type: Number,
    required: true,
    unique: true,
  },
  habit_id: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Habit",
  },
  month_start_date: {
    type: Date,
    required: true,
  },
  day_of_month: {
    type: Number,
    required: true,
  },
});

const reminderSchema = new mongoose.Schema({
  reminder_id: {
    type: Number,
    required: true,
    unique: true,
  },
  label_habit: {
    type: String,
    required: true,
    maxlength: 255,
  },
  habit_id: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Habit",
  },
  reminder_time: {
    type: String, // using String for simplicity, could be Date or more complex time type
  },
});

const completedHabitSchema = new mongoose.Schema({
  completed_id: {
    type: Number,
    required: true,
    unique: true,
  },
  habit_id: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Habit",
  },
  completion_date: {
    type: Date,
  },
  progress: {
    type: Number,
    required: true,
  },
  complete_status: {
    type: String,
    required: true,
    maxlength: 50,
  },
});

let User = mongoose.model("User", usersSchema);
let GoalPeriod = mongoose.model("Period", GoalPeriodSchema);
let TypeHabit = mongoose.model("HabitType", typeHabitSchema)
let Habit = mongoose.model("Habit", habitSchema);
let HabitWeekDay = mongoose.model("HabitWeekDay", habitWeekDaySchema);
let HabitWeekOccurrence = mongoose.model(
  "HabitWeekOccurrence",
  habitWeekOccurrenceSchema
);
let HabitMonthDay = mongoose.model("HabitMonthDay", habitMonthDaySchema);
let HabitMonthOccurrence = mongoose.model(
  "HabitMonthOccurrence",
  habitMonthOccurrenceSchema
);
let Reminder = mongoose.model("Reminder", reminderSchema);
let CompletedHabit = mongoose.model("CompletedHabit", completedHabitSchema);

module.exports = {
  User,
  GoalPeriod,
  TypeHabit,
  Habit,
  HabitWeekDay,
  HabitWeekOccurrence,
  HabitMonthDay,
  HabitMonthOccurrence,
  Reminder,
  CompletedHabit,
};
