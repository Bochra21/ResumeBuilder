const aboutController = require("./about.controller");
const experienceController = require("./experience.controller");
const educationController = require("./education.controller");

module.exports = (app) => {
  // About routes
  app.post("/addAbout/:id", aboutController.addOrUpdateAbout);
  app.get("/getAbout", aboutController.getAbout);
  app.delete("/deleteAbout/:id", aboutController.deleteAbout);

  // Experience routes
  app.post("/updateExperience/:id", experienceController.updateExperience);
  app.post("/addExperience", experienceController.addExperience);
  app.get("/getExperience/:id", experienceController.getExperience);
  app.delete("/deleteExperience/:id", experienceController.deleteExperience);

  // Education routes
  app.post("/addEducation/:id", educationController.addEducation);
  app.get("/getEducation/:id", educationController.getEducation);
  app.delete("/deleteEducation/:id", educationController.deleteEducation);
};
