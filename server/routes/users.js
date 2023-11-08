import express from "express";
import {
  signup,
  signin,
  getUsers,
  deleteUsers,
  updateUsers,
  getUsersById,
  changeProfileImage,
} from "../controllers/users.js";
import { uploadMiddleware } from "../middleware/uploadMiddleware.js";

const router = express.Router();
router.get("/", getUsers);
router.delete("/:id", deleteUsers);
router.get("/:id", getUsersById);
router.put("/:id", updateUsers);
router.post("/signup", uploadMiddleware.single("image"), signup);
router.post("/signin", signin);
router.post(
  "/changeProfileImage/:userId",
  uploadMiddleware.single("profileImage"),
  changeProfileImage
);
export default router;
