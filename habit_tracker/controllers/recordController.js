const {User, Habit} = require("../model/model");
const recordController = {
  renderRecordPage: async(req,res)=>{
    try {
    const userId = req.session.userId;
    if(!userId){
      return res.status(401).send('Unauthorized');
    }
      const habits = await Habit.find({'users.userId':userId});
      habits.forEach(async habit => {
        let numFinish = 0;
        habit.occurrences.forEach(occurrence => {
          if (occurrence.status === 'finish') {
            numFinish++;
          }
        });
        // Thêm thuộc tính numFinish vào mỗi thói quen
        habit.numFinish = numFinish;
      });
      res.render('recordPage',{habits});
    } catch (error) {
      console.error("Error fetching habits:", error);
      res.status(500).json({ success: false, message: "Lỗi khi tải trang chủ" });
    }
  },
}

module.exports = recordController;