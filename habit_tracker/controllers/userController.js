const { User } = require("../model/model");

const userController = {
  signup: async (req, res) => {
    try {
      console.log("Request Body:", req.body);
      const newUser = new User({
        name_user: req.body.name_user,
        email_user: req.body.email_user,
        password_user: req.body.password_user,
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
        return res.redirect("/homepage");
    } catch (error) {
        console.error("Lỗi khi đăng nhập:", error);
        res.status(500).json({ success: false, message: "Lỗi khi đăng nhập" });
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

  updateUser: async (req, res) => {
    try {
      const user = await User.findById(req.params.id);
      await user.updateOne({ $set: req.body });
      res.status(200).json("Update successfully");
    } catch (error) {
      res.status(500).json(error);
    }
  },
};

module.exports = userController;
