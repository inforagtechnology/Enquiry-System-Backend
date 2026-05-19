// const bcrypt = require("bcrypt");
// const jwt = require("jsonwebtoken");
// const User = require("../Models/authModule");
// const transporter = require("./nodemailer");
// const crypto = require("crypto")
// // Regex for email format check
// const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

// // Signup (with email verification)
// const signup = async (req, res) => {
//   try {
//     const { name, email, password } = req.body;

//     if (!emailRegex.test(email)) {
//       return res.status(400).json({ msg: "Invalid email format" });
//     }

//     let existing = await User.findOne({ email });
//     if (existing) return res.status(400).json({ msg: "User already exists" });

//     const hashedPassword = await bcrypt.hash(password, 10);

//     const user = new User({ name, email, password: hashedPassword });
//     await user.save();

//     // Generate verification token
//     const token = jwt.sign({ email }, "EMAIL_SECRET", { expiresIn: "1d" });

//     // Verification link
//     const link = `http://localhost:5000/auth/verify/${token}`;  

//     // Send email
//     await transporter.sendMail({
//       from: "nileshrajput447@gmail.com",
//       to: email,
//       subject: "Verify your email",
//       html: `<h3>Hello ${name},</h3>
//              <p>Please click below link to verify your email:</p>
//              <a href="${link}">Verify Email</a>`,
//     });

//     res.status(201).json({ msg: "Signup successful, check your email for verification link." });
//   } catch (err) {
//     res.status(500).json({ msg: "Error in signup", error: err.message });
//   }
// };

// // Email Verification
// const verifyEmail = async (req, res) => {
//   try {
//     const { token } = req.params;
//     const decoded = jwt.verify(token, "EMAIL_SECRET");

//     const user = await User.findOne({ email: decoded.email });
//     if (!user) return res.status(400).json({ msg: "Invalid token" });

//     user.isVerified = true;
//     await user.save();

//     res.send("<h2>Email verified successfully! You can now login.</h2>");
//   } catch (err) {
//     res.status(400).json({ msg: "Invalid or expired token" });
//   }
// };

// // Login (only if email verified)
// const login = async (req, res) => {
//   try {
//     const { email, password } = req.body;

//     const user = await User.findOne({ email });
//     if (!user) return res.status(400).json({ msg: "User not found" });

//     if (!user.isVerified)
//       return res.status(403).json({ msg: "Please verify your email before login" });

//     const isMatch = user.password && await bcrypt.compare(password, user.password);
//     if (!isMatch) return res.status(400).json({ msg: "Invalid credentials" });

//     const token = jwt.sign({ id: user._id }, "SECRET_KEY", { expiresIn: "1h" });

//     res.json({ msg: "Login successful", token });
//     console.log("Token",token)
//   } catch (err) {
//     res.status(500).json({ msg: "Error in login", error: err.message });
//   }
// };
// // --------------Reset password-------------
// // 1️⃣ Forgot Password (send reset link)
// const forgotPassword = async (req, res) => {
//   try {
//     const { email } = req.body;
//     const user = await User.findOne({ email });
//     if (!user) return res.status(400).json({ msg: "User not found" });

//     // Generate reset token
//     const resetToken = crypto.randomBytes(32).toString("hex");
//     const resetTokenHash = crypto.createHash("sha256").update(resetToken).digest("hex");

//     user.resetPasswordToken = resetTokenHash;
//     user.resetPasswordExpire = Date.now() + 3600000; // 1 hour
//     await user.save();

//     const resetLink = `http://localhost:5173/reset-password/${resetToken}`;

//     await transporter.sendMail({
//       from: "nileshrajput447@gmail.com",
//       to: email,
//       subject: "Reset Your Password",
//       html: `<p>Click below link to reset your password:</p>
//              <a href="${resetLink}">Reset Password</a>`,
//     });

//     res.json({ msg: "Password reset link sent to your email." });
//   } catch (err) {
//     res.status(500).json({ msg: "Error in forgot password", error: err.message });
//   }
// };

// // 2️⃣ Reset Password (using token)
// const resetPassword = async (req, res) => {
//   try {
//     const { token } = req.params;
//     const { password } = req.body;

//     const resetTokenHash = crypto.createHash("sha256").update(token).digest("hex");

//     const user = await User.findOne({
//       resetPasswordToken: resetTokenHash,
//       resetPasswordExpire: { $gt: Date.now() },
//     });

//     if (!user) return res.status(400).json({ msg: "Invalid or expired token" });

//     user.password = await bcrypt.hash(password, 10);
//     user.resetPasswordToken = undefined;
//     user.resetPasswordExpire = undefined;

//     await user.save();

//     res.json({ msg: "Password reset successfully. You can now login." });
//   } catch (err) {
//     res.status(500).json({ msg: "Error in reset password", error: err.message });
//   }
// };






// // Google Auth callback
// const googleCallback = (req, res) => {
//   const token = jwt.sign({ id: req.user._id }, "SECRET_KEY", { expiresIn: "1h" });
//   res.json({ msg: "Google Login successful", token, user: req.user });
// };

// module.exports = {
//   signup,
//   verifyEmail,
//   login,
//   googleCallback,
//   forgotPassword,
//   resetPassword
// };



const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const crypto = require("crypto");
const User = require("../Models/User");
const transporter = require("../controller/nodemailer");

const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

// ---------------- Signup (user only) ----------------
// const signup = async (req, res) => {
//   try {
//     const { name, email, password } = req.body;

//     if (!emailRegex.test(email)) return res.status(400).json({ msg: "Invalid email" });

//     const existing = await User.findOne({ email });
//     if (existing) return res.status(400).json({ msg: "User already exists" });

//     const hashedPassword = await bcrypt.hash(password, 10);
//     const user = new User({ name, email, password: hashedPassword });
//     await user.save();

//     // Email verification
//     const token = jwt.sign({ email }, process.env.EMAIL_SECRET, { expiresIn: "1d" });
//     // const link = `${process.env.FRONTEND_URL}/verify-email/${token}`;
//      const link = `http://localhost:5000/auth/verify/${token}`;

//     await transporter.sendMail({
//       from: process.env.EMAIL_USER,
//       to: email,
//       subject: "Verify your email",
//       html: `<h3>Hello ${name}</h3><p>Click link to verify your email:</p><a href="${link}">Verify Email</a>`,
//     });

//     res.status(201).json({ msg: "Signup successful, verify your email." });

//   } catch (err) {
//     res.status(500).json({ msg: "Signup error", error: err.message });
//   }
// };

// ---------------- Verify Email ----------------
// const verifyEmail = async (req, res) => {
//   try {
//     const { token } = req.params;
//     const decoded = jwt.verify(token, process.env.EMAIL_SECRET);

//     const user = await User.findOne({ email: decoded.email });
//     if (!user) return res.status(400).send("Invalid token");

//     user.isVerified = true;
//     await user.save();

//     res.send("Email verified successfully!");
//   } catch (err) {
//     res.status(400).send("Invalid or expired token");
//   }
// };
// Signup (with email verification)
const signup = async (req, res) => {
  try {
    
    const { name, email, password } = req.body;

    if (!emailRegex.test(email)) {
      return res.status(400).json({ msg: "Invalid email format" });
    }

    let existing = await User.findOne({ email });
    if (existing) return res.status(400).json({ msg: "User already exists" });

    const hashedPassword = await bcrypt.hash(password, 10);

    const user = new User({ name, email, password: hashedPassword });
    await user.save();

    // Generate verification token
    const token = jwt.sign({ email }, "EMAIL_SECRET", { expiresIn: "1d" });

    // Verification link
    const link = `http://localhost:5000/auth/verify/${token}`;  

    // Send email
    await transporter.sendMail({
      from: "nileshrajput447@gmail.com",
      to: email,
      subject: "Verify your email",
      html: `<h3>Hello ${name},</h3>
             <p>Please click below link to verify your email:</p>
             <a href="${link}">Verify Email</a>`,
    });

    res.status(201).json({ msg: "Signup successful, check your email for verification link." });
  } catch (err) {
    res.status(500).json({ msg: "Error in signup", error: err.message });
  }
};
const verifyEmail = async (req, res) => {
  try {
    const { token } = req.params;
    const decoded = jwt.verify(token, "EMAIL_SECRET");

    const user = await User.findOne({ email: decoded.email });
    if (!user) return res.status(400).json({ msg: "Invalid token" });

    user.isVerified = true;
    await user.save();

    res.send("<h2>Email verified successfully! You can now login.</h2>");
  } catch (err) {
    res.status(400).json({ msg: "Invalid or expired token" });
  }
};


// ---------------- Login ----------------
// const login = async (req, res) => {
//   try {
//     const { email, password } = req.body;
//     const user = await User.findOne({ email });
//     if (!user) return res.status(400).json({ msg: "User not found" });
//     if (!user.isVerified) return res.status(403).json({ msg: "Verify email first" });

//     const match = await bcrypt.compare(password, user.password);
//     if (!match) return res.status(400).json({ msg: "Invalid credentials" });

//     const token = jwt.sign({ id: user._id, role: user.role }, process.env.JWT_SECRET, { expiresIn: "1h" });
//     res.json({ msg: "Login successful", token, role: user.role });
//   } catch (err) {
//     res.status(500).json({ msg: "Login error", error: err.message });
//   }
// };


const login = async (req, res) => {
  try {
    const { email, password } = req.body;

    const user = await User.findOne({ email });
    if (!user) return res.status(400).json({ msg: "User not found" });
    if (!user.isVerified) return res.status(403).json({ msg: "Verify email first" });

    const match = await bcrypt.compare(password, user.password);
    if (!match) return res.status(400).json({ msg: "Invalid credentials" });

    const token = jwt.sign({ id: user._id, role: user.role }, process.env.JWT_SECRET, { expiresIn: "1h" });

    res.json({ msg: "Login successful", token, role: user.role });
  } catch (err) {
    console.error(err);
    res.status(500).json({ msg: "Login error", error: err.message });
  }
};


// ---------------- Forgot Password ----------------
const forgotPassword = async (req, res) => {
  try {
    const { email } = req.body;
    const user = await User.findOne({ email });
    if (!user) return res.status(400).json({ msg: "User not found" });

    const resetToken = crypto.randomBytes(32).toString("hex");
    const resetTokenHash = crypto.createHash("sha256").update(resetToken).digest("hex");

    user.resetPasswordToken = resetTokenHash;
    user.resetPasswordExpire = Date.now() + 3600000;
    await user.save();

    const resetLink = `http://localhost:5173/reset-password/${resetToken}`;
    await transporter.sendMail({
      from: process.env.EMAIL_USER,
      to: email,
      subject: "Reset Password",
      html: `<p>Click below to reset your password:</p><a href="${resetLink}">Reset Password</a>`,
    });

    res.json({ msg: "Reset link sent to your email" });
  } catch (err) {
    res.status(500).json({ msg: "Forgot password error", error: err.message });
  }
};

// ---------------- Reset Password ----------------
const resetPassword = async (req, res) => {
  try {
    const { token } = req.params;
    const { password } = req.body;

    const resetTokenHash = crypto.createHash("sha256").update(token).digest("hex");

    const user = await User.findOne({
      resetPasswordToken: resetTokenHash,
      resetPasswordExpire: { $gt: Date.now() },
    });
    if (!user) return res.status(400).json({ msg: "Invalid or expired token" });

    user.password = await bcrypt.hash(password, 10);
    user.resetPasswordToken = undefined;
    user.resetPasswordExpire = undefined;
    await user.save();

    res.json({ msg: "Password reset successfully" });
  } catch (err) {
    res.status(500).json({ msg: "Reset password error", error: err.message });
  }
};

module.exports = { signup, verifyEmail, login, forgotPassword, resetPassword };



