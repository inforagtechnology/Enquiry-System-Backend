// const admissionModule = require("../Models/admissionModule");
// const RegistrationModule = require("../Models/registationModule");
// const mongoose =require("mongoose")
// // Create Registration
// const createRegistration = async (req, res) => {
//   try {
//     const { name, email, course, mobile, registrationFees, paymentMethod, transactionId, examDate } = req.body;

//     // Basic validation
//     if (!name || !email || !course || !mobile || !registrationFees || !paymentMethod || !examDate) {
//       return res.status(400).json({
//         success: false,
//         message: "All fields are required",
//       });
//     }
//     // for transctionID 
//     if (paymentMethod === "online") {
//       const existingTxn = await RegistrationModule.findOne({ transactionId });
//       if (existingTxn) {
//         return res.status(400).json({
//           success: false,
//           message: "❌ Transaction ID already exists",
//         });
//       }
//     }

//     // If payment method is online, transactionId must be provided
//     if (paymentMethod === "online" && !transactionId) {
//       return res.status(400).json({
//         success: false,
//         message: "Transaction ID is required for online payment",
//       });
//     }
//     if (paymentMethod === "cash") {
//       // If cash, remove transactionId (ignore even if sent by frontend)
//       req.body.transactionId = undefined;
//     }
//     // Check if examDate is Friday
//     const selectedDate = new Date(examDate);
//     if (selectedDate.getDay() !== 5) {
//       return res.status(400).json({
//         success: false,
//         message: "Exam date must be on a Friday",
//       });
//     }

//     // Check if email already exists
//     const existingUser = await RegistrationModule.findOne({ email });
//     if (existingUser) {
//       return res.status(400).json({
//         success: false,
//         message: "Email already registered",
//       });
//     }

//     //  Mobile number validation
//     if (!/^[0-9]{10}$/.test(mobile)) {
//       return res.status(400).json({
//         success: false,
//         message: "Mobile number must be exactly 10 digits",
//       });
//     }
// // check if mobile number already exists
// const existingmobile = await RegistrationModule.findOne({mobile});
// if(existingmobile){
//   return res.status(400).json({
//     success:false,
//     message: "Mobile Number already registered"
//   })
// }
//     // Create new registration
//     const newRegistration = new RegistrationModule({
//       name,
//       email,
//       course,
//       mobile,
//       registrationFees,
//       paymentMethod,
//       transactionId,
//       examDate,
//     });

//     const savedData = await newRegistration.save();
//     console.log(savedData);
//     return res.status(201).json({
//       success: true,
//       message: "Student registered successfully",
//       data: savedData,
//     });
//   } catch (error) {
//     console.error("Error creating registration:", error);
//     return res.status(500).json({
//       success: false,
//       message: "Server Error",
//       error: error.message,
//     });
//   }
// };

// // Get All Registrations
// const getAllRegistrations = async (req, res) => {
//   try {
//     const registrations = await RegistrationModule.find().sort({ createdAt: -1 });
//     return res.status(200).json({
//       success: true,
//       message: "All registrations fetched",
//       data: registrations,
//     });
//   } catch (error) {
//     console.error("Error fetching registrations:", error);
//     return res.status(500).json({
//       success: false,
//       message: "Server Error",
//       error: error.message,
//     });
//   }
// };

// // Get Single Registration
// // const getRegistrationUser = async (req, res) => {
// //   try {
// //     const registration = await RegistrationModule.findById(req.params.id);
// //     if (!registration) {
// //       return res.status(404).json({
// //         success: false,
// //         message: "Registration not found",
// //       });
// //     }
// //     return res.status(200).json({
// //       success: true,
// //       message: "Registration details fetched",
// //       data: registration,
// //     });
// //   } catch (error) {
// //     console.error("Error fetching registration:", error);
// //     return res.status(500).json({
// //       success: false,
// //       message: "Server Error",
// //       error: error.message,
// //     });
// //   }
// // };

// const getRegistrationUser = async (req, res) => {
//   try {
//     let { id } = req.params;

//     // Trim any spaces
//     id = id.trim();

//     // Validate ObjectId
//     if (!mongoose.Types.ObjectId.isValid(id)) {
//       return res.status(400).json({ success: false, message: "Invalid ID" });
//     }

//     const user = await RegistrationModule.findById(id);
//     if (!user) {
//       return res.status(404).json({ success: false, message: "User not found" });
//     }

//     res.json({ success: true, data: user });
//   } catch (error) {
//     console.error("Error fetching registration:", error);
//     res.status(500).json({
//       success: false,
//       message: "Server error",
//       error: error.message,
//     });
//   }
// };



// // Delete Registration
// const deleteRegistration = async (req, res) => {
//   try {
//     const deleted = await RegistrationModule.findByIdAndDelete(req.params.id);
//     if (!deleted) {
//       return res.status(404).json({
//         success: false,
//         message: "Registration not found",
//       });
//     }
//     console.log(deleted);
//     return res.status(200).json({
//       success: true,
//       message: "Registration deleted successfully",
//       deleted
//     });
//   } catch (error) {
//     console.error("Error deleting registration:", error);
//     return res.status(500).json({
//       success: false,
//       message: "Server Error",
//       error: error.message,
//     });
//   }
// };
// // update registration
// // Update Registration
// const updateRegistration = async (req, res) => {
//   try {
//     const { name, email, course, mobile, registrationFees, paymentMethod, transactionId, examDate } = req.body;

//     // Check if registration exists
//     const registration = await RegistrationModule.findById(req.params.id);
//     if (!registration) {
//       return res.status(404).json({
//         success: false,
//         message: "Registration not found",
//       });
//     }

//     // If email is updated, check for duplicate
//     if (email && email !== registration.email) {
//       const existingUser = await RegistrationModule.findOne({ email });
//       if (existingUser) {
//         return res.status(400).json({
//           success: false,
//           message: "Email already registered",
//         });
//       }
//     }

//     // If payment method is online, transactionId must be provided
//     if (paymentMethod === "online" && !transactionId) {
//       return res.status(400).json({
//         success: false,
//         message: "Transaction ID is required for online payment",
//       });
//     }

//     // If cash, remove transactionId
//     if (paymentMethod === "cash") {
//       req.body.transactionId = undefined;
//     }

//     // If examDate is provided, ensure it’s Friday
//     if (examDate) {
//       const selectedDate = new Date(examDate);
//       if (selectedDate.getDay() !== 5) {
//         return res.status(400).json({
//           success: false,
//           message: "Exam date must be on a Friday",
//         });
//       }
//     }

//     // Update fields dynamically
//     Object.assign(registration, req.body);
//     const updatedRegistration = await registration.save();
//     // console.log(updateRegistration);
//     return res.status(200).json({
//       success: true,
//       message: "Registration updated successfully",
//       data: updatedRegistration,

//     });

//   } catch (error) {
//     console.error("Error updating registration:", error);
//     return res.status(500).json({
//       success: false,
//       message: "Server Error",
//       error: error.message,
//     });
//   }
// };
// // Search Registration by Mobile
// const getRegistrationByMobile = async (req, res) => {
//   try {
//     const { mobile } = req.params;
//     const registration = await RegistrationModule.findOne({ mobile });

//     if (!registration) {
//       return res.status(404).json({
//         success: false,
//         message: "No registration found with this mobile number",
//       });
//     }
//     // const admission = await admissionModule.findOne({ mobile });

//     // return res.status(200).json({
//     //   success: true,
//     //   data: {
//     //     ...registration._doc,
//     //     isAdmitted: !!admission,   // true if admission exists
//     //   },
//     // });
//     const admission = await admissionModule.findOne({ mobile });

//     return res.status(200).json({
//       success: true,
//       message: "Registration fetched successfully",
//       data: {
//         ...registration.toObject(),
//         isAdmitted: admission ? true : false, // extra flag
//       },
//     });
//    } catch (error) {
//     console.error("Error searching registration:", error);
//     return res.status(500).json({
//       success: false,
//       message: "Server Error",
//       error: error.message,
//     });
//   }
// };



// module.exports = { createRegistration, getAllRegistrations, getRegistrationUser, deleteRegistration, updateRegistration, getRegistrationByMobile };



const admissionModule = require("../Models/admissionModule");
const RegistrationModule = require("../Models/registationModule");
const mongoose = require("mongoose");

// Create Registration
const createRegistration = async (req, res) => {
  try {
    const { name, email, course, mobile, registrationFees, paymentMethod, transactionId, examDate } = req.body;

    // Basic validation
    if (!name || !email || !course || !mobile || !registrationFees || !paymentMethod || !examDate) {
      return res.status(400).json({ success: false, message: "All fields are required" });
    }

    // Online payment validation
    if (paymentMethod === "online") {
      if (!transactionId) {
        return res.status(400).json({ success: false, message: "Transaction ID is required for online payment" });
      }
      const existingTxn = await RegistrationModule.findOne({ transactionId });
      if (existingTxn) {
        return res.status(400).json({ success: false, message: "Transaction ID already exists" });
      }
    } else if (paymentMethod === "cash") {
      req.body.transactionId = undefined;
    }

    // Check if examDate is Friday
    const selectedDate = new Date(examDate);
    if (selectedDate.getDay() !== 5) {
      return res.status(400).json({ success: false, message: "Exam date must be on a Friday" });
    }

    // Email & mobile uniqueness check
    const existingEmail = await RegistrationModule.findOne({ email });
    if (existingEmail) return res.status(400).json({ success: false, message: "Email already registered" });

    const existingMobile = await RegistrationModule.findOne({ mobile });
    if (existingMobile) return res.status(400).json({ success: false, message: "Mobile number already registered" });

    // Mobile number validation
    if (!/^[0-9]{10}$/.test(mobile)) {
      return res.status(400).json({ success: false, message: "Mobile number must be exactly 10 digits" });
    }

    // Create registration with backend-set creator
    const newRegistration = new RegistrationModule({
      name,
      email,
      course,
      mobile,
      registrationFees,
      paymentMethod,
      transactionId,
      examDate,
      createdBy: "User", // backend sets creator
    });

    const savedData = await newRegistration.save();

    return res.status(201).json({
      success: true,
      message: "Student registered successfully",
      data: savedData,
    });
  } catch (error) {
    console.error("Error creating registration:", error);
    return res.status(500).json({ success: false, message: "Server Error", error: error.message });
  }
};

// Get All Registrations
const getAllRegistrations = async (req, res) => {
  try {
    const registrations = await RegistrationModule.find().sort({ createdAt: -1 });
    return res.status(200).json({ success: true, message: "All registrations fetched", data: registrations });
  } catch (error) {
    console.error("Error fetching registrations:", error);
    return res.status(500).json({ success: false, message: "Server Error", error: error.message });
  }
};

// Get Registration by ID
const getRegistrationUser = async (req, res) => {
  try {
    let { id } = req.params;
    id = id.trim();
    if (!mongoose.Types.ObjectId.isValid(id)) return res.status(400).json({ success: false, message: "Invalid ID" });

    const user = await RegistrationModule.findById(id);
    if (!user) return res.status(404).json({ success: false, message: "User not found" });

    res.json({ success: true, data: user });
  } catch (error) {
    console.error("Error fetching registration:", error);
    return res.status(500).json({ success: false, message: "Server error", error: error.message });
  }
};

// Update Registration
const updateRegistration = async (req, res) => {
  try {
    const registration = await RegistrationModule.findById(req.params.id);
    if (!registration) return res.status(404).json({ success: false, message: "Registration not found" });

    // Set updatedBy dynamically
    let updaterName = "User"; // default
    if (req.body.role === "admin") updaterName = "Admin";
    else if (req.body.role === "hr") updaterName = "HR";

    // Email uniqueness check
    if (req.body.email && req.body.email !== registration.email) {
      const existingEmail = await RegistrationModule.findOne({ email: req.body.email });
      if (existingEmail) return res.status(400).json({ success: false, message: "Email already registered" });
    }

    // Online payment transaction check
    if (req.body.paymentMethod === "online" && !req.body.transactionId) {
      return res.status(400).json({ success: false, message: "Transaction ID is required for online payment" });
    }

    if (req.body.paymentMethod === "cash") req.body.transactionId = undefined;

    // Exam date Friday check
    if (req.body.examDate) {
      const selectedDate = new Date(req.body.examDate);
      if (selectedDate.getDay() !== 5) {
        return res.status(400).json({ success: false, message: "Exam date must be on a Friday" });
      }
    }

    Object.assign(registration, { ...req.body, updatedBy: updaterName });
    const updatedRegistration = await registration.save();

    return res.status(200).json({ success: true, message: "Registration updated successfully", data: updatedRegistration });
  } catch (error) {
    console.error("Error updating registration:", error);
    return res.status(500).json({ success: false, message: "Server Error", error: error.message });
  }
};

// Delete Registration
const deleteRegistration = async (req, res) => {
  try {
    const deleted = await RegistrationModule.findByIdAndDelete(req.params.id);
    if (!deleted) return res.status(404).json({ success: false, message: "Registration not found" });

    return res.status(200).json({ success: true, message: "Registration deleted successfully", deleted });
  } catch (error) {
    console.error("Error deleting registration:", error);
    return res.status(500).json({ success: false, message: "Server Error", error: error.message });
  }
};

// Search Registration by Mobile
const getRegistrationByMobile = async (req, res) => {
  try {
    const { mobile } = req.params;
    const registration = await RegistrationModule.findOne({ mobile });
    if (!registration) return res.status(404).json({ success: false, message: "No registration found with this mobile number" });

    const admission = await admissionModule.findOne({ mobile });

    return res.status(200).json({
      success: true,
      message: "Registration fetched successfully",
      data: { ...registration.toObject(), isAdmitted: !!admission },
    });
  } catch (error) {
    console.error("Error searching registration:", error);
    return res.status(500).json({ success: false, message: "Server Error", error: error.message });
  }
};

module.exports = {
  createRegistration,
  getAllRegistrations,
  getRegistrationUser,
  updateRegistration,
  deleteRegistration,
  getRegistrationByMobile,
};
