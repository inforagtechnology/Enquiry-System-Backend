// const Admission = require("../Models/admissionModule");
// const Enquiry = require("../Models/enquiryModule");
// const Registration = require("../Models/registationModule");

// // User own data 
// exports.getUserData = async (req, res) => {
//   try {
//     const userId = req.user._id;

//     const admission = await Admission.find({ userId})
//     // .select("_id fullName phone email course payment  ")
    
//     const enquiry = await Enquiry.find({ userId });
//     const registration = await Registration.find({ userId });

//     res.json({ admission, enquiry, registration });
//   } catch (err) {
//     res.status(500).json({ msg: "Error fetching user data", error: err.message });
//   }
// };

// // HR data (without installments)
// exports.getHRData = async (req, res) => {
//   try {
//     const admission = await Admission.find({}, "-installment"); // exclude installment
//     const enquiry = await Enquiry.find();
//     const registration = await Registration.find();

//     res.json({ admission, enquiry, registration });
//   } catch (err) {
//     res.status(500).json({ msg: "Error fetching HR data", error: err.message });
//   }
// };

// // Admin / Super Admin data (full access)
// exports.getAllData = async (req, res) => {
//   try {
//     const admission = await Admission.find();
//     const enquiry = await Enquiry.find();
//     const registration = await Registration.find();

//     res.json({ admission, enquiry, registration });
//   } catch (err) {
//     res.status(500).json({ msg: "Error fetching all data", error: err.message });
//   }
// };

// // Notification after every 50 admissions
// exports.checkNotification = async (req, res) => {
//   try {
//     const count = await Admission.countDocuments();
//     if (count % 50 === 0 && count > 0) {
//       return res.json({ notify: true, msg: `🎉 ${count} admissions completed!` });
//     }
//     res.json({ notify: false, count });
//   } catch (err) {
//     res.status(500).json({ msg: "Error checking notifications", error: err.message });
//   }
// };


// // Helper to get correct model
// const getModel = (module) => {
//   switch (module) {
//     case "admission":
//       return Admission;
//     case "registration":
//       return Registration;
//     case "enquiry":
//       return Enquiry;
//     default:
//       return null;
//   }
// };

// // ---------- Update ----------
// exports.updateData = async (req, res) => {
//   try {
//     const { module, id } = req.params;
//     const updateData = req.body;
//     updateData.updatedBy = req.user._id;
//     updateData.updatedAt = new Date();

//     const Model = getModel(module);
//     if (!Model) return res.status(400).json({ msg: "Invalid module" });

//     const updated = await Model.findByIdAndUpdate(id, updateData, {
//       new: true,
//       runValidators: true,
//     });

//     if (!updated) return res.status(404).json({ msg: "Record not found" });

//     res.json({ msg: "Record updated successfully", data: updated });
//   } catch (err) {
//     res.status(500).json({ msg: "Error updating data", error: err.message });
//   }
// };

// // ---------- Delete ----------
// exports.deleteData = async (req, res) => {
//   try {
//     const { module, id } = req.params;

//     const Model = getModel(module);
//     if (!Model) return res.status(400).json({ msg: "Invalid module" });

//     const deleted = await Model.findByIdAndDelete(id);

//     if (!deleted) return res.status(404).json({ msg: "Record not found" });

//     res.json({ msg: "Record deleted successfully" });
//   } catch (err) {
//     res.status(500).json({ msg: "Error deleting data", error: err.message });
//   }
// };







// const Admission = require("../Models/admissionModule");
// const Enquiry = require("../Models/enquiryModule");
// const Registration = require("../Models/registationModule");

// // ===================== User Data =====================
// exports.getUserData = async (req, res) => {
//   try {
//     const userId = req.user._id;

//     const admission = await Admission.find({ userId });
//     const enquiry = await Enquiry.find({ userId });
//     const registration = await Registration.find({ userId });

//     res.json({ admission, enquiry, registration });
//   } catch (err) {
//     res.status(500).json({ msg: "Error fetching user data", error: err.message });
//   }
// };

// // ===================== HR Data =====================
// exports.getHRData = async (req, res) => {
//   try {
//     const admission = await Admission.find(); // HR can see all fields
//     const enquiry = await Enquiry.find();
//     const registration = await Registration.find();

//     res.json({ admission, enquiry, registration });
//   } catch (err) {
//     res.status(500).json({ msg: "Error fetching HR data", error: err.message });
//   }
// };

// // ===================== Admin / Super Admin =====================
// exports.getAllData = async (req, res) => {
//   try {
//     const admission = await Admission.find();
//     const enquiry = await Enquiry.find();
//     const registration = await Registration.find();

//     res.json({ admission, enquiry, registration });
//   } catch (err) {
//     res.status(500).json({ msg: "Error fetching all data", error: err.message });
//   }
// };

// // ===================== Notification =====================
// exports.checkNotification = async (req, res) => {
//   try {
//     const count = await Admission.countDocuments();
//     if (count % 50 === 0 && count > 0) {
//       return res.json({ notify: true, msg: `🎉 ${count} admissions completed!` });
//     }
//     res.json({ notify: false, count });
//   } catch (err) {
//     res.status(500).json({ msg: "Error checking notifications", error: err.message });
//   }
// };

// // ===================== Helper =====================
// const getModel = (module) => {
//   switch (module) {
//     case "admission":
//       return Admission;
//     case "registration":
//       return Registration;
//     case "enquiry":
//       return Enquiry;
//     default:
//       return null;
//   }
// };

// // ===================== Update =====================
// exports.updateData = async (req, res) => {
//   try {
//     const { module, id } = req.params;
//     const updateData = req.body;
//     const user = req.user;

//     const Model = getModel(module);
//     if (!Model) return res.status(400).json({ msg: "Invalid module" });

//     const record = await Model.findById(id);
//     if (!record) return res.status(404).json({ msg: "Record not found" });

//     // ---------- HR restrictions ----------
//     if (user.role === "HR") {
//       if (module !== "admission") {
//         return res.status(403).json({ msg: "HR cannot edit this module" });
//       }

//       if (!updateData.payment || !updateData.payment.secondInstallment) {
//         return res.status(403).json({ msg: "HR can only edit secondInstallment" });
//       }

//       record.payment.secondInstallment.mode =
//         updateData.payment.secondInstallment.mode ||
//         record.payment.secondInstallment.mode;

//       record.payment.secondInstallment.transactionId =
//         updateData.payment.secondInstallment.transactionId ||
//         record.payment.secondInstallment.transactionId;

//       record.updatedBy = user._id;
//       record.updatedAt = new Date();

//       await record.save();
//       return res.json({ msg: "Second installment updated", data: record });
//     }

//     // ---------- Admin / Super Admin ----------
//     if (["admin", "super-admin"].includes(user.role)) {
//       Object.assign(record, updateData);
//       // record.updatedBy = user.name
//       record.updatedBy = user._id.name;
//       record.updatedAt = new Date();
//       await record.save();
//       return res.json({ msg: "Record updated successfully", data: record });
//     }

//     // ---------- Normal user ----------
//     return res.status(403).json({ msg: "You do not have permission to edit this record" });
//   } catch (err) {
//     res.status(500).json({ msg: "Error updating data", error: err.message });
//   }
// };

// // ===================== Delete =====================
// exports.deleteData = async (req, res) => {
//   try {
//     const { module, id } = req.params;
//     const user = req.user;

//     const Model = getModel(module);
//     if (!Model) return res.status(400).json({ msg: "Invalid module" });

//     const record = await Model.findById(id);
//     if (!record) return res.status(404).json({ msg: "Record not found" });

//     // ---------- HR cannot delete ----------
//     if (user.role === "HR") {
//       return res.status(403).json({ msg: "HR cannot delete records" });
//     }

//     // ---------- Admin / Super Admin ----------
//     if (["admin", "super-admin"].includes(user.role)) {
//       await record.remove();
//       return res.json({ msg: "Record deleted successfully" });
//     }

//     // ---------- Normal user ----------
//     return res.status(403).json({ msg: "You do not have permission to delete this record" });
//   } catch (err) {
//     res.status(500).json({ msg: "Error deleting data", error: err.message });
//   }
// };





const Admission = require("../Models/admissionModule");
const Enquiry = require("../Models/enquiryModule");
const Registration = require("../Models/registationModule");
const User = require("../Models/User"); // ✅ Added for name lookup
const mongoose = require("mongoose")

// ===================== User Data =====================
exports.getUserData = async (req, res) => {
  try {
    const userId = req.user._id;

    const admission = await Admission.find({ userId });
    const enquiry = await Enquiry.find({ userId });
    const registration = await Registration.find({ userId });

    res.json({ admission, enquiry, registration });
  } catch (err) {
    res.status(500).json({ msg: "Error fetching user data", error: err.message });
  }
};

// ===================== HR Data =====================
exports.getHRData = async (req, res) => {
  try {
    const admission = await Admission.find();
    const enquiry = await Enquiry.find();
    const registration = await Registration.find();

    res.json({ admission, enquiry, registration });
  } catch (err) {
    res.status(500).json({ msg: "Error fetching HR data", error: err.message });
  }
};

// ===================== Admin / Super Admin =====================
exports.getAllData = async (req, res) => {
  try {
    const admission = await Admission.find();
    const enquiry = await Enquiry.find();
    const registration = await Registration.find();

    res.json({ admission, enquiry, registration });
  } catch (err) {
    res.status(500).json({ msg: "Error fetching all data", error: err.message });
  }
};

// ===================== Notification =====================
exports.checkNotification = async (req, res) => {
  try {
    const count = await Admission.countDocuments();
    if (count % 50 === 0 && count > 0) {
      return res.json({ notify: true, msg: `🎉 ${count} admissions completed!` });
    }
    res.json({ notify: false, count });
  } catch (err) {
    res.status(500).json({ msg: "Error checking notifications", error: err.message });
  }
};

// ===================== Helper =====================
const getModel = (module) => {
  switch (module) {
    case "admission":
      return Admission;
    case "registration":
      return Registration;
    case "enquiry":
      return Enquiry;
    default:
      return null;
  }
};

// ===================== Update =====================
exports.updateData = async (req, res) => {
  try {
    const { module, id } = req.params;
    const updateData = req.body;
    const user = req.user;

    const Model = getModel(module);
    if (!Model) return res.status(400).json({ msg: "Invalid module" });

    const record = await Model.findById(id);
    if (!record) return res.status(404).json({ msg: "Record not found" });

    // Fetch full user info for updatedBy
    const userData = await User.findById(user._id).select("name role");

    // ---------- HR restrictions ----------
    if (user.role === "HR") {
      if (module !== "admission") {
        return res.status(403).json({ msg: "HR cannot edit this module" });
      }

      if (!updateData.payment || !updateData.payment.secondInstallment) {
        return res.status(403).json({ msg: "HR can only edit secondInstallment" });
      }

      record.payment.secondInstallment.mode =
        updateData.payment.secondInstallment.mode ||
        record.payment.secondInstallment.mode;

      record.payment.secondInstallment.transactionId =
        updateData.payment.secondInstallment.transactionId ||
        record.payment.secondInstallment.transactionId;

      record.updatedBy = `${userData.name} (${userData.role})`;
      // record.updatedBy = userData.name
      record.updatedAt = new Date();

      await record.save();
      return res.json({ msg: "Second installment updated", data: record });
    }

    // ---------- Admin / Super Admin ----------
    if (["admin", "super-admin"].includes(user.role)) {
      Object.assign(record, updateData);
      record.updatedBy = `${userData.name} (${userData.role})`;
      record.updatedAt = new Date();
      await record.save();
      return res.json({ msg: "Record updated successfully", data: record });
    }

    // ---------- Normal user ----------
    return res.status(403).json({ msg: "You do not have permission to edit this record" });
  } catch (err) {
    res.status(500).json({ msg: "Error updating data", error: err.message });
  }
};

// ===================== Delete =====================
// exports.deleteData = async (req, res) => {
//   try {
//     const { module, id } = req.params;
//     const user = req.user;

//     const Model = getModel(module);
//     if (!Model) return res.status(400).json({ msg: "Invalid module" });

//     const record = await Model.findById(id);
//     if (!record) return res.status(404).json({ msg: "Record not found" });

//     // ---------- HR cannot delete ----------
//     if (user.role === "HR") {
//       return res.status(403).json({ msg: "HR cannot delete records" });
//     }

//     // ---------- Admin / Super Admin ----------
//     if (["admin", "super-admin"].includes(user.role)) {
//       await record.remove();
//       return res.json({ msg: "Record deleted successfully" });
//     }

//     // ---------- Normal user ----------
//     return res.status(403).json({ msg: "You do not have permission to delete this record" });
//   } catch (err) {
//     res.status(500).json({ msg: "Error deleting data", error: err.message });
//   }
// };


exports.deleteData = async (req, res) => {
  try {
    const { module, id } = req.params;
    const user = req.user;

    // ✅ Ensure the user exists (added safety)
    if (!user) {
      return res.status(401).json({ msg: "Unauthorized: User not found" });
    }

    // ✅ Validate MongoDB ID
    if (!mongoose.Types.ObjectId.isValid(id)) {
      return res.status(400).json({ msg: "Invalid ID format" });
    }

    // ✅ Get correct model
    const Model = getModel(module);
    if (!Model) {
      return res.status(400).json({ msg: "Invalid module" });
    }

    // ✅ Find record
    const record = await Model.findById(id);
    if (!record) {
      return res.status(404).json({ msg: "Record not found" });
    }

    // ✅ Role restrictions
    if (user.role === "HR") {
      return res.status(403).json({ msg: "HR cannot delete records" });
    }

    if (["admin", "super-admin"].includes(user.role)) {
      await Model.findByIdAndDelete(id);
      return res.json({ msg: "Record deleted successfully" });
    }

    return res.status(403).json({ msg: "You do not have permission to delete this record" });

  } catch (err) {
    console.error("❌ Error in deleteData:", err);
    res.status(500).json({ msg: "Error deleting data", error: err.message });
  }
};