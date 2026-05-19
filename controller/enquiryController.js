// const { status } = require("init");
// const enquiryModule = require("../Models/enquiryModule");

// const createnquiry = async (req,res)=>{
//    try {
//      const { name, email, course, mobile, Enquiry_Message} = req.body;
//      if (!name || !email || !course || !mobile || !Enquiry_Message){
//         return res.status(400).json({ success: false, message: "Please enter all fields" });
//      }
//      const userdata = await enquiryModule.create({ name, email, course, mobile, Enquiry_Message});
//         return res.status(201).json({ success: true, message: "Enquiry Form Successfully Submitted", userdata });
//       //   console.log(userdata);

//    } catch (error) {
//     console.error("Error deleting Enquiry form", error);
//     return res.status(500).json({
//       success: false,
//       message: "Server Error",
//       error: error.message,
//     });
//    }  
// }
// // update enquiry 
// const updateenquiry = async (req,res)=>{
//     try {
//      let result = await enquiryModule.findByIdAndUpdate(
//         {_id: req.body.id},
//         {
//             name : req.body.name,
//             email: req.body.email,
//             course: req.body.course,
//             mobile: res.body.mobile,   
//             enquiryModule: res.body.Enquiry_Message
//         },
//         { new: true } 
//      )
//      if(result){
//         res.status(200).json({
//             success: true,
//             message:"Your form successfully Updated"
//         })
//      }
//      else {
//       res.status(404).json({
//         message: "User not found",
//         success: false,
//       });
//     }
//     } catch (error) {
//         res.status(500).json({
//       message: "User not updated",
//       success: false,
//       error: error.message,
//     });
//     }
// }
// // delete enquiry 
// const deleteEnquiry = async (req, res) => {
//   try {
//     const deleted = await enquiryModule.findByIdAndDelete(req.params.id);
//     if (!deleted) return res.status(404).json({ success: false, message: "Enquiry not found" });

//     res.status(200).json({ success: true, message: "Enquiry deleted successfully" });
//   } catch (error) {
//     res.status(500).json({ success: false, message: "Server Error", error: error.message });
//   }
// };
// module.exports = { createnquiry , updateenquiry, deleteEnquiry }



// const enquiryModule = require("../Models/enquiryModule");

// // Create Enquiry
// const createnquiry = async (req, res) => {
//   try {
//     const { name, email, course, mobile, Enquiry_Message } = req.body;

//     if (!name || !email || !course || !mobile || !Enquiry_Message) {
//       return res.status(400).json({ success: false, message: "All fields are required" });
//     }

//     // Create enquiry with backend-set creator
//     const newEnquiry = await enquiryModule.create({
//       name,
//       email,
//       course,
//       mobile,
//       Enquiry_Message,
//       createdBy: "User", // backend sets creator
//     });

//     return res.status(201).json({
//       success: true,
//       message: "Enquiry form submitted successfully",
//       data: newEnquiry,
//     });
//   } catch (error) {
//     console.error("Error creating enquiry:", error);
//     return res.status(500).json({ success: false, message: "Server Error", error: error.message });
//   }
// };

// // Update Enquiry
// const updateenquiry = async (req, res) => {
//   try {
//     const enquiryId = req.params.id;

//     const enquiry = await enquiryModule.findById(enquiryId);
//     if (!enquiry) return res.status(404).json({ success: false, message: "Enquiry not found" });

//     // Set updatedBy dynamically
//     let updaterName = "User"; // default
//     if (req.body.role === "admin") updaterName = "Admin";
//     else if (req.body.role === "hr") updaterName = "HR";

//     // Update fields
//     const fieldsToUpdate = ["name", "email", "course", "mobile", "Enquiry_Message"];
//     fieldsToUpdate.forEach((field) => {
//       if (req.body[field] !== undefined) enquiry[field] = req.body[field];
//     });

//     enquiry.updatedBy = updaterName;

//     const updatedEnquiry = await enquiry.save();

//     return res.status(200).json({ success: true, message: "Enquiry updated successfully", data: updatedEnquiry });
//   } catch (error) {
//     console.error("Error updating enquiry:", error);
//     return res.status(500).json({ success: false, message: "Server Error", error: error.message });
//   }
// };

// // Delete Enquiry
// const deleteEnquiry = async (req, res) => {
//   try {
//     const deleted = await enquiryModule.findByIdAndDelete(req.params.id);
//     if (!deleted) return res.status(404).json({ success: false, message: "Enquiry not found" });

//     return res.status(200).json({ success: true, message: "Enquiry deleted successfully" });
//   } catch (error) {
//     console.error("Error deleting enquiry:", error);
//     return res.status(500).json({ success: false, message: "Server Error", error: error.message });
//   }
// };

// // Get All Enquiries
// // const getAllEnquiries = async (req, res) => {
// //   try {
// //     const enquiries = await enquiryModule.find().sort({ createdAt: -1 });
// //     return res.status(200).json({ success: true, message: "All enquiries fetched", data: enquiries });
// //   } catch (error) {
// //     console.error("Error fetching enquiries:", error);
// //     return res.status(500).json({ success: false, message: "Server Error", error: error.message });
// //   }
// // };

// module.exports = { createnquiry, updateenquiry, deleteEnquiry };



const enquiryModule = require("../Models/enquiryModule");

// Create Enquiry
const createnquiry = async (req, res) => {
  try {
    const { name, email, course, mobile, registrationFees, Enquiry_Message } = req.body;

    if (!name || !email || !course || !mobile || !Enquiry_Message || !registrationFees) {
      return res.status(400).json({ success: false, message: "All fields are required" });
    }

    const newEnquiry = await enquiryModule.create({
      name,
      email,
      course,
      mobile,
      registrationFees,
      Enquiry_Message,
      createdBy: req.user?.role || "User"
      // createdBy: req.user.role || "User", // backend sets creator from logged-in user
    });

    return res.status(201).json({
      success: true,
      message: "Enquiry form submitted successfully",
      data: newEnquiry,
    });
  } catch (error) {
    console.error("Error creating enquiry:", error);
    return res.status(500).json({ success: false, message: "Server Error", error: error.message });
  }
};

// Update Enquiry
const updateenquiry = async (req, res) => {
  try {
    const enquiryId = req.params.id;
    const enquiry = await enquiryModule.findById(enquiryId);
    if (!enquiry) return res.status(404).json({ success: false, message: "Enquiry not found" });

    // Only admin/super-admin or creator can update
    if (
      req.user.role !== "admin" &&
      req.user.role !== "super-admin" &&
      enquiry.createdBy !== req.user.role &&
      enquiry.createdBy !== req.user.email
    ) {
      return res.status(403).json({ success: false, message: "Forbidden: Cannot update this enquiry" });
    }

    // Update fields dynamically
    const fieldsToUpdate = ["name", "email", "course", "mobile", "Enquiry_Message"];
    fieldsToUpdate.forEach((field) => {
      if (req.body[field] !== undefined) enquiry[field] = req.body[field];
    });

    enquiry.updatedBy = req.user.role || "User";
    const updatedEnquiry = await enquiry.save();

    return res.status(200).json({ success: true, message: "Enquiry updated successfully", data: updatedEnquiry });
  } catch (error) {
    console.error("Error updating enquiry:", error);
    return res.status(500).json({ success: false, message: "Server Error", error: error.message });
  }
};

// Delete Enquiry
const deleteEnquiry = async (req, res) => {
  try {
    const enquiry = await enquiryModule.findById(req.params.id);
    if (!enquiry) return res.status(404).json({ success: false, message: "Enquiry not found" });

    // Only admin/super-admin can delete
    if (req.user.role !== "admin" && req.user.role !== "super-admin") {
      return res.status(403).json({ success: false, message: "Forbidden: Cannot delete this enquiry" });
    }

    await enquiryModule.findByIdAndDelete(req.params.id);
    return res.status(200).json({ success: true, message: "Enquiry deleted successfully" });
  } catch (error) {
    console.error("Error deleting enquiry:", error);
    return res.status(500).json({ success: false, message: "Server Error", error: error.message });
  }
};

// Get All Enquiries (admin/HR)
const getAllEnquiries = async (req, res) => {
  try {
    const enquiries = await enquiryModule.find().sort({ createdAt: -1 });
    return res.status(200).json({ success: true, message: "All enquiries fetched", data: enquiries });
  } catch (error) {
    console.error("Error fetching enquiries:", error);
    return res.status(500).json({ success: false, message: "Server Error", error: error.message });
  }
};

module.exports = { createnquiry, updateenquiry, deleteEnquiry, getAllEnquiries };

