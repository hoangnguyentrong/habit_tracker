const {User, Habit, HabitWeekDay, HabitWeekOccurrence, HabitMonthDay, HabitMonthOccurrence, Reminder, CompletedHabit} = require("../model/model")
const habitController = {
  createHabit: async (req, res) => {
    try {
      const newHabit = new Habit(req.body)
     const saveHabit = await newHabit.save();
     if(req.body.User){
      const user = User.findById(req.body.User);
      await user.updateOne({$push:{habit: saveHabit._id}});
     }
     res.send(saveHabit);
      res.status(201).json({ success: true, habit: saveHabit });
    } catch (error) {
      console.error("Lỗi khi tạo thói quen mới:", error);
      res.status(500).json({ success: false, message: "Đã xảy ra lỗi khi tạo thói quen mới." });
    }
  },
  getAllHabit: async (req,res)=>{
    try {
      const habits = await Habit.find();
      res.send(habits);
    } catch (error) {
      res.status(500).json(error);
    }
  },
  updateHabit: async(req,res)=>{
    try {
      const habit = await Habit.findById(req.params.id);
      await habit.updateOne({$set: req.body});
      res.status(200).json("update successfully")
    } catch (error) {
      res.status(500).json(error);
    }
  },
   deleteHabit : async (req, res) => {
    try {
      const deletedHabit = await Habit.findByIdAndDelete(req.params.id);
      if (deletedHabit) {
        res.status(200).json("Deleted successfully!");
      } else {
        res.status(404).json("Habit not found!");
      }
    } catch (error) {
      res.status(500).json(error);
    }
  }
  
};
module.exports = habitController;
