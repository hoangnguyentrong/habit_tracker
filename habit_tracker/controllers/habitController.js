const { User,GoalPeriod, Habit} = require("../model/model")
const habitController = {
  createHabitPage: async (req, res) => {
    try {
        const goalPeriods = await GoalPeriod.find();
        res.render('createHabit', { goalPeriods });
    } catch (error) {
        console.error("Lỗi khi tải trang tạo Habit:", error);
        res.status(500).json({ success: false, message: "Lỗi khi tải trang tạo Habit." });
    }
},
  createHabit: async (req, res) => {
    try {
        if (!req.session.userId) {
            return res.status(401).json({ success: false, message: "Không được phép" });
        }

        const newHabit = new Habit({
            ...req.body,
            email_user: req.session.userId // Sử dụng userId từ session
        });

        const savedHabit = await newHabit.save();
        console.log("Tạo Habit thành công:", savedHabit);

        // Tìm người dùng và cập nhật mảng habits
        const userUpdateResult = await User.findByIdAndUpdate(
            req.session.userId,
            { $push: { habits: savedHabit._id, habitName: savedHabit.name_habit } },
            { new: true }
        );
        console.log("Cập nhật người dùng với Habit mới:", userUpdateResult);

        return res.redirect("/homepage");
    } catch (error) {
        console.error("Lỗi khi tạo Habit:", error);
        res.status(500).json({ success: false, message: "Lỗi khi tạo Habit" });
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
