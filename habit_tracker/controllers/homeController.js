const {User, Habit} = require("../model/model");
const homeController ={
  showHomePage: async(req,res)=>{
    try {
    const userId = req.session.userId;
   
    if(!userId){
      return res.status(401).send('Unauthorized');
    }

    const user = await User.findById(userId);
    if (!user) {
      return res.status(404).send('User not found');
    }
  // Check the user's rule_user value
  if (user.rule_user === 1) {
 
    const users = await User.find();
    // Admin user, redirect to admin homepage
    return res.render('homepageAdmin', { users });
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
      });
      res.render('homepage', { habits: filteredHabits });
    } catch (error) {
      console.error("Error fetching habits:", error);
      res.status(500).json({ success: false, message: "Lỗi khi tải trang chủ" });
    }
  },
  showUserDetail : async (req, res) => {
    try {
      const userId = req.query.userId;  // Get userId from query parameters
      console.log("Fetching details for user ID:", userId);
  
      if (!userId) {
        return res.status(400).send('User ID is required');
      }
  
      const user = await User.findById(userId).populate('habits.habitId');
  
      if (!user) {
        return res.status(404).send('User not found');
      }
  
      res.render('userDetail', { user });
    } catch (error) {
      console.error("Error fetching user details:", error);
      res.status(500).json({ success: false, message: "Error loading user details" });
    }
  },
}
module.exports = homeController;