const UserServices = require("../services/user.services");

exports.register = async (req, res, next) => {
  try {
    console.log("---req body---", req.body);
    const { email, password } = req.body;
    const duplicate = await UserServices.getUserByEmail(email);
    if (duplicate) {
      throw new Error(`UserName ${email}, Already Registered`);
    }
    const response = await UserServices.registerUser(email, password);

    res.json({ status: true, success: "User registered successfully" });
  } catch (error) {
    console.log("---> err -->", error);
    next(error);
  }
};

exports.updateProfile = async (req, res, next) => {
  try {
    const { email, firstName, lastName, phoneNumber, address } = req.body;
    let user = await UserServices.checkUser(email);
    if (!user) {
      throw new Error("User does not exist");
    }
    const updateUser = await UserServices.updateProfileUser(
      email,
      firstName,
      lastName,
      phoneNumber,
      address
    );
    res.json({ status: true, success: "User update profile successfully" });
  } catch (error) {
    console.log("---> err -->", error);
    next(error);
  }
};

exports.login = async (req, res, next) => {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      throw new Error("Parameter are not correct");
    }
    let user = await UserServices.checkUser(email);
    if (!user) {
      throw new Error("User does not exist");
    }

    const isPasswordCorrect = await user.comparePassword(password);

    if (isPasswordCorrect === false) {
      throw new Error(`Username or Password does not match`);
    }

    // Creating Token

    let tokenData;
    tokenData = {
      _id: user._id,
      email: user.email,
      firstName: user.firstName,
      lastName: user.lastName,
      phoneNumber: user.phoneNumber,
      address: user.address,
      avatar: user.avatar,
    };

    const token = await UserServices.generateAccessToken(
      tokenData,
      "secret",
      "1h"
    );

    res.status(200).json({ status: true, success: "sendData", token: token });
  } catch (error) {
    console.log("---> err -->", error);
    next(error);
  }
};

exports.getProfile = async (req, res, next) => {
  try {
    const userId = req.user._id;
    const user = await UserServices.getUserById(userId);
    res.json({ status: true, success: "Get user profile successfully" });
  } catch (error) {
    console.log("---> err -->", error);
    next(error);
  }
};
