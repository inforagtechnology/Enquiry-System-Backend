// const mongoose = require("mongoose");

// const registrationSchema = new mongoose.Schema(
//   {
//     name: {
//       type: String,
//       required: [true, "Name is required"],
//       trim: true,
//     },
//     email: {
//       type: String,
//       required: [true, "Email is required"],
//       unique: true,
//       lowercase: true,
//       match: [/^\S+@\S+\.\S+$/, "Please enter a valid email"],
//     },
//     course: {
//       type: String,
//       required: [true, "Course is required"],
//       enum: ["Web Development", "Mongoose db", "Mern-stack","Full-Stack","Video Editing", "Digital Marketing","Node.js","Frontend development","Backend Development",
//            "AI", "C & C++", "SQL",
//       ], 
    
//     },
//     mobile: {
//       type: String,
//       required: [true, "Mobile number is required"],
//       unique: true,
//       match: [/^[0-9]{10}$/, "Please enter a valid 10-digit mobile number"],
//     },
//      registrationFees:{
//       type: String,
//       required:[true, "registrationFees is required"]
//      },
//     // Payment Method
//     paymentMethod: {
//       type: String,
//       enum: ["online", "cash"],
//       required: [true, "Payment method is required"],
//     },
//     transactionId: {
//       type: String,
//       unique: true,
//       sparse: true,
//       required: function () {
//         return this.paymentMethod === "online"; // only required for online
//       },
//     },

//     // Exam Date (Friday only)
//     examDate: {
//       type: Date,
//       required: [true, "Exam date is required"],
//       validate: {
//         validator: function (value) {
//           return value.getDay() === 5; // Friday only
//         },
//         message: "Exam date must be on a Friday",
//       },
//     },
//   },
//   { timestamps: true }
// );

// // Remove transactionId if payment method is cash
// registrationSchema.pre("save", function (next) {
//   if (this.paymentMethod === "cash") {
//     this.transactionId = undefined;
//   }
//   next();
// });

// const RegistrationModule = mongoose.model("registrationdata", registrationSchema);
// module.exports = RegistrationModule;




const mongoose = require("mongoose");

const registrationSchema = new mongoose.Schema({
  name: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  course: { type: String, required: true },
  mobile: { type: String, required: true, unique: true },
  registrationFees: { type: String, required: true },
  paymentMethod: { type: String, enum: ["online", "cash"], required: true },
  transactionId: { type: String, sparse: true },
  examDate: { type: Date, required: true },
  createdBy: { type: String },  // 👈 Add this
  updatedBy: { type: String },                  // 👈 Add this
}, { timestamps: true });

registrationSchema.pre("save", function(next) {
  if (this.paymentMethod === "cash") this.transactionId = undefined;
  next();
});

module.exports = mongoose.model("registrationdata", registrationSchema);
