require("express-async-errors");
// express
const express = require("express");
const router = require("./routes/route");
require("dotenv").config();
const app = express();
const connectDB = require("./db/connect");
app.use(express.json());
app.use("/api/v1/tweet", router);
const port = process.env.PORT || 3000;
const start = async () => {
  try {
    await connectDB(process.env.MONGO_URI);
    app.listen(port, () =>
      console.log(`Server is listening on port ${port}...`)
    );
  } catch (error) {
    console.log(error);
  }
};

start();
