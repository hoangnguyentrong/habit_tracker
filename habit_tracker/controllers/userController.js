const {User, Habit, HabitWeekDay, HabitWeekOccurrence, HabitMonthDay, HabitMonthOccurrence, Reminder, CompletedHabit } = require("../model/model");

const userController = {
  
  signup: async (req, res) => {
    const newUser = new User(req.body)
      const existingUser = await User.findOne({email_user: newUser.email_user});
      if(existingUser){
        res.send("email had exist");

      }else{
        const saveUser = await User.save();
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
  updateUser: async(req,res)=>{
    try {
      const user = await User.findById(req.params.id);
      await user.updateOne({$set: req.body});
      res.status(200).json("update successfully")
    } catch (error) {
      res.status(500).json(error);
    }
  }
};

module.exports = userController;
