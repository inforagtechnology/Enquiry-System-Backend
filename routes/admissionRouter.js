// const express = require("express");
// const {createAdmission, deleteAdmission, updateAdmission} = require("../controller/admissionControlller");
// const admissionrouter = express.Router()
// // create admission
// admissionrouter.post("/admission_create", createAdmission)
// // delete admission
// admissionrouter.delete("/delete_admission/:id", deleteAdmission)
// // Edit and update
// admissionrouter.put("/update_admission/:id", updateAdmission)
// module.exports = admissionrouter;



const express = require("express");
const { createAdmission, getAdmissions, updateAdmission, deleteAdmission, getAdmissionByMobile } = require("../controller/admissionControlller");
const { authMiddleware, authorizeRoles } = require("../middlewares/authMiddleware");

const admissionRouter = express.Router();

// Create admission (any authenticated user)
admissionRouter.post("/admission_create", createAdmission);

// Get all admissions (admin/HR)
admissionRouter.get("/all", authMiddleware, authorizeRoles("admin", "super-admin", "HR"), getAdmissions);

// Update admission
admissionRouter.put("/update_admission/:id" , authMiddleware, updateAdmission);

// Delete admission
admissionRouter.delete("/delete_admission/:id", authMiddleware, deleteAdmission);

// Get admission by mobile
admissionRouter.get("/search/:mobile", authMiddleware, getAdmissionByMobile);

module.exports = admissionRouter;
