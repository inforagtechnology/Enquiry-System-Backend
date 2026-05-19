// const express = require("express");
// const {createRegistration, getRegistrationUser, deleteRegistration, updateRegistration, getRegistrationByMobile, getAllRegistrations} = require("../controller/registrationController");
// const registrationrouter = express.Router()
// // create new student registration 
// registrationrouter.post('/register', createRegistration)
// //  Get single registration by ID
// registrationrouter.get("/get_user/:id", getRegistrationUser);
// // Delete Register USer
// registrationrouter.delete("/delete_user/:id", deleteRegistration)
// // Update Register User
// registrationrouter.put("/update_user/:id", updateRegistration)
// // Search router by mobile number
// registrationrouter.get("/search/:mobile", getRegistrationByMobile);
// //Get all register user
// registrationrouter.get("/getall_registrations", getAllRegistrations) 
// module.exports = registrationrouter



const express = require("express");
const {
  createRegistration,
  getRegistrationUser,
  deleteRegistration,
  updateRegistration,
  getRegistrationByMobile,
  getAllRegistrations
} = require("../controller/registrationController");

const { authMiddleware, authorizeRoles } = require("../middlewares/authMiddleware");

const registrationrouter = express.Router();

// Create new student registration (open to authenticated user)
registrationrouter.post('/register', createRegistration);

// Get single registration by ID (authenticated)
registrationrouter.get("/get_user/:id", authMiddleware, getRegistrationUser);

// Delete Register User (only admin)
registrationrouter.delete(
  "/delete_user/:id",
  authMiddleware,
  authorizeRoles("admin", "super-admin"),
  deleteRegistration
);

// Update Register User (admin, super-admin or own data)
registrationrouter.put(
  "/update_user/:id",
  authMiddleware,
  updateRegistration
);

// Search registration by mobile number
registrationrouter.get("/search/:mobile", getRegistrationByMobile);

// Get all registered users (admin/HR)
registrationrouter.get(
  "/getall_registrations",
  authMiddleware,
  authorizeRoles("admin", "super-admin", "HR"),
  getAllRegistrations
);

module.exports = registrationrouter;
