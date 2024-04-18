const express = require("express");
const mongoose = require("mongoose");
const User = require("./model/user");
const cors = require("cors");

const app = express();
app.use(cors());
mongoose.connect(
  "mongodb+srv://score-board:score%402024@cluster0.vu0ao.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0",
  { useNewUrlParser: true, useUnifiedTopology: true }
);
app.use(express.json());
app.post("/signup", async (req, res) => {
  const { name, age, email, userType, password, uniqueId } = req.body;
  const newUser = new User({ name, age, email, userType, password, uniqueId });
  await newUser.save();
  res.status(201).send({ message: "User created successfully" });
});

app.post("/login", async (req, res) => {
  const { email, password } = req.body;
  const user = await User.findOne({ email, password });
  console.log(user);
  if (user) {
    res.status(200).send({ message: "Logged in successfully", user });
  } else {
    res.status(401).send({ message: "Invalid email or password" });
  }
});

app.get("/documents", async (req, res) => {
  const userEmail = req.query.email;
  try {
    const documents = await User.findOne({ userEmail });
    if (!documents) {
      return res
        .status(404)
        .json({ message: "Documents not found for the user" });
    }
    res.status(200).json({ documents: documents.docHash });
  } catch (error) {
    console.error("Error fetching documents:", error);
    res.status(500).json({ message: "Internal server error" });
  }
});

app.listen(3001, () => {
  console.log("Server started on port 3001");
});
