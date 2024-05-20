const { User, Habit, HabitWeekDay, HabitWeekOccurrence, HabitMonthDay, HabitMonthOccurrence, Reminder, CompletedHabit } = require("../model/model");

const userController = {
  
  signup: async (req, res) => {
    
      const data = {
        email_user: req.body.email_user,
        name_user:req.body.name_user,
        password_user: req.body.password_user,
      }
      const existingUser = await User.findOne({email_user: data.email_user});
      if(existingUser){
        res.send("email had exist");

      }else{
        const saveUser = await User.insertMany(data);
        res.send(saveUser );
        res.send("register success")
      }
      
      
    
  },
  login: async (req, res) => {
    try {
      const user = await User.find({email_user: req.body.email_user });
      if (!user) {
        return res.status(404).json("User not found");
      }
      // Thực hiện kiểm tra mật khẩu và các bước đăng nhập khác ở đây
      res.status(200).json("login successful");
    } catch (error) {
      res.status(500).json(error);
    }
  },
  logout : async (req,res)=>{
    res.status(200).json("");
  },

  getAllUser: async (req, res) => {
    try {
      const users = await User.find();
      res.status(200).json(users);
    } catch (error) {
      res.status(500).json(error); // Ensure the error variable is used correctly
    }
  },

};

module.exports = userController;
