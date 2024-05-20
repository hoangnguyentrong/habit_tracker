const mongoose = require("mongoose");

const usersSchema = new mongoose.Schema({
  email_user:{
    type: String,
    require: true
  },
  name_user:{
    type: String,
    require: true,  
  },
  password_user:{
    type: String,
    require: true,
  },
  // kind:{
  //   type: Number,
  //   require: true,
  // }
})

const habitSchema = new mongoose.Schema({
  habit_id: {
    type: Number,
    required: true,
    unique: true
  },
  name_habit: {
    type: String,
    required: true,
    maxlength: 255
  },
  email_user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User'
  },
  description: {
    type: String,
    required: true,
    maxlength: 255
  },
  goal_type: {
    type: String,
    required: true,
    maxlength: 50
  },
  goal_target: {
    type: Number,
    required: true
  },
  goal_period: {
    type: String,
    required: true,
    maxlength: 50
  }
}, );


const habitWeekDaySchema = new mongoose.Schema({
  habit_week_day_id: {
    type: Number,
    required: true,
    unique: true
  },
  habit_id: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Habit'
  },
  day_of_week: {
    type: Number,
    required: true
  }
}, );


const habitWeekOccurrenceSchema = new mongoose.Schema({
  habit_occurrence_id: {
    type: Number,
    required: true,
    unique: true
  },
  habit_id: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Habit'
  },
  week_start_date: {
    type: Date,
    required: true
  },
  day_of_week: {
    type: Number,
    required: true
  }
}, );



const habitMonthDaySchema = new mongoose.Schema({
  habit_month_day_id: {
    type: Number,
    required: true,
    unique: true
  },
  habit_id: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Habit'
  },
  day_of_month: {
    type: Number,
    required: true
  }
},);



const habitMonthOccurrenceSchema = new mongoose.Schema({
  habit_occurrence_id: {
    type: Number,
    required: true,
    unique: true
  },
  habit_id: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Habit'
  },
  month_start_date: {
    type: Date,
    required: true
  },
  day_of_month: {
    type: Number,
    required: true
  }
}, );



const reminderSchema = new mongoose.Schema({
  reminder_id: {
    type: Number,
    required: true,
    unique: true
  },
  label_habit: {
    type: String,
    required: true,
    maxlength: 255
  },
  habit_id: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Habit'
  },
  reminder_time: {
    type: String // using String for simplicity, could be Date or more complex time type
  }
}, );



const completedHabitSchema = new mongoose.Schema({
  completed_id: {
    type: Number,
    required: true,
    unique: true
  },
  habit_id: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Habit'
  },
  completion_date: {
    type: Date
  },
  progress: {
    type: Number,
    required: true
  },
  complete_status: {
    type: String,
    required: true,
    maxlength: 50
  }
},);
let User = mongoose.model("User", usersSchema);
// module.exports = { User };
let Habit = mongoose.model('Habit', habitSchema)
// module.exports = {Habit};
let HabitWeekDay = mongoose.model('HabitWeekDay', habitWeekDaySchema);
// module.exports = {HabitWeekDay};
let HabitWeekOccurrence = mongoose.model('HabitWeekOccurrence', habitWeekOccurrenceSchema);
// module.exports = {HabitWeekOccurrence};
let HabitMonthDay = mongoose.model('HabitMonthDay', habitMonthDaySchema);
// module.exports = {HabitMonthDay};
let HabitMonthOccurrence = mongoose.model('HabitMonthOccurrence', habitMonthOccurrenceSchema);
// module.exports = {HabitMonthOccurrence};
let Reminder = mongoose.model('Reminder', reminderSchema);
// module.exports = {Reminder};
let CompletedHabit = mongoose.model('CompletedHabit', completedHabitSchema);
module.exports = {User, Habit, HabitWeekDay, HabitWeekOccurrence, HabitMonthDay, HabitMonthOccurrence, Reminder, CompletedHabit};
