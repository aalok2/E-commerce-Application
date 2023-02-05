const models = require("../models");
const passwordEncryptionUtils = require("../utils/passwordEncryptionUtil");
const tokenGenerationUtils = require("../utils/tokenGenerationUtils");
const buyer = "buyer";
const seller = "seller";

const registerUser = async (req, res) => {
  try {
    const { userName, password, name, phoneNumber, userType } = req.body;
    const userDetails = await checkIfUserExists(userName, phoneNumber);
    if (userDetails) {
      return res
        .status(200)
        .json({ message: "User already registerd , Please login" });
    }
    const passwordHash = await passwordEncryptionUtils.hashPassword(password);
    let newUserData = {
      userName: userName,
      password: passwordHash,
      name: name,
      phoneNumber: phoneNumber,
      userType: userType,
    };
    await models.UserDetails.create(newUserData);
    await entryBasedOnUserType(name, phoneNumber, userType);
    return res.status(200).json({
      message:
        "Account created , Please login using  your  username and  password  ",
    });
  } catch (error) {
    return res.status(500).json({ message: "Error registering user" });
  }
};
const loginUser = async (req, res) => {
  try {
    const { userName, password, userType, phoneNumber } = req.body;
    const userLoginDetails = await checkIfUserExists(userName, phoneNumber);
    if (!userLoginDetails) {
      return res.status(200).json({ message: "Please signup" });
    }
    const hash = userLoginDetails.password;
    const verifypassword = await passwordEncryptionUtils.comparePasswords(
      password,
      hash
    );
    if (!verifypassword) {
      return res
        .status(200)
        .json({ message: "Please check the password you have entered" });
    }
    const phonenumber = userLoginDetails.phoneNumber;
    const payload = await fetchUserDetails(phonenumber, userType);
    await tokenGenerationUtils.generateToken(payload);
    return res.status(200).json({ message: "You have logged in succesfully" });
    // set this token in redis with one hr expiry
  } catch (error) {
    res.status(500).json({ message: "Error logging in user" });
  }
};
const checkIfUserExists = async (userName, phoneNumber) => {
  try {
    const userDetails = await models.UserDetails.findOne({
      where: {
        userName: userName,
        phoneNumber: phoneNumber,
      },
    });
    return userDetails;
  } catch (error) {
    return res.status(500).json({ message: "Error Finding your user" });
  }
};
const fetchUserDetails = async (phoneNumber, userType) => {
  try {
    let payload = {
      buyers_id: null,
      seller_id: null,
    };
    if (userType.toLowerCase() == buyer) {
      const buyerDetails = await models.Buyers.findOne({
        where: { PhoneNumber: phoneNumber },
      });
      payload.buyers_id = buyerDetails && buyerDetails.buyers_id;
    } else if (userType.toLowerCase() == seller) {
      const sellerDetails = await models.Sellers.findOne({
        where: { PhoneNumber: phoneNumber },
      });
      payload.seller_id = sellerDetails && sellerDetails.seller_id;
    }
    return payload;
  } catch (error) {
    return res.status(500).json({ message: "Error finding the User" });
  }
};
const entryBasedOnUserType = async (name, phoneNumber, userType) => {
  try {
    let userDetails = {
      Name: name,
      PhoneNumber: phoneNumber,
    };

    if (userType.toLowerCase() == buyer) {
      await models.Buyers.create(userDetails);
    } else if (userType.toLowerCase() == seller) {
      await models.Sellers.create(userDetails);
    }
  } catch (error) {
    return res.status(500).json({ message: "Error Creating the User" });
  }
};
module.exports = {
  registerUser,
  loginUser,
};
