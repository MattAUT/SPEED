require("dotenv").config();
const express = require("express");
const cors = require("cors");

const app = express();

const PORT = process.env.PORT || 5000;

app.use(cors({ origin: true, credentials: true }));
app.use(express.json({ extended: false }));

app.get("/", (req, res) => {
  res.send("Server is running, that's pretty cool");
});

app.listen(PORT, () => console.log(`Server is running on port ${PORT}`));
