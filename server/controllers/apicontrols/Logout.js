const User = require("../../models/User");
const Logout = async (req, res) => {
  const { users } = req.body;
  for (let i = 0; i <= users.length - 1; i++) {
    await User.findOneAndDelete({ screen_name: users[i] });
  }
  res.send("done");
};

module.exports = { Logout };
