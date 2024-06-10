const {User,Habit,HabitPeriod,HabitType} = require("../model/model");


const habitController = {
  createHabitPage: async (req, res) => {
    try {
      const habitPeriods = await HabitPeriod.find();
      console.log(habitPeriods);
      return res.render("createHabit",{habitPeriods});

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
      let reminders = [];
      if (req.body.reminders) {
        if (Array.isArray(req.body.reminders)) {
          reminders = req.body.reminders.map(time => ({ time: time.toString() }));
        } else {
          reminders = [{ time: req.body.reminders.toString() }];
        }
      }
      const newOccurrence = {
        date: new Date(), // Sử dụng ngày hiện tại
        progress: 0, // Khởi tạo progress là 0
        status: 'pending' // Trạng thái mặc định
      };

      const newHabit = new Habit({
        ...req.body,
        reminders, 
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
  updateProgress : async(req,res)=>{
    const habitId = req.query.habit_id;

    const progress = req.body.progress;

    try {
        const habit = await Habit.findById(habitId);

        if (!habit) {
            return res.status(404).send('Habit không tồn tại.');
        }
        // Tính tổng progress của tất cả các occurrences
        let totalProgress = habit.occurrences.reduce((total, occurrence) => total + occurrence.progress, 0);

        // Cộng thêm giá trị mới từ người dùng nhập
        totalProgress += parseInt(progress);
        const currentDate = new Date();
        const localDate = new Date(currentDate.toLocaleString());
        
        let todayOccurrence = habit.occurrences.find(occurrence => {
            return occurrence.date.toDateString() === localDate.toDateString();
        });
        if (!todayOccurrence) {
            todayOccurrence = {
                date: localDate,
                progress: 0,
                status: 'pending'
            };
            habit.occurrences.push(todayOccurrence);
        }

        todayOccurrence.progress = totalProgress;
        todayOccurrence.status = (totalProgress >= habit.goalTarget) ? 'finish' : 'pending';

        await habit.save();
        return res.redirect(`/v1/habit/updateProgress?habit_id=${habitId}`);
    } catch (error) {
        console.error('Lỗi khi cập nhật progress:', error);
        return res.status(500).send('Đã xảy ra lỗi khi cập nhật progress.');
    }
  },
  resetProgress : async(req,res)=>{
    const habitId = req.query.habit_id;
    try {
        const habit = await Habit.findById(habitId);

        if (!habit) {
            return res.status(404).send('Habit không tồn tại.');
        }
        // Lấy ngày hiện tại
        const currentDate = new Date();
        const localDate = new Date(currentDate.toLocaleString());
         // Tìm occurrence cho ngày hiện tại
        let todayOccurrence = habit.occurrences.find(occurrence => {
            return occurrence.date.toDateString() === localDate.toDateString();
        });
        if (todayOccurrence) {
  
                // date: localDate,
                todayOccurrence.progress= 0,
                todayOccurrence.status= 'pending'
            // habit.occurrences.push(todayOccurrence);
        }


        await habit.save();
        // return res.send(`
        //   <script>
        //     window.location.href = window.location.href;
        //   </script>
        // `);
        return res.redirect(`/v1/habit/updateProgress?habit_id=${habitId}`);
        // return res.redirect("/v1/habit/updateProgress")
        // return res.status(200).send('Cập nhật progress thành công.');
    } catch (error) {
        console.error('Lỗi khi cập nhật progress:', error);
        return res.status(500).send('Đã xảy ra lỗi khi cập nhật progress.');
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
  renderEditHabitPage : async(req,res)=>{
    const habitIdFromUrl = req.query.habit_id;

    try {
        // Tìm habit trong cơ sở dữ liệu dựa trên habitIdFromUrl
        const habit = await Habit.findById(habitIdFromUrl);

        if (habit) {
            // Nếu tìm thấy habit trong cơ sở dữ liệu, render trang update progress
            return res.render('editHabit', { habit });
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
  editHabit: async (req, res) => {
    try {
      const habitId = req.query.habit_id;
      const habit = await Habit.findById(habitId);
      if (!habit) {
        return res.status(404).json("Habit not found");
      }
      await habit.updateOne({ $set: req.body });
      return res.redirect("/v1/home");
      // res.status(200).json("update successfully");
    } catch (error) {
      res.status(500).json(error);
    }
  },
  deleteHabit: async (req, res) => {
    try {
      const habitId = req.params.habit_id;
      const deletedHabit = await Habit.findByIdAndDelete(habitId);
      if (deletedHabit) {
        return res.redirect("/v1/home");
        // res.status(200).json("Deleted successfully!");
      } else {
        res.status(404).json("Habit not found!");
      }
    } catch (error) {
      res.status(500).json(error);
    }
  },
};
module.exports = habitController;
