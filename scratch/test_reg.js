
const mongoose = require("mongoose");
const User = require("./backend/models/User");
const bcrypt = require("bcryptjs");
const dotenv = require("dotenv");
const path = require("path");

dotenv.config({ path: path.join(__dirname, "backend", ".env") });

async function test() {
  try {
    console.log("Connecting to:", process.env.MONGO_URI);
    await mongoose.connect(process.env.MONGO_URI);
    console.log("Connected!");

    const name = "Test User";
    const email = "test" + Date.now() + "@example.com";
    const password = "password123";
    const role = "student";

    const hashedPassword = await bcrypt.hash(password, 10);
    const user = await User.create({ name, email, password: hashedPassword, role });

    console.log("User created:", user);

    await User.deleteOne({ _id: user._id });
    console.log("Test user cleaned up.");
    
    await mongoose.disconnect();
  } catch (err) {
    console.error("Test failed:", err);
  }
}

test();
