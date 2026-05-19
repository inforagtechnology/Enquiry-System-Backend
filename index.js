const express = require("express");
const app = express();
const cors = require("cors");
const bodyParser = require("body-parser");
const dotenv = require("dotenv");
const connectDB = require("./db/connection");
const registrationrouter  = require("./routes/registrationrouter");
const admissionrouter = require("./routes/admissionRouter");
const enquiryrouter = require("./routes/enquiryRouter");
const dashboarrouter = require("./routes/dashboardRoute.js")
// const  cookieSession =  require("cookie-session");
// const  passport = require("passport");
// require( "./controller/passport.js");
const authRoutes = require( "./routes/authRouter.js");
const cookieParser =  require("cookie-parser");
const router = require("./routes/adminRoute.js");

const port = process.env.PORT || 5000
app.use(cors())
app.use(cookieParser())
app.use(express.static('public'));
dotenv.config()

connectDB()
app.use(express.json())
app.use(bodyParser.urlencoded({extended: true}))

app.use("/codeofschool", registrationrouter)
app.use("/Admission", admissionrouter)
// Enquiry Router
app.use("/enquiry", enquiryrouter)

app.use("/auth", authRoutes);
// admin Router
app.use("/admin", router)
// dashboard Router
app.use("/dashboard", dashboarrouter );
app.get("/", (req, res) => {
  res.send("Enquiry System server is running ");
});

app.listen(port, () => {
  console.log(`Server started at http://localhost:${port}`);
});