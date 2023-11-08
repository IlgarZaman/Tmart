import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import Users from "../models/users.js";
const secret = "test";
import { v2 as cloudinary } from "cloudinary";
import dotenv from "dotenv";

const maxAge = 3 * 24 * 60 * 60;
dotenv.config();

export const signin = async (req, res) => {
  const { email, password } = req.body;
  try {
    const oldUsers = await Users.findOne({ email });
    if (!oldUsers) return res.status(404).json({ message: "User not found" });
    const isPasswordCorrect = await bcrypt.compare(password, oldUsers.password);
    if (!isPasswordCorrect)
      return res.status(404).json({ message: "Invalid credantials" });
    const token = jwt.sign(
      { email: oldUsers.email, id: oldUsers._id },
      secret,
      { expiresIn: "23h" }
    );
    res.cookie("jwt", token, {
      withCredentials: true,
      maxAge: maxAge * 1000,
    });
    res.status(200).json({ result: oldUsers, token });
  } catch (error) {
    res.status(500).json({ message: "Something went wrong" });
    console.log(error);
  }
};
export const getUsers = (req, res) => {
  Users.find({}, (err, docs) => {
    if (!err) {
      res.send(docs);
    }
    if (err) {
      console.log(err);
    }
  });
};

export const updateUsers = async (req, res) => {
  try {
    const users = await Users.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
    });
    if (!users) {
      return res.status(404).json({ message: "Resource not found" });
    }
    res.status(200).json({ data: users });
  } catch (error) {
    res.status(500).json({ message: "Internal Server Error" });
  }
};

export const getUsersById = (req, res) => {
  let id = req.params.id;
  Users.findById(id, (err, doc) => {
    if (!err) {
      res.send(doc);
    }
  });
};

export const deleteUsers = async (req, res) => {
  const { id } = req.params;
  try {
    const deleteUsers = await Users.findByIdAndDelete(id);
    res.json(deleteUsers);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const signup = async (req, res) => {
  const { name, surname, email, password, role } = req.body;
  try {
    const oldUser = await Users.findOne({ email });

    if (oldUser) {
      return res.status(400).json({ message: "User already exists!" });
    }

    const hashedPassword = await bcrypt.hash(password, 12);
    let imageSecureUrl = "";

    if (req.file) {
      const image = await cloudinary.uploader.upload(req.file.path);
      imageSecureUrl = image.secure_url;
    }

    const result = new Users({
      name: name,
      surname: surname,
      email,
      password: hashedPassword,
      role: role,
      image: imageSecureUrl,
    });

    await result.save();
    const token = jwt.sign({ email: result.email, id: result._id }, secret, {
      expiresIn: "2h",
    });

    res.cookie("jwt", token, {
      withCredentials: true,
      maxAge: maxAge * 1000,
    });

    res.status(201).json({ result, token });
  } catch (error) {
    res.status(500).json({ message: "Something went wrong" });
    console.log(error);
  }
};

// export const changePassword = async (req, res) => {
//   const { userId, oldPassword, newPassword } = req.body;
//   try {
//     const user = await Users.findById(userId);

//     if (!user) {
//       return res.status(404).json({ message: "User not found" });
//     }
//     const isPasswordValid = await bcrypt.compare(oldPassword, user.password);

//     if (!isPasswordValid) {
//       return res.status(400).json({ message: "Invalid old password" });
//     }
//     const hashedPassword = await bcrypt.hash(newPassword, 12);
//     user.password = hashedPassword;
//     await user.save();

//     res.status(200).json({ message: "Password changed successfully" });
//   } catch (error) {
//     res.status(500).json({ message: "Something went wrong" });
//     console.log(error);
//   }
// };

export const changeProfileImage = async (req, res) => {
  const { userId } = req.params;
  try {
    const user = await Users.findById(userId);

    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }
    if (req.file) {
      const image = await cloudinary.uploader.upload(req.file.path);

      user.image = image.secure_url;
    } else {
      user.image = "";
    }
    await user.save();
    res
      .status(200)
      .json({ message: "Profile image changed successfully", user });
  } catch (error) {
    res.status(500).json({ message: "Something went wrong" });
    console.log(error);
  }
};
