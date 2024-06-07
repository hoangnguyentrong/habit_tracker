const {User,Habit,HabitPeriod,HabitType} = require("../model/model");
const { updateProgress } = require("./goalController");

const habitController = {
  createHabitPage: async (req, res) => {
    try {
      const habitPeriods = await HabitPeriod.find();
      const habitTypes = await HabitType.find();
      console.log(habitPeriods);
      return res.render("createHabit",{habitPeriods,habitTypes});

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
      const newOccurrence = {
        date: new Date(), // Sử dụng ngày hiện tại
        progress: 0, // Khởi tạo progress là 0
        status: 'pending' // Trạng thái mặc định
      };

      const newHabit = new Habit({
        ...req.body,
        users: [{ userId: req.session.userId, userName: req.session.userName }],
        occurrences: [newOccurrence] // Thêm thông tin người dùng vào mảng users của habit
      });
      console.log(newOccurrence);
      const savedHabit = await newHabit.save();

      console.log("Tạo Habit thành công:", savedHabit);

      // console.log("Tạo Habit thành công:", savedHabit);

     
      // Tìm người dùng và cập nhật mảng habits
      const userUpdateResult = await User.findByIdAndUpdate(
        req.session.userId,
        {
          $addToSet: {
            habits: {
              habitId: savedHabit._id,
              habitName: savedHabit.name,
            },
          },
        },
        { new: true }
      );

      console.log("Cập nhật người dùng với Habit mới:", userUpdateResult);
      // const habits = await Habit.find({ "users.userId": req.session.userId });
      // return res.render("homepage", { habits });

      return res.redirect("/v1/home")
    } catch (error) {
      console.error("Lỗi khi tạo Habit:", error);
      res.status(500).json({ success: false, message: "Lỗi khi tạo Habit" });
    }
  },
  renderUpdateProgressPage : async(req,res)=>{
    const habitIdFromUrl = req.query.habit_id;

    try {
        // Tìm habit trong cơ sở dữ liệu dựa trên habitIdFromUrl
        const habit = await Habit.findById(habitIdFromUrl);

        if (habit) {
            // Nếu tìm thấy habit trong cơ sở dữ liệu, render trang update progress
            return res.render('updateProgress', { habit });
        } else {
            // Nếu không tìm thấy habit, hiển thị lỗi hoặc redirect về trang khác
            return res.status(404).send('Habit không tồn tại.');
        }
    } catch (error) {
        // Xử lý lỗi nếu có
        console.error('Lỗi khi tìm kiếm habit:', error);
        return res.status(500).send('Đã xảy ra lỗi khi tìm kiếm habit.');
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
  

};
module.exports = habitController;
