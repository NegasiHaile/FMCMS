require("dotenv").config();
const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const cookieParser = require("cookie-parser");
const path = require("path");

const app = express();
app.use(express.json());
app.use(cookieParser());
app.use(cors());

//Routes
app.use("/user", require("./routes/userRouter"));
app.use("/branch", require("./routes/branchRouter"));
app.use("/machine", require("./routes/machineRouter"));
app.use("/mrc", require("./routes/mrcRouter"));
app.use("/sim_card", require("./routes/simCardRouter"));
app.use("/business", require("./routes/clientBusinessRouter"));
app.use("/notification", require("./routes/notificationRouter"));
app.use("/sales", require("./routes/salesRouter"));
app.use("/pickup", require("./routes/machinePickupRouter"));
app.use("/pricing", require("./routes/pricingRouter"));
app.use("/system", require("./routes/systemRouter"));

// Connect to mongodb
const URI = process.env.MONGODB_URL;
// const URI = process.env.LOCAL_MONGODB_URL;
mongoose.connect(
  URI,
  {
    useCreateIndex: true,
    useFindAndModify: false,
    useNewUrlParser: true,
    useUnifiedTopology: true,
  },
  (err) => {
    if (err) throw err;
    console.log("Connected to MongoDB");
  }
);

if (process.env.NODE_ENV === "production") {
  app.use(express.static("client/build"));
  app.get("*", (req, res) => {
    res.sendFile(path.join(__dirname, "client", "build", "index.html"));
  });
}

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log("Server is running on port", PORT);
});

// ways to make the file uploading work on the poroduction
// create FILE_MAIN_URL in .env file and assign it with the following values
// a, https://localhost:3000/  for local development and then switch it to
// b, https://fmcms-jupiter-trading.herokuapp.com/ for production
// THEN after all add the process.env.FILE_MAIN_URL before the file URL as follow
// {`process.env.FILE_MAIN_URL${business.TL_Image}`}
// And before everything the file has to be configured to be uploaded in to the./uploads folder
