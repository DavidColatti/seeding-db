const mongoose = require("mongoose");
const seed = require("./seed");

require("dotenv").config();

const seedDatabase = async () => {
  const MONGODB_URI = process.env.MONGODB_URI;

  try {
    const res = await mongoose.connect(MONGODB_URI, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });

    console.log(
      `Connected to Mongo! Database name: "${res.connections[0].name}"`
    );
  } catch (err) {
    console.error(`Error connecting to mongo ${err}`);
  }

  seed();
};

seedDatabase();
