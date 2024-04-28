const ResumeModel = require("./Resume.model");
const mongoose = require("mongoose");
// ------------------------- EXPERIENCE -----------------------------//
// exports.addOrUpdateExperience = async (req, res) => {
//   try {
//     const { title, company, from, to } = req.body;

//     // Define the filter to find the existing experience by title
//     const filter = { title };

//     // Define the update data
//     const update = { title, company, from, to };

//     // Set the `upsert` option to true to create a new document if not found
//     const options = { upsert: true, new: true };

//     // Find and update or insert the experience section
//     const updatedExperience = await ResumeModel.Experience.findOneAndUpdate(
//       filter,
//       update,
//       options
//     );

//     res.status(200).json({
//       message: "Experience section added or updated successfully",
//       experience: updatedExperience,
//     });
//   } catch (error) {
//     console.error("Error adding or updating experience section:", error);
//     res
//       .status(500)
//       .json({ error: "Error adding or updating experience section" });
//   }
// };

exports.updateExperience = async (req, res) => {
  try {
    const id = req.params.id;
    const { title, company, from, to } = req.body;

    // Define the filter to find the existing education by diploma
    const filter = { _id: id };

    // Define the update data
    const update = { title, company, from, to };

    // Find and update or insert the Experience section
    const updatedExperience = await ResumeModel.Experience.findOneAndUpdate(
      filter,
      update
    );

    res.status(200).json({
      message: "Experience section added or updated successfully",
      education: updatedExperience,
    });
  } catch (error) {
    console.error("Error adding or updating Experience section:", error);
    res
      .status(500)
      .json({ error: "Error adding or updating Experience section" });
  }
};

exports.addExperience = async (req, res) => {
  try {
    const { id, title, company, from, to } = req.body;
    const idWithoutHyphens = id.replace(/-/g, "");
    const idWithoutNonHex = idWithoutHyphens.replace(/\W/g, ""); // Remove non-hexadecimal characters
    const trimmedId = idWithoutNonHex.slice(0, 24); // Trim to first 24 characters
    const paddedId = trimmedId.padEnd(24, "0");
    const newExperience = await ResumeModel.Experience.create({
      _id: new mongoose.Types.ObjectId(paddedId),
      title,

      company,
      from,
      to,
    });

    res.status(200).json({
      message: "Experience added successfully",
      experience: newExperience,
    });
  } catch (error) {
    console.error("Error adding Experience:", error);
    res.status(500).json({ error: "Error adding Experience" });
  }
};

exports.getExperience = async (req, res) => {
  try {
    // Find the education section by diploma
    const experience = await ResumeModel.Experience.find();

    if (!experience) {
      return res.status(404).json({ error: "Experience section not found" });
    }

    res.status(200).json({ experience });
  } catch (error) {
    console.error("Error getting Experience section:", error);
    res.status(500).json({ error: "Error getting Experience section" });
  }
};

// exports.deleteExperience = async (req, res) => {
//   try {
//     const { id } = req.params.id;
//     const idWithoutHyphens = id.replace(/-/g, "");
//     const idWithoutNonHex = idWithoutHyphens.replace(/\W/g, ""); // Remove non-hexadecimal characters
//     const trimmedId = idWithoutNonHex.slice(0, 24); // Trim to first 24 characters
//     const paddedId = trimmedId.padEnd(24, "0");
//     // Find and delete the education section by diploma
//     const deletedExperience = await ResumeModel.Education.findOneAndDelete({
//       _id: paddedId,
//     });

//     if (!deletedExperience) {
//       return res.status(404).json({ error: "Experience section not found" });
//     }

//     res
//       .status(200)
//       .json({ message: "Experience section deleted successfully" });
//   } catch (error) {
//     console.error("Error deleting Experience section:", error);
//     res.status(500).json({ error: "Error deleting Experience section" });
//   }
// };

exports.deleteExperience = async (req, res) => {
  try {
    const { id } = req.params; // Access id directly from req.params
    const idWithoutHyphens = id.replace(/-/g, "");
    const idWithoutNonHex = idWithoutHyphens.replace(/\W/g, ""); // Remove non-hexadecimal characters
    const trimmedId = idWithoutNonHex.slice(0, 24); // Trim to first 24 characters
    const paddedId = trimmedId.padEnd(24, "0");
    const idAfterTransformation = new mongoose.Types.ObjectId(paddedId);

    // Find and delete the experience section by ID
    const deletedExperience = await ResumeModel.Experience.findOneAndDelete({
      _id: idAfterTransformation,
    });

    if (!deletedExperience) {
      return res.status(404).json({ error: "Experience section not found" });
    }

    res
      .status(200)
      .json({ message: "Experience section deleted successfully" });
  } catch (error) {
    console.error("Error deleting Experience section:", error);
    res.status(500).json({ error: "Error deleting Experience section" });
  }
};
