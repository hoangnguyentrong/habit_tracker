const {User, Habit} = require("../model/model");
const homeController ={
  showHomePage: async(req,res)=>{
    try {
    const userId = req.session.userId;
   
    if(!userId){
      return res.status(401).send('Unauthorized');
    }
      const habits = await Habit.find({'users.userId':userId});
      const today = new Date();
      const startOfDay = new Date(today.setHours(0, 0, 0, 0));
      const endOfDay = new Date(today.setHours(23, 59, 59, 999));

      const filteredHabits = habits.filter(habit => {
        if(!habit.endDate || new Date(habit.endDate) >= startOfDay){
          const filteredOccurrences = habit.occurrences.filter(occurrence => {
            return occurrence.date >= startOfDay && occurrence.date <= endOfDay;
          });
          habit.occurrences = filteredOccurrences;
          return true;
        }
      
        return false
        // return { ...habit.toObject(), occurrences: filteredOccurrences };
      });
      // .filter(habit => habit.occurrences.length > 0);

      res.render('homepage', { habits: filteredHabits });
      // console.log(userId);
      // console.log(habits);
      // res.render('homepage',{habits});
    } catch (error) {
      console.error("Error fetching habits:", error);
      res.status(500).json({ success: false, message: "Lỗi khi tải trang chủ" });
    }
  }
}
module.exports = homeController;