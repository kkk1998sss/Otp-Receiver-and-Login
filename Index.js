const express = require("express");
const cors = require("cors");
const app = express();
const port = 8000;
const otpVerification = require("./verify and login/otpVerification");

app.use(
  cors({
    origin: "http://localhost:3000", // Allow requests from the frontend server
  })
);
app.use(express.json());
app.use("/", otpVerification);

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
