// const express = require("express");
// const router = express.Router();
// const {
//   getUserData,
//   getHRData,
//   getAllData,
//   checkNotification,
// } = require("../controller/dashboardController");

// const { authMiddleware, authorizeRoles } = require("../middlewares/authMiddleware");

// // User -> apna data
// router.get("/mydata", authMiddleware, getUserData);

// // HR -> enquiry, admission, registration
// router.get("/hrdata", authMiddleware, authorizeRoles("HR"), getHRData);

// // Admin & SuperAdmin -> all data
// router.get("/all", authMiddleware, authorizeRoles("admin", "super-admin"), getAllData);

// // Notification -> every 50 admissions
// router.get("/notify", authMiddleware, authorizeRoles("admin", "super-admin"), checkNotification);

// module.exports = router;



const express = require("express");
const router = express.Router();
const { authMiddleware, authorizeRoles } = require("../middlewares/authMiddleware");
const { getHRData, getAllData, getUserData, checkNotification, updateData, deleteData } = require("../controller/dashboardController");

// User -> own data
router.get("/mydata", authMiddleware, getUserData);

// HR -> only HR data
router.get("/hrdata", authMiddleware, authorizeRoles("HR"), getHRData);

// Admin & SuperAdmin -> all data
router.get("/all", authMiddleware, authorizeRoles("admin", "super-admin"), getAllData);
// notification
router.get("/checkNotification", checkNotification);
// ✅ Update record dynamically (works for registration/admission/enquiry)
router.put("/:module/:id", authMiddleware, updateData);

// ✅ Delete record dynamically (works for registration/admission/enquiry)
router.delete("/:module/:id", authMiddleware, deleteData);

module.exports = router;
