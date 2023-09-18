const userModel = require('../model/user');
require('dotenv').config();
const bcrypt = require('bcrypt');

class UserService {
  async createUser(userInfo) {
    const { password } = userInfo;
    const hashedPassword = await bcrypt.hash(userInfo.password, 10);
    userInfo.password = hashedPassword;
    console.log(userInfo.password, hashedPassword, 'new');
    try {
      console.log(userInfo, 'userinfo');
      if (!userInfo) {
        throw new Error('User details is required');
      }
      if (userInfo.role === 'user' || userInfo.role === 'admin') {
        const savedUser = await userModel.create(userInfo);
        return savedUser;
      } else if (userInfo.role === 'seller') {
        if (userInfo.address && userInfo.companyName) {
          const savedUser = await userModel.create(userInfo);
          return savedUser;
        } else {
          throw new Error('Address and Company Name Required');
        }
      } else {
        throw new Error('only user or seller or admin can be created');
      }
    } catch (error) {
      throw error;
    }
  }

}

module.exports = UserService;
