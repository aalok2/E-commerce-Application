const express = require("express");
const router = express.Router();
const authController = require("../controllers/authController");
router.post("/register", async (req, res) => {
  try {
    const { userName, password, name, phoneNumber, userType } = req.body;
    if (!userName && !password && !name && !phoneNumber && !userType) {
      res.status(403).json({ message: "Mandaotory parameters are missing" });
    }
    await authController.registerUser(req, res);
  } catch (error) {
    res
      .status(404)
      .json({ message: "Not able to register user , Please try again later" });
  }
});
router.post("/login", async (req, res) => {
  try {
    const { userName, password } = req.body;
    if (!userName && !password) {
      res.status(403).json({ message: "Mandatory parameters are missing" });
    }
    const token = await authController.loginUser(req, res);
    res.status(200).json({ token: token });
  } catch (error) {
    res
      .status(404)
      .json({ message: "Not able to Login user , Please try again later" });
  }
});
module.exports = router;
