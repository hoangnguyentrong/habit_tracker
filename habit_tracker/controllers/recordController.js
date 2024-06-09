const {User, Habit} = require("../model/model");
const calculateCompletion = (habit) => {
  let numFinish = 0;
  habit.occurrences.forEach(occurrence => {
    if (occurrence.status === 'finish') {
      numFinish++;
    }
  });
  habit.numFinish = numFinish;
  return habit;
};
const recordController = {
  renderRecordPage: async(req,res)=>{
    try {
    const userId = req.session.userId;
    if(!userId){
      return res.status(401).send('Unauthorized');
    }
      let habits = await Habit.find({'users.userId':userId});
      habits = habits.map(calculateCompletion);

        const totalFinish = habits.reduce((sum, habit) => sum + habit.numFinish, 0);
        const totalHabits = habits.reduce((sum, habit) => sum + habit.occurrences.length, 0);

      res.render('recordPage', { habits, totalFinish, totalHabits });
    } catch (error) {
      console.error("Error fetching habits:", error);
      res.status(500).json({ success: false, message: "Lỗi khi tải trang chủ" });
    }
  },
  renderRecordDetailPage : async(req,res)=>{
    const habitIdFromUrl = req.query.habit_id;

    try {
        // Tìm habit trong cơ sở dữ liệu dựa trên habitIdFromUrl
        const habit = await Habit.findById(habitIdFromUrl);

        if (habit) {
            // Nếu tìm thấy habit trong cơ sở dữ liệu, render trang update progress
            return res.render('recordDetailHabit', { habit });
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
}

module.exports = recordController;