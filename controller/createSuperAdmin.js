require("dotenv").config();
const mongoose = require("mongoose");
const bcrypt = require("bcrypt");
const User = require("./Models/User");

const createSuperAdmin = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI);
    console.log("DB Connected");

    const existing = await User.findOne({ role: "super-admin" });
    if (existing){
      console.log("Super Admin already exists:", existing.email);
      return process.exit();
    }

    const hashedPassword = await bcrypt.hash("admin12345", 10);
    const superAdmin = new User({
      name: "Admin",
    email: "admin01@gmail.com",
    password: hashedPassword,
      role: "super-admin",
      isVerified: true,
    });

    await superAdmin.save();
    console.log("Super Admin created successfully!");
    process.exit();
  } catch (err) {
    console.error("Error creating Super Admin:", err);
    process.exit(1);
  }
};

createSuperAdmin();



