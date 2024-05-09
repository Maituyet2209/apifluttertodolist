const UserModel = require("../model/user.model");
const jwt = require("jsonwebtoken");

class UserServices {
  static async registerUser(email, password) {
    try {
      console.log("-----Email --- Password-----", email, password);

      const createUser = new UserModel({ email, password });
      return await createUser.save();
    } catch (error) {
      throw error;
    }
  }

  static async updateProfileUser(
    email,
    firstName,
    lastName,
    phoneNumber,
    address
  ) {
    try {
      console.log(
        "-----Info-----",
        email,
        firstName,
        lastName,
        phoneNumber,
        address
      );
      return await UserModel.findOneAndUpdate(
        { email },
        { firstName, lastName, phoneNumber, address },
        { new: true }
      );
    } catch (error) {
      throw error;
    }
  }

  static async getUserByEmail(email) {
    try {
      return await UserModel.findOne({ email });
    } catch (error) {
      console.log(error);
    }
  }

  static async checkUser(email) {
    try {
      return await UserModel.findOne({ email });
    } catch (error) {
      throw error;
    }
  }

  static async generateAccessToken(tokenData, JWTSecret_Key, JWT_EXPIRE) {
    return jwt.sign(tokenData, JWTSecret_Key, { expiresIn: JWT_EXPIRE });
  }

  static async getUserInfo(email) {
    try {
      const user = await UserServices.checkUser(email);
      if (user) {
        return { firstName: user.firstName, lastName: user.lastName };
      } else {
        throw new Error("User not found");
      }
    } catch (error) {
      throw error;
    }
  }
}

module.exports = UserServices;
