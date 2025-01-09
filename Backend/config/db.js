/* const mongoose = require("mongoose");

const db = () => {
  try {
    mongoose
      .connect("mongodb+srv://haslan82:828200HRsk.@cluster0.0vh1u.mongodb.net/", {
        useNewUrlParser: true,
        useUnifiedTopology: true,
      })
      .then(() => {
        console.log("MongoDB Connected...");
      })
      .catch((error) => {
        console.log("Error connecting to MongoDB", error);
      });
  } catch (error) {
    console.error("An error occurred in the database function:", error);
  }
};

module.exports = db; */



/* require("dotenv").config();
const mongoose = require("mongoose");

const db = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI);
    console.log("MongoDB Connected...");
  } catch (error) {
    console.error("Error connecting to MongoDB:", error);
  }
};

module.exports = db; */
/* require("dotenv").config();
const mongoose = require("mongoose");

const db = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    console.log("MongoDB Connected...");
  } catch (error) {
    console.error(`Error connecting to MongoDB at ${process.env.MONGO_URI}:`, error.message);
    process.exit(1); // Hata durumunda uygulamayı durdurur
  }
};

module.exports = db;
 */



const mongoose = require("mongoose");

const db = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI);
    console.log("MongoDB Connected...");
  } catch (error) {
    console.error("Error connecting to MongoDB:", error.message);
    process.exit(1); // Hata durumunda uygulamayı durdurur
  }
};

module.exports = db;
