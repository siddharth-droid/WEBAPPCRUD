const express = require("express");
const cors = require("cors");

const connectDB = require("./connect");
const items = require("./routes/tasks");

const app = express();
require("dotenv").config();

app.use(express.json());
app.use(cors());

app.use("/api/v1/items", items);

const port = 5000;

const start = async () => {
  try {
    await connectDB(process.env.MONGO_URI);
    app.listen(port, () => {
      console.log(`Server is listening on port ${port}...`);
    });
  } catch (error) {
    console.log(error);
  }
};

start();
