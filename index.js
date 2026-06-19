// const express = require("express");
// const app = express();
// const cors = require("cors");
// const bodyParser = require("body-parser");
// const dotenv = require("dotenv");
// const connectDB = require("./db/connection");
// const registrationrouter  = require("./routes/registrationRouter");
// const admissionrouter = require("./routes/admissionRouter");
// const enquiryrouter = require("./routes/enquiryRouter");
// const dashboarrouter = require("./routes/dashboardRoute.js")
// // const  cookieSession =  require("cookie-session");
// // const  passport = require("passport");
// // require( "./controller/passport.js");
// const authRoutes = require( "./routes/authRouter.js");
// const cookieParser =  require("cookie-parser");
// const router = require("./routes/adminRoute.js");

// const port = process.env.PORT || 5000
// app.use(cors())
// app.use(cookieParser())
// app.use(express.static('public'));
// dotenv.config()

// connectDB()
// app.use(express.json())
// app.use(bodyParser.urlencoded({extended: true}))

// app.use("/codeofschool", registrationrouter)
// app.use("/Admission", admissionrouter)
// app.use("/enquiry", enquiryrouter)
// app.use("/auth", authRoutes);
// app.use("/admin", router)
// app.use("/dashboard", dashboarrouter );

// app.get("/", (req, res) => {
//   res.send("Enquiry System server is running ");
// });

// app.listen(port, () => {
//   console.log(`Server started at http://localhost:${port}`);
// });



// 1. ALWAYS load environment variables first!
const dotenv = require("dotenv");
dotenv.config();

const express = require("express");
const cors = require("cors");
const cookieParser = require("cookie-parser");
const connectDB = require("./db/connection");

// Route imports
const registrationrouter = require("./routes/registrationRouter");
const admissionrouter = require("./routes/admissionRouter");
const enquiryrouter = require("./routes/enquiryRouter");
const dashboarrouter = require("./routes/dashboardRoute.js");
const authRoutes = require("./routes/authRouter.js");
const router = require("./routes/adminRoute.js");

const app = express();
const port = process.env.PORT || 5000;

// Connect to MongoDB (Now it will safely read process.env.MONGO_URI)
connectDB();

// Global Middlewares
app.use(cors({
  origin: process.env.CLIENT_URL || "*", // Allows flexibility if you use Netlify/Vercel
  credentials: true
}));
app.use(cookieParser());
app.use(express.json());
app.use(express.urlencoded({ extended: true })); // Replaces body-parser safely
app.use(express.static('public'));

// Routes
app.use("/registration", registrationrouter);
app.use("/admission", admissionrouter); // ⚠️ Remember this has a Capital 'A'
app.use("/enquiry", enquiryrouter);
app.use("/auth", authRoutes);
app.use("/admin", router);
app.use("/dashboard", dashboarrouter);

// Health check root route
app.get("/", (req, res) => {
  res.json({ status: "success", message: "Enquiry System server is running smoothly! 🚀" });
});

// Start Server
app.listen(port, () => {
  console.log(`Server running successfully on port ${port}`);
});





















































// const express = require("express");
// const app = express();

// const cors = require("cors");
// const bodyParser = require("body-parser");
// const dotenv = require("dotenv");

// const connectDB = require("./db/connection");

// const cookieParser = require("cookie-parser");

// dotenv.config();

// connectDB();

// app.use(cors({
//   origin: [
//     "http://localhost:5173",
//     "http://localhost:5174",
//     "https://your-frontend-domain.onrender.com"
//   ],
//   methods: ["GET", "POST", "PUT", "DELETE"],
//   credentials: true
// }));


// app.use(cookieParser());

// app.use(express.json());

// app.use(bodyParser.urlencoded({ extended: true }));

// app.get("/", (req, res) => {
//   res.send("Enquiry System server is running ");
// });

// // app.use(express.static("public"));
// // app.listen(port, () => {
// //   console.log(`Server started at http://localhost:${port}`);
// // })