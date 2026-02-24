import User from "../models/userModel.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

// Register new user
export const registerUser = async (req, res) => {
  try {
    const { name, email, password } = req.body;

    // Check if the user already exists
    const existingUser = await User.findOne({ email });

    if (existingUser) {
      return res.status(409).json({ error: `User already exists` });
    }

    // Hash the password using bcrypt
    const hashedPassword = await bcrypt.hash(password, 10);

    // Create a new user in the database
    const newUser = new User({
      name,
      email,
      password: hashedPassword,
    });

    await newUser.save();

    return res.status(201).json({ message: `User registered successfully` });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Login existing user
export const loginUser = async (req, res) => {
  try {
    const { email, password } = req.body;

    //  Check if User exist
    const user = await User.findOne({ email });

    // If user does't exists
    if (!user) {
      return res.status(401).json({ error: "User does't exists !" });
    }

    // Check password for user
    const passwordMatch = await bcrypt.compare(password, user.password);

    if (!passwordMatch) {
      return res.status(401).json({ error: "Password is incorrect" });
    }

    // Generate a JWT for the authenticated user
    const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, {
      expiresIn: "1h",
    });

    return res.status(200).json({ token });
  } catch (error) {
    return res.status(500).json({ error: `Internal server error` });
  }
};

// Update user
export const updateUser = async (req, res) => {
  try {
    const { name, email, password } = req.body;
    const userId = req.userId;

    const updateData = {};

    if (name) updateData.name = name;
    if (email) {
      // Check if the user already exists
      const existingUser = await User.findOne({ email });

      if (existingUser) {
        return res
          .status(409)
          .json({ error: `User with this email already exists` });
      }

      updateData.email = email;
    }
    if (password) {
      // Hash the password using bcrypt
      const hashedPassword = await bcrypt.hash(password, 10);
      updateData.password = hashedPassword;
    }

    const user = await User.findByIdAndUpdate(userId, updateData, {
      returnDocument: "after",
    });

    return res.status(200).json({
      message: "User updated successfully",
    });
  } catch (error) {
    return res.status(500).json({ error: `Internal server error` });
  }
};

//  Delete user
export const deleteUser = async (req, res) => {
  try {
    const userId = req.userId;
    const deleteuser = await User.deleteOne({ _id: userId });

    return res.status(200).json({
      message: "User deleted successfully",
    });
  } catch (error) {
    return res.status(500).json({ error: `Internal server error` });
  }
};