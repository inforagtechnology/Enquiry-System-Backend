// const mongoose = require("mongoose");
// const enquiryschema = new mongoose.Schema({
//    name: {
//       type: String,
//       required: [true, "Name is required"],
//       trim: true,
//     },
//     email: {
//       type: String,
//       required: [true, "Email is required"],
//       // unique: false,
//       // lowercase: true,
//       match: [/^\S+@\S+\.\S+$/, "Please enter a valid email"],
//     },
//     course: {
//       type: String,
//       required: [true, "Course is required"],
//       enum: ["Web Development", "Mongoose db", "Mern-stack","Full-Stack","Video Editing", "Digital Marketing","Node.js","Frontend development","backend Developmene",
//           //  "AI", "C & C++", "SQL",
//       ], 

//     },
//     mobile: {
//       type: String,
//       required: [true, "Mobile number is required"],
//       match: [/^[0-9]{10}$/, "Please enter a valid 10-digit mobile number"],
//     },
//     Enquiry_Message :{
//       type: String,
//       required: [true, "Enquiry Message is required"]
//     }
//  },{ timestamps: true })
// const enquiryModule = mongoose.model("enquirydata", enquiryschema); 
// module.exports = enquiryModule




const mongoose = require("mongoose");

const enquirySchema = new mongoose.Schema({
  name: { type: String, required: true },
  email: { type: String, required: true },
  course: { type: String, required: true },
  mobile: { type: String, required: true },
  registrationFees: {
    type: String,
    enum: ["Yes", "No"],
    required: true,
  },
  Enquiry_Message: { type: String, required: true },
  createdBy: { type: String, required: true },
  updatedBy: { type: String },
}, { timestamps: true });

module.exports = mongoose.model("enquirydata", enquirySchema);
