const {User, Habit} = require("../model/model");
const homeController ={
  showHomePage: async(req,res)=>{
    try {
    const userId = req.session.userId;
    if(!userId){
      return res.status(401).send('Unauthorized');
    }
      const habits = await Habit.find({'users.userId':userId});
      // console.log(userId);
      // console.log(habits);
      res.render('homepage',{habits});
    } catch (error) {
      console.error("Error fetching habits:", error);
      res.status(500).json({ success: false, message: "Lỗi khi tải trang chủ" });
    }
  }
}
module.exports = homeController;