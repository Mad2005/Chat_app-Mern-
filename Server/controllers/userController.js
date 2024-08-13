import User from "../models/userModel.js";
import bcryptjs from "bcryptjs";

export const login = async (req, res) => {
  const { username, password } = req.body;
  const user = await User.findOne({ username });
  try {

      const existingUser = await User.findOne({ username:username});

      if (!existingUser) {
          return res.status(404).json({ message: "User not found" });
      }

      const isMatch = bcryptjs.compareSync(password,existingUser.password);

      //const isMatch = await user.findOne({password:password});

      if (!isMatch) {
          return res.status(400).json({ message: "Invalid Password" });
      }

      delete user.password;
      return res.json({ status: true, user });
  } catch (error) {
      console.log(error);
      res.status(500).json({ message: "Server error" });
  }
};

export const register = async (req, res, next) => {
  try {
    const { username, email, password } = req.body;
    const usernameCheck = await User.findOne({ username });
    if (usernameCheck)
      return res.json({ msg: "Username already used", status: false });
    const emailCheck = await User.findOne({ email });
    if (emailCheck)
      return res.json({ msg: "Email already used", status: false });
    const hashedPassword = await bcryptjs.hash(password, 10);
    const user = await User.create({
      email,
      username,
      password: hashedPassword,
    });
    delete user.password;
    // res.status(201).json({message:"User created successfully"});
    return res.json({ status: true, user });
  } catch (ex) {
    next(ex);
  }
};

export const getAllUsers = async (req, res, next) => {
  try {
    const users = await User.find({ _id: { $ne: req.params.id } }).select([
      "email",
      "username",
      "avatarImage",
      "_id",
    ]);
    return res.json(users);
  } catch (ex) {
    next(ex);
  }
};

export const setAvatar = async (req, res, next) => {
  try {
    const userId = req.params.id;
    const avatarImage = req.body.image;
    const userData = await User.findByIdAndUpdate(
      userId,
      {
        isAvatarImageSet: true,
        avatarImage,
      },
      { new: true }
    );
    return res.json({
      isSet: userData.isAvatarImageSet,
      image: userData.avatarImage,
    });
  } catch (ex) {
    next(ex);
  }
};

export const logOut = (req, res, next) => {
  try {
    if (!req.params.id) return res.json({ msg: "User id is required " });
    onlineUsers.delete(req.params.id);
    return res.status(200).send();
  } catch (ex) {
    next(ex);
  }
};
