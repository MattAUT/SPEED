require("dotenv").config();
const express = require("express");
const cors = require("cors");
const connect = require("./config/connect");
const queries = require("./config/queries");

const app = express();
const PORT = process.env.PORT || 5000;

connect();

app.use(cors({ origin: true, credentials: true }));
app.use(express.json({ extended: false }));

app.get("/", (req, res) => {
  res.send("Server is running, that's pretty cool");
});

app.use("/fetch", queries);

app.listen(PORT, () => console.log(`Server is running on port ${PORT}`));
