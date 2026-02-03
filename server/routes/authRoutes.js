import express from "express";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import User from "../models/User.js";
import upload from "../middleware/uploadMiddleware.js";
import cloudinary from "../config/cloudinary.js";
import { protect } from "../middleware/authMiddleware.js";

const router = express.Router();

/* REGISTER */
router.post("/register", upload.single("image"), async (req, res) => {
  const { name, email, password } = req.body;

  let avatar = "";
  if (req.file) {
    const uploadRes = await cloudinary.uploader.upload(req.file.path);
    avatar = uploadRes.secure_url;
  }

  const hashed = await bcrypt.hash(password, 10);
  const user = await User.create({ name, email, password: hashed, avatar });

  res.json(user);
});

/* LOGIN */
router.post("/login", async (req, res) => {
  const { email, password } = req.body;

  const user = await User.findOne({ email });
  if (!user) return res.status(401).json({ message: "Invalid credentials" });

  const match = await bcrypt.compare(password, user.password);
  if (!match) return res.status(401).json({ message: "Invalid credentials" });

  const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, {
    expiresIn: "1d",
  });

  res.cookie("token", token, {
    httpOnly: true,
    sameSite: "lax",
  });

  res.json({
    user: {
      _id: user._id,
      name: user.name,
      email: user.email,
      avatar: user.avatar,
    },
  });
});


/* PROFILE */
router.get("/profile", protect, async (req, res) => {
  const user = await User.findById(req.userId).select("-password");
  res.json(user);
});

router.put(
  "/profile",
  protect,
  upload.single("image"),
  async (req, res) => {
    try {
      let updateData = {
        name: req.body.name,
        email: req.body.email,
      };

      // remove image
      if (req.body.removeImage === "true") {
        updateData.avatar = "";
      }

      // new image upload
      if (req.file) {
        const uploadRes = await cloudinary.uploader.upload(req.file.path);
        updateData.avatar = uploadRes.secure_url;
      }

      const user = await User.findByIdAndUpdate(
        req.userId,
        updateData,
        { new: true }
      );

      res.json(user);
    } catch (err) {
      res.status(500).json({ message: "Profile update failed" });
    }
  }
);

router.post("/logout", (req, res) => {
  res.clearCookie("token");
  res.json({ message: "Logged out" });
});




export default router;
