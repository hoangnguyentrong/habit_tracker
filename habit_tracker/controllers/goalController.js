const { User, Habit } = require("../model/model");

const goalController = {
  getTarget: async(req,res)=>{
    try {
      const habitId = req.query.habit_id;
      const habit = await Habit.findById(habitId);
      if(!habit){
        res.status(404).send('Habit not found');
      return;
      }
      res.render('targetHabit', { habitData: habit });
    } catch (error) {
      
    }
    
  }
};

module.exports = goalController;
