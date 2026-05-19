// const mongoose = require("mongoose");
// require("dotenv").config();
// const connectDB = async ()=>{
// try {
//     await mongoose.connect(process.env.MONGO_URL)
    
//     console.log("MongoDB Connected");
// } catch (error) {
//     console.error("MongoDB Connection Error:", error.message);
// }
// }
// module.exports = connectDB



const mongoose = require("mongoose");
require("dotenv").config();
const bcrypt = require("bcrypt");
const User = require("../Models/User"); // adjust path if needed

const connectDB = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URL, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    console.log("MongoDB Connected");

    // Check and create Super Admin if not exists
    const existing = await User.findOne({ role: "super-admin" });
    if (!existing) {
      const hashedPassword = await bcrypt.hash("admin12345", 10);
      const superAdmin = new User({
        name: "Super Admin",
        email: "admin01@gmail.com",
        password: hashedPassword,
        role: "super-admin",
        isVerified: true,
      });
      await superAdmin.save();
      console.log("Super Admin created automatically!");
    } else {
      console.log("Super Admin already exists");
    }

  } catch (error) {
    console.error("MongoDB Connection Error:", error.message);
    process.exit(1); // exit if DB fails
  }
};

module.exports = connectDB;
