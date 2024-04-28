const mongoose = require("mongoose");

const aboutSchema = mongoose.Schema({
  name: { type: String, required: true, maxLength: 50 },
  email: {
    type: String,
    required: true,
    validate: {
      validator: function (v) {
        // v refers to the value of the email field
        // put your validation logic here, for example:
        return /^([a-zA-Z0-9_.+-])+\@(([a-zA-Z0-9-])+\.)+([a-zA-Z0-9]{2,4})+$/.test(
          v
        ); // using regex for email validation
      },
      message: "Invalid email format",
    },
  },
  phone: String,
  bio: String,
});

const experienceSchema = mongoose.Schema({
  title: String,
  company: String,
  from: Date,
  to: Date,
});

const educationSchema = mongoose.Schema({
  diploma: String,
  university: String,
  from: Date,
  to: Date,
});

module.exports = {
  About: mongoose.model("About", aboutSchema),
  Experience: mongoose.model("Experience", experienceSchema),
  Education: mongoose.model("Education", educationSchema),
};
