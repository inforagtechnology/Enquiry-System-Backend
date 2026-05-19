// const express = require("express");
// const {createnquiry, updateenquiry, deleteEnquiry} = require("../controller/enquiryController");

// const enquiryrouter =  express.Router()
// // create enquiry
// enquiryrouter.post("/Create_enquiry", createnquiry);
// // update enquiry form
// enquiryrouter.put("/update_enquiry/:id", updateenquiry)
// // delete enquiry form
// enquiryrouter.delete("/delete_enquiry/:id", deleteEnquiry)
// module.exports = enquiryrouter;



const express = require("express");
const { createnquiry, updateenquiry, deleteEnquiry, getAllEnquiries } = require("../controller/enquiryController");
const { authMiddleware, authorizeRoles } = require("../middlewares/authMiddleware");

const enquiryRouter = express.Router();

// Create enquiry (any authenticated user)
enquiryRouter.post("/Create_enquiry", createnquiry);

// Update enquiry (admin/super-admin or creator)
enquiryRouter.put("/update_enquiry/:id", authMiddleware, updateenquiry);

// Delete enquiry (admin/super-admin only)
enquiryRouter.delete("/delete_enquiry/:id", authMiddleware, deleteEnquiry);

// Get all enquiries (admin/HR)
enquiryRouter.get("/all", authMiddleware, authorizeRoles("admin", "super-admin", "HR"), getAllEnquiries);

module.exports = enquiryRouter;
