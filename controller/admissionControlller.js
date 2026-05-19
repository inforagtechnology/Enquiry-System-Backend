
// const admissionModule = require("../Models/admissionModule");

// // Create Admission
// const createAdmission = async (req, res) => {
//   try {
//     const { fullName, mobile, email, course, payment } = req.body;
//     if(!payment.firstInstallment){
//       return res.status(400).json({
//         success:false,
//         message:"first Installment is required"
//       })
//     }
//     // Basic validation
//     if (!fullName || !mobile || !email || !course || !payment?.firstInstallment) {
//       return res.status(400).json({ success: false, message: "All required fields must be filled" });
//     }
//     // admission validation
//      const existingAdmission = await admissionModule.findOne({ mobile });
//     if(existingAdmission) return res.status(400).json({ success:false, message:"User already admitted" });
//     // Email exists check
//     const emailExists = await admissionModule.findOne({email});
//     if (emailExists) {
//       return res.status(400).json({ success: false, message: "Email already registered" });
//     }
//     // Mobile exists check 
//     const mobileExists = await admissionModule.findOne({mobile})
//     if(mobileExists) {
//       return res.status(400).json({
//         success: false,
//         message: "Mobile already registered"
//       })
//     }
//     //  Mobile number validation
//     if (!/^[0-9]{10}$/.test(mobile)) {
//       return res.status(400).json({
//         success: false,
//         message: "Mobile number must be exactly 10 digits",
//       });
//     }
//     // Clean up: if 2nd installment mode empty → remove it
//     if (payment.secondInstallment && !payment.secondInstallment.mode) {
//       delete payment.secondInstallment;
//     }

//     // Validate transactionId for "online"
//     ["firstInstallment", "secondInstallment"].forEach((inst) => {
//       if (payment[inst]?.mode === "online" && !payment[inst].transactionId) {
//         throw new Error(`${inst} requires transaction ID for online payment`);
//       }
//     });

//     const admission = await admissionModule.create({ fullName, mobile, email, course, payment });

//     res.status(201).json({ success: true, message: "Admission created successfully", admission });
//     console.log(admission)
//   } catch (error) {
//     console.error(error);
//     res.status(400).json({ success: false, message: error.message });
//   }
// };



// // Get all admissions
// const getAdmissions = async (req, res) => {
//   try {
//     const admissions = await admissionModule.find().sort({ createdAt: -1 });
//     res.status(200).json({ success: true, admissions });
//   } catch (error) {
//     res.status(500).json({ success: false, message: "Server Error" });
//   }
// };

// // Update Admission by ID
// const updateAdmission = async (req, res) => {
//   try {
//     const admissionId = req.params.id;
//     const { fullName, mobile, email, course, payment } = req.body;

//     // Email uniqueness check
//     if (email) {
//       const emailExists = await admissionModule.findOne({ email, _id: { $ne: admissionId } });
//       if (emailExists) {
//         return res.status(400).json({ success: false, message: "Email already registered" });
//       }
//     }

//     // Validate transaction IDs if mode is online
//     if (payment) {
//       ["firstInstallment", "secondInstallment"].forEach(inst => {
//         if (payment[inst] && payment[inst].mode === "online" && !payment[inst].transactionId) {
//           throw new Error(`${inst} requires transaction ID for online payment`);
//         }
//       });
//     }

//     const updatedAdmission = await admissionModule.findByIdAndUpdate(admissionId, { $set: req.body }, { new: true });
//     if (!updatedAdmission) {
//       return res.status(404).json({ success: false, message: "Admission not found" });
//     }

//     res.status(200).json({ success: true, message: "Admission updated", updatedAdmission });
//   } catch (error) {
//     res.status(400).json({ success: false, message: error.message });
//   }
// };

// // Delete Admission
// const deleteAdmission = async (req, res) => {
//   try {
//     const admissionId = req.params.id;
//     const deleted = await admissionModule.findByIdAndDelete(admissionId);
//     if (!deleted) {
//       return res.status(404).json({ success: false, message: "Admission not found" });
//     }
//     res.status(200).json({ success: true, message: "Admission deleted" });
//   } catch (error) {
//     res.status(500).json({ success: false, message: "Server Error" });
//   }
// };
// // search by mobile number

// const getadmissionByMobile  = async(req,res)=>{
//   try {
//     const {mobile}= req.params
//     const admission = await admissionModule.findOne({mobile})
//     if(!admission){
//       return res.status(404).json({
//         success: false,
//         message: "No User found",
//       });
//     }
//     res.status(200).json({
//       success: true,
//       data: admission,   
//     });
//   } catch (error) {
//       res.status(500).json({
//       success: false,
//       message: "Server Error",
//     });
//   }
// }
// module.exports = {createAdmission, getAdmissions, updateAdmission, deleteAdmission, getadmissionByMobile };



// const admissionModule = require("../Models/admissionModule");

// // Create Admission
// const createAdmission = async (req, res) => {
//   try {
//     const { fullName, mobile, email, course, payment } = req.body;

//     if (!fullName || !mobile || !email || !course || !payment?.firstInstallment) {
//       return res.status(400).json({ success: false, message: "All required fields must be filled" });
//     }

//     // Check if user already admitted
//     const existingAdmission = await admissionModule.findOne({ mobile });
//     if (existingAdmission) return res.status(400).json({ success: false, message: "User already admitted" });

//     // Check email & mobile uniqueness
//     const emailExists = await admissionModule.findOne({ email });
//     if (emailExists) return res.status(400).json({ success: false, message: "Email already registered" });

//     const mobileExists = await admissionModule.findOne({ mobile });
//     if (mobileExists) return res.status(400).json({ success: false, message: "Mobile already registered" });

//     // Mobile number validation
//     if (!/^[0-9]{10}$/.test(mobile)) {
//       return res.status(400).json({ success: false, message: "Mobile number must be exactly 10 digits" });
//     }

//     // Clean up 2nd installment if empty
//     if (payment.secondInstallment && !payment.secondInstallment.mode) {
//       delete payment.secondInstallment;
//     }

//     // Validate transactionId for "online"
//     ["firstInstallment", "secondInstallment"].forEach((inst) => {
//       if (payment[inst]?.mode === "online" && !payment[inst].transactionId) {
//         throw new Error(`${inst} requires transaction ID for online payment`);
//       }
//     });

//     // Backend sets createdBy
//     const admission = await admissionModule.create({
//       fullName,
//       mobile,
//       email,
//       course,
//       payment,
//       createdBy: "User", // ⚡ Backend sets creator
//     });

//     res.status(201).json({ success: true, message: "Admission created successfully", admission });
//   } catch (error) {
//     console.error(error);
//     res.status(400).json({ success: false, message: error.message });
//   }
// };

// // Get all admissions
// const getAdmissions = async (req, res) => {
//   try {
//     const admissions = await admissionModule.find().sort({ createdAt: -1 });
//     res.status(200).json({ success: true, admissions });
//   } catch (error) {
//     res.status(500).json({ success: false, message: "Server Error" });
//   }
// };

// // Update Admission by ID
// const updateAdmission = async (req, res) => {
//   try {
//     const admissionId = req.params.id;

//     const admission = await admissionModule.findById(admissionId);
//     if (!admission) return res.status(404).json({ success: false, message: "Admission not found" });

//     // Determine updater
//     let updaterName = "User"; // default
//     if (req.body.role === "admin") updaterName = "Admin";
//     else if (req.body.role === "hr") updaterName = "HR";

//     // Validate transaction IDs if mode is online
//     const { payment } = req.body;
//     if (payment) {
//       ["firstInstallment", "secondInstallment"].forEach(inst => {
//         if (payment[inst]?.mode === "online" && !payment[inst].transactionId) {
//           throw new Error(`${inst} requires transaction ID for online payment`);
//         }
//       });
//     }

//     // Update admission with updatedBy
//     Object.assign(admission, { ...req.body, updatedBy: updaterName });
//     const updatedAdmission = await admission.save();

//     res.status(200).json({ success: true, message: "Admission updated successfully", updatedAdmission });
//   } catch (error) {
//     res.status(400).json({ success: false, message: error.message });
//   }
// };

// // Delete Admission
// const deleteAdmission = async (req, res) => {
//   try {
//     const admissionId = req.params.id;
//     const deleted = await admissionModule.findByIdAndDelete(admissionId);
//     if (!deleted) return res.status(404).json({ success: false, message: "Admission not found" });

//     res.status(200).json({ success: true, message: "Admission deleted" });
//   } catch (error) {
//     res.status(500).json({ success: false, message: "Server Error" });
//   }
// };

// // Search by mobile number
// const getAdmissionByMobile = async (req, res) => {
//   try {
//     const { mobile } = req.params;
//     const admission = await admissionModule.findOne({ mobile });
//     if (!admission) return res.status(404).json({ success: false, message: "No User found" });

//     res.status(200).json({ success: true, data: admission });
//   } catch (error) {
//     res.status(500).json({ success: false, message: "Server Error" });
//   }
// };

// module.exports = { createAdmission, getAdmissions, updateAdmission, deleteAdmission, getAdmissionByMobile };









const admissionModule = require("../Models/admissionModule");

// Create Admission
// const createAdmission = async (req, res) => {
//   try {
//     const { fullName, mobile, email, course, payment } = req.body;

//     if (!fullName || !mobile || !email || !course || !payment?.firstInstallment) {
//       return res.status(400).json({ success: false, message: "All required fields must be filled" });
//     }

//     // Check if user already admitted
//     const existingAdmission = await admissionModule.findOne({ mobile });
//     if (existingAdmission) return res.status(400).json({ success: false, message: "User already admitted" });

//     // Email & mobile uniqueness check
//     const emailExists = await admissionModule.findOne({ email });
//     if (emailExists) return res.status(400).json({ success: false, message: "Email already registered" });

//     const mobileExists = await admissionModule.findOne({ mobile });
//     if (mobileExists) return res.status(400).json({ success: false, message: "Mobile already registered" });

//     // Mobile validation
//     if (!/^[0-9]{10}$/.test(mobile)) {
//       return res.status(400).json({ success: false, message: "Mobile number must be exactly 10 digits" });
//     }

//     // Validate transactionId for "online"
//     ["firstInstallment", "secondInstallment"].forEach((inst) => {
//       if (payment[inst]?.mode === "online" && !payment[inst].transactionId) {
//         throw new Error(`${inst} requires transaction ID for online payment`);
//       }
//     });

//     const admission = await admissionModule.create({
//       fullName,
//       mobile,
//       email,
//       course,
//       payment,
//       createdBy: req.user?.role || "User",
//       // createdBy: req.user.role ||  "User", // Backend sets creator
//     });

//     res.status(201).json({ success: true, message: "Admission created successfully", data: admission });
//   } catch (error) {
//     console.error(error);
//     res.status(400).json({ success: false, message: error.message });
//   }
// };
const createAdmission = async (req, res) => {
  try {
    const { fullName, mobile, email, course, payment } = req.body;

    if (!fullName || !mobile || !email || !course || !payment?.firstInstallment) {
      return res.status(400).json({
        success: false,
        message: "All required fields must be filled",
      });
    }

    // Prevent duplicate admissions
    const existingAdmission = await admissionModule.findOne({ mobile });
    if (existingAdmission)
      return res
        .status(400)
        .json({ success: false, message: "User already admitted" });

    // Email uniqueness check
    const emailExists = await admissionModule.findOne({ email });
    if (emailExists)
      return res
        .status(400)
        .json({ success: false, message: "Email already registered" });

    // Validate mobile format
    if (!/^[0-9]{10}$/.test(mobile)) {
      return res.status(400).json({
        success: false,
        message: "Mobile number must be exactly 10 digits",
      });
    }

    // 🧹 Clean up 2nd installment if mode is empty or missing
    if (
      !payment.secondInstallment ||
      !payment.secondInstallment.mode ||
      payment.secondInstallment.mode.trim() === ""
    ) {
      delete payment.secondInstallment;
    }

    // ✅ Validate transactionId only for "online" payments
    ["firstInstallment", "secondInstallment"].forEach((inst) => {
      if (payment[inst]?.mode === "online" && !payment[inst].transactionId) {
        throw new Error(`${inst} requires transaction ID for online payment`);
      }
    });

    // ✅ Create admission
    const admission = await admissionModule.create({
      fullName,
      mobile,
      email,
      course,
      payment,
      createdBy: req.user?.role || "User",
    });

    res.status(201).json({
      success: true,
      message: "Admission created successfully",
      data: admission,
    });
  } catch (error) {
    console.error("Create Admission Error:", error);
    res.status(400).json({ success: false, message: error.message });
  }
};

// Get all admissions (admin/HR)
const getAdmissions = async (req, res) => {
  try {
    const admissions = await admissionModule.find().sort({ createdAt: -1 });
    res.status(200).json({ success: true, data: admissions });
  } catch (error) {
    res.status(500).json({ success: false, message: "Server Error" });
  }
};

// Update Admission by ID
const updateAdmission = async (req, res) => {
  try {
    const admissionId = req.params.id;
    const admission = await admissionModule.findById(admissionId);
    if (!admission) return res.status(404).json({ success: false, message: "Admission not found" });

    // Determine updater
    let updaterName = "User"; // default
    if (req.user.role === "admin") updaterName = "Admin";
    else if (req.user.role === "super-admin") updaterName = "Super-admin";
    else if (req.user.role === "HR") return res.status(403).json({ success: false, message: "HR cannot update" });

    // Users can update only their own admission
    if (req.user.role === "User" && admission.createdBy !== "User") {
      return res.status(403).json({ success: false, message: "Cannot update this admission" });
    }

    // Validate transaction IDs if online
    const { payment } = req.body;
    if (payment) {
      ["firstInstallment", "secondInstallment"].forEach(inst => {
        if (payment[inst]?.mode === "online" && !payment[inst].transactionId) {
          throw new Error(`${inst} requires transaction ID for online payment`);
        }
      });
    }

    Object.assign(admission, { ...req.body, updatedBy: updaterName });
    const updatedAdmission = await admission.save();

    res.status(200).json({ success: true, message: "Admission updated successfully", data: updatedAdmission });
  } catch (error) {
    res.status(400).json({ success: false, message: error.message });
  }
};

// Delete Admission
const deleteAdmission = async (req, res) => {
  try {
    const admissionId = req.params.id;
    const admission = await admissionModule.findById(admissionId);
    if (!admission) return res.status(404).json({ success: false, message: "Admission not found" });

    // Only admin/super-admin can delete
    if (req.user.role !== "admin" && req.user.role !== "super-admin") {
      return res.status(403).json({ success: false, message: "Forbidden: Cannot delete" });
    }

    await admissionModule.findByIdAndDelete(admissionId);
    res.status(200).json({ success: true, message: "Admission deleted successfully" });
  } catch (error) {
    res.status(500).json({ success: false, message: "Server Error" });
  }
};

// Get admission by mobile
const getAdmissionByMobile = async (req, res) => {
  try {
    const { mobile } = req.params;
    const admission = await admissionModule.findOne({ mobile });
    if (!admission) return res.status(404).json({ success: false, message: "No user found" });

    res.status(200).json({ success: true, data: admission });
  } catch (error) {
    res.status(500).json({ success: false, message: "Server Error" });
  }
};

module.exports = { createAdmission, getAdmissions, updateAdmission, deleteAdmission, getAdmissionByMobile };
