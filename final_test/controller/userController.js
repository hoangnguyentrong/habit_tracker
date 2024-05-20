const {User, Habit, HabitWeekDay, HabitWeekOccurrence, HabitMonthDay, HabitMonthOccurrence, Reminder, CompletedHabit} = require("../model/model");
// const {router} = require("../routers/user");

const userController = {
  signupUser : async(req, res)=>{
    req.status(200).json(req.body);
    try {
      const newUser = new User(req.body);
      const saveUser = await newUser.save();
      res.status(200).json(saveUser);
    } catch (error) {
      res.status(500).json(err);
    }
  },
};

module.exports = userController;