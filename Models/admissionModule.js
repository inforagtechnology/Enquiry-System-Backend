// const mongoose = require("mongoose");

// // Schema for each installment (first & second)
// const installmentSchema = new mongoose.Schema({
//   mode: {
//     type: String,
//     enum: ["online", "cash", "pending"], // allowed values
//     required: true,
//     set: (v) => (v === "" ? "pending" : v), // if empty string, treat as "pending"
//     default: "pending",
//   },
//   transactionId: {
//     type: String,
//     unique: true,
//     sparse: true,
//     required: function () {
//       return this.mode === "online"; // transactionId only required for online
//     },
//   },
// });

// // Main admission schema
// const admissionSchema = new mongoose.Schema(
//   {
//     fullName: { type: String, required: true },
//     mobile: { type: String, required: true },
//     email: { type: String, required: true, unique: true },
//     course: { type: String, required: true },
//     isAdmitted: { type: Boolean, default: true },
//     payment: {
//       firstInstallment: { type: installmentSchema, required: true },
//       secondInstallment: { type: installmentSchema, required: false, default: { mode: "pending" } },
//     },
//     createdBy: { type: String },
//     updatedBy: { type: String },
// //     createdBy: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
// // updatedBy: { type: mongoose.Schema.Types.ObjectId, ref: "User" },

//   },
//   { timestamps: true }
// );

// module.exports = mongoose.model("Admission", admissionSchema);



// const mongoose = require("mongoose");

// // Schema for each installment (first & second)
// const installmentSchema = new mongoose.Schema({
//   mode: {
//     type: String,
//     enum: ["online", "cash", "pending"], // allowed values
//     required: true,
//     default: "pending",
//   },
//   transactionId: {
//     type: String,
//     unique: true,
//     sparse: true,
//     required: function () {
//       return this.mode === "online"; // only required if payment mode = online
//     },
//     set: v => (v && v.trim() !== "" ? v : undefined), // empty string → undefined
//   },
// });

// // Main admission schema
// const admissionSchema = new mongoose.Schema(
//   {
//     fullName: { type: String, required: true },
//     mobile: { type: String, required: true },
//     email: { type: String, required: true, unique: true },
//     course: { type: String, required: true },
//     isAdmitted: { type: Boolean, default: true },

//     payment: {
//       // ✅ First installment must always be filled
//       firstInstallment: { type: installmentSchema, required: true },

//       // ✅ Second installment is optional — empty/pending allowed
//       secondInstallment: {
//         type: installmentSchema,
//         required: false,
//         default: { mode: "pending" },
//       },
//     },

//     createdBy: { type: String },
//     updatedBy: { type: String },
//   },
//   { timestamps: true }
// );

// module.exports = mongoose.model("Admission", admissionSchema);



const mongoose = require("mongoose");

// Sub-schema for each installment
const installmentSchema = new mongoose.Schema({
  mode: {
    type: String,
    enum: ["online", "cash", "pending"],
    default: "pending",
  },
  transactionId: {
    type: String,
    unique: true,
    sparse: true,
    required: function () {
      return this.mode === "online";
    },
    set: (v) => (v && v.trim() !== "" ? v : undefined),
  },
});

// Main admission schema
const admissionSchema = new mongoose.Schema(
  {
    fullName: { type: String, required: true },
    mobile: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    course: { type: String, required: true },
    isAdmitted: { type: Boolean, default: true },
    payment: {
      firstInstallment: { type: installmentSchema, required: true },
      // 👇 secondInstallment is optional and defaults to pending
      secondInstallment: {
        type: installmentSchema,
        default: () => ({ mode: "pending" }),
      },
    },
    createdBy: { type: String },
    updatedBy: { type: String },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Admission", admissionSchema);
