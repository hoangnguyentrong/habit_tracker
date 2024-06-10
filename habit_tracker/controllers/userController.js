const { User, Habit } = require("../model/model");
// const habitController = require("./habitController");
const userController = {
  signup: async (req, res) => {
    try {
      const {name_user, email_user, password_user} = req.body;
      if (!name_user || !email_user || !password_user) {
        return res.status(400).send("Missing required fields");
      }
      if (password_user.length < 8) {
        return res.status(400).send("Password must be at least 8 characters long");
      }
      const hashedPassword = await bcrypt.hash(password_user, 10);
      console.log("Request Body:", req.body);
      const newUser = new User({
        name_user: name_user,
        email_user: email_user,
        password_user: hashedPassword,
      });
      const existingUser = await User.findOne({
        email_user: newUser.email_user,
      });
      
      if (existingUser) {
        return res.status(400).send("Email already exists");
      } else {
        await newUser.save();
        return res.redirect("/v1/user/login"); // Chuyển hướng sau khi đăng ký thành công
      }
    } catch (error) {
      return res.status(500).json(error);
    }
  },

  loginPage: (req, res) => {
    res.render('login');
},

login: async (req, res) => {
    try {
        const user = await User.findOne({ email_user: req.body.email_user });
        if (!user || user.password_user !== req.body.password_user) {
            return res.status(404).json("Email hoặc mật khẩu không đúng");
        }

        req.session.userId = user._id;
        req.session.userName = user.name_user;
  
        // Gọi hàm getAllHabit từ habitController với userId
        // const habits = await Habit.find({ "users.userId": user._id });

        // Chuyển hướng đến trang homepage và truyền danh sách thói quen
        // return res.render("homepage", { habits });
        req.session.userMail = user.email_user;
        return res.redirect("/v1/home")
        
      
       

    } catch (error) {
        console.error("Lỗi khi đăng nhập:", error);
        res.status(500).json({ success: false, message: "Lỗi khi đăng nhập" });
    }
},

renderProfilePage: async(req,res)=>{
  try {
  const userId = req.session.userId;
  if(!userId){
    return res.status(401).send('Unauthorized');
  }
    const habits = await Habit.find({'users.userId':userId});
    // console.log(userId);
    // console.log(habits);
    res.render('profile',{habits});
  } catch (error) {
    console.error("Error fetching habits:", error);
    res.status(500).json({ success: false, message: "Lỗi khi tải trang chủ" });
  }
},
logout: (req, res) => {
    req.session.destroy((err) => {
        if (err) {
            return res.status(500).json("Error logging out");
        }
        res.redirect("/v1/user/login");
    });
},

getAllUser: async (req, res) => {
    try {
      const users = await User.find();
      res.status(200).json(users);
    } catch (error) {
      res.status(500).json(error);
    }
  },
 renderUpdatePage: async(req,res)=>{
  try {
    const userId = req.session.userId;
    if(!userId){
      return res.status(401).send('Unauthorized');
    }
      // console.log(userId);
      // console.log(habits);
      const user = await User.findById(userId).lean();
      res.render('updateUser', {user});
    } catch (error) {
      console.error("Error fetching habits:", error);
      res.status(500).json({ success: false, message: "Lỗi khi tải trang chủ" });
    }
 },
  updateUser: async (req, res) => {
    try {
      const user = await User.findById(req.params.id);
      await user.updateOne({ $set: req.body });
      return res.redirect("/v1/home");
      // res.status(200).json("Update successfully");
    } catch (error) {
      res.status(500).json(error);
    }
  },
};

module.exports = userController;
