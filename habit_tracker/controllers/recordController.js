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
}

module.exports = recordController;