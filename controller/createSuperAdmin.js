// require("dotenv").config();
// const mongoose = require("mongoose");
// const bcrypt = require("bcrypt");
// const User = require("./Models/User");

// const createSuperAdmin = async () => {
//   try {
//     await mongoose.connect(process.env.MONGO_URI);
//     console.log("DB Connected");

//     const existing = await User.findOne({ role: "super-admin" });
//     if (existing){
//       console.log("Super Admin already exists:", existing.email);
//       return process.exit();
//     }

//     const hashedPassword = await bcrypt.hash("admin12345", 10);
//     const superAdmin = new User({
//       name: "Admin",
//     email: "admin01@gmail.com",
//     password: hashedPassword,
//       role: "super-admin",
//       isVerified: true,
//     });

//     await superAdmin.save();
//     console.log("Super Admin created successfully!");
//     process.exit();
//   } catch (err) {
//     console.error("Error creating Super Admin:", err);
//     process.exit(1);
//   }
// };

// createSuperAdmin();


require("dotenv").config();
const mongoose = require("mongoose");
const bcrypt = require("bcrypt");
const User = require("./Models/User");

const createSuperAdmin = async () => {
  try {
    if (!process.env.MONGO_URI) {
      console.error("❌ Error: MONGO_URI is not defined in the environment variables.");
      process.exit(1);
    }

    await mongoose.connect(process.env.MONGO_URI);
    console.log("DB Connected ✅");

    const existing = await User.findOne({ role: "super-admin" });
    if (existing) {
      console.log("Super Admin already exists:", existing.email);
      return process.exit();
    }

    // Safely look for environment values or fall back if running local tests
    const adminName = process.env.ADMIN_NAME || "Super Admin";
    const adminEmail = process.env.ADMIN_EMAIL;
    const adminPassword = process.env.ADMIN_PASSWORD;

    // Validation check to make sure you don't accidently deploy an empty admin account
    if (!adminEmail || !adminPassword) {
      console.error("❌ Error: ADMIN_EMAIL or ADMIN_PASSWORD is not set in the environment variables.");
      process.exit(1);
    }

    const hashedPassword = await bcrypt.hash(adminPassword, 10);
    
    const superAdmin = new User({
      name: adminName,
      email: adminEmail,
      password: hashedPassword,
      role: "super-admin",
      isVerified: true, // Super admin skips verification flow
    });

    await superAdmin.save();
    console.log(`🚀 Super Admin account (${adminEmail}) created successfully!`);
    process.exit();
  } catch (err) {
    console.error("❌ Error creating Super Admin:", err);
    process.exit(1);
  }
};

createSuperAdmin();



