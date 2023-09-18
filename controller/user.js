const UserService = require('../services/user');
require('dotenv').config();

let userService = new UserService();
const createUser = async (req, res) => {
  const user = req.body;

  if (!user.role) {
    user.role = 'user';
  }
  try {
    let addUser = await userService.createUser(user);

    if (addUser.role === 'user') {
      res
        .status(200)
        .json({ status: true, message: '  User created successfully!' });
    } else if (addUser.role === 'admin') {
      res
        .status(200)
        .json({ status: true, message: 'Admin created successfully!' });
    } else {
      res
        .status(200)
        .json({ status: true, message: 'Seller created successfully!' });
    }
  } catch (error) {
    res.status(404).json({ status: false, message: error.message });
  }
};


module.exports = {
  createUser,
};
