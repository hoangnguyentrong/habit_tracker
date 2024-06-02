const { User, GoalPeriod, Habit,TypeHabit } = require("../model/model");

const habitController = {
  createHabitPage: async (req, res) => {
    try {
      const goalPeriods = await GoalPeriod.find();
      const typeHabits = await TypeHabit.find();
      res.render("createHabit", { goalPeriods, typeHabits });
    } catch (error) {
      console.error("Lỗi khi tải trang tạo Habit:", error);
      res
        .status(500)
        .json({ success: false, message: "Lỗi khi tải trang tạo Habit." });
    }
  },
  createHabit: async (req, res) => {
    try {
      if (!req.session.userId) {
        return res
          .status(401)
          .json({ success: false, message: "Không được phép" });
      }

      const newHabit = new Habit({
        ...req.body,
        users: [{ userId: req.session.userId, userName: req.session.userName }], // Thêm thông tin người dùng vào mảng users của habit
      });

      const savedHabit = await newHabit.save();
      console.log("Tạo Habit thành công:", savedHabit);
     
      // Tìm người dùng và cập nhật mảng habits
      const userUpdateResult = await User.findByIdAndUpdate(
        req.session.userId,
        {
          $addToSet: {
            habits: {
              habits: savedHabit._id,
              habitName: savedHabit.name_habit,
            },
          },
        },
        { new: true }
      );
      console.log("Cập nhật người dùng với Habit mới:", userUpdateResult);
      const habits = await Habit.find({ "users.userId": req.session.userId });
      return res.render("homepage", { habits });
    } catch (error) {
      console.error("Lỗi khi tạo Habit:", error);
      res.status(500).json({ success: false, message: "Lỗi khi tạo Habit" });
    }
  },
  getAllHabit: async (userId) => {
    try {
      if (!userId) {
        throw new Error("UserId là bắt buộc");
      }

      const habits = await Habit.find({ "users.userId": userId });
      return habits;
    } catch (error) {
      throw error;
    }
  },
  updateHabit: async (req, res) => {
    try {
      const habit = await Habit.findById(req.params.id);
      await habit.updateOne({ $set: req.body });
      res.status(200).json("update successfully");
    } catch (error) {
      res.status(500).json(error);
    }
  },
  deleteHabit: async (req, res) => {
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
  },
};
module.exports = habitController;
