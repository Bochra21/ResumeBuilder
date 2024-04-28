const ResumeModel = require("./Resume.model");

// exports.getAll1 = (req, res) => {
//   ResumeModel.find().then((result) => {
//     res.send(result);
//   });
// };
// -------------------------  ABOUT -----------------------------//
exports.addOrUpdateAbout = async (req, res) => {
  try {
    const id = req.params.id;
    const { name, email, phone, bio } = req.body;

    // Define the filter to find the existing about section by email
    const filter = { _id: id };

    // Define the update data
    const update = { name, email, phone, bio };

    // Set the `upsert` option to true to create a new document if not found
    const options = { upsert: true, new: true };

    // Find and update or insert the about section
    const updatedAbout = await ResumeModel.About.findOneAndUpdate(
      filter,
      update,
      options
    );
    const aboutId = updatedAbout._id.toString();
    res.status(200).json({
      message: "About section added or updated successfully",
      about: updatedAbout,
      id: aboutId,
    });
  } catch (error) {
    console.error("Error adding or updating about section:", error);
    res.status(500).json({ error: "Error adding or updating about section" });
  }
};

// exports.getAbout = async (req, res) => {
//   try {
//     const id = req.params.id;

//     // Find the about section by email
//     const about = await ResumeModel.About.findOne({ id });

//     if (!about) {
//       return res.status(404).json({ error: "About section not found" });
//     }

//     res.status(200).json({ about });
//   } catch (error) {
//     console.error("Error getting about section:", error);
//     res.status(500).json({ error: "Error getting about section" });
//   }
// };

exports.getAbout = async (req, res) => {
  try {
    // Find the about section by email
    const about = await ResumeModel.About.find();

    if (!about) {
      return res.status(404).json({ error: "About section not found" });
    }

    res.status(200).json({ about });
  } catch (error) {
    console.error("Error getting about section:", error);
    res.status(500).json({ error: "Error getting about section" });
  }
};

exports.deleteAbout = async (req, res) => {
  try {
    const id = req.params.id;

    // Find and delete the about section by email
    const deletedAbout = await ResumeModel.About.findOneAndDelete({ id });

    if (!deletedAbout) {
      return res.status(404).json({ error: "About section not found" });
    }

    res.status(200).json({ message: "About section deleted successfully" });
  } catch (error) {
    console.error("Error deleting about section:", error);
    res.status(500).json({ error: "Error deleting about section" });
  }
};
