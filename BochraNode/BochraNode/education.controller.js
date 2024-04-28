const ResumeModel = require("./Resume.model");
const mongoose = require("mongoose");

// ------------------------- EDUCATION -----------------------------//

exports.updateEducation = async (req, res) => {
  try {
    const id = req.params.id;
    const { diploma, university, from, to } = req.body;

    // Define the filter to find the existing education by ID
    const filter = { _id: id };

    // Define the update data
    const update = { diploma, university, from, to };

    // Find and update or insert the education section
    const updatedEducation = await ResumeModel.Education.findOneAndUpdate(
      filter,
      update
    );

    res.status(200).json({
      message: "Education section added or updated successfully",
      education: updatedEducation,
    });
  } catch (error) {
    console.error("Error adding or updating education section:", error);
    res
      .status(500)
      .json({ error: "Error adding or updating education section" });
  }
};

exports.addEducation = async (req, res) => {
  try {
    const { diploma, university, from, to } = req.body;
    const id = req.params.id;
    // Transform the ID
    const idWithoutHyphens = id.replace(/-/g, "");
    const idWithoutNonHex = idWithoutHyphens.replace(/\W/g, "");
    const trimmedId = idWithoutNonHex.slice(0, 24);
    const paddedId = trimmedId.padEnd(24, "0");
    const idAfterTransformation = new mongoose.Types.ObjectId(paddedId);

    // Create new education record
    const newEducation = await ResumeModel.Education.create({
      _id: idAfterTransformation,
      diploma,
      university,
      from,
      to,
    });

    res.status(200).json({
      message: "Education added successfully",
      education: newEducation,
    });
  } catch (error) {
    console.error("Error adding Education :", error);
    res.status(500).json({ error: "Error adding Education" });
  }
};

exports.getEducation = async (req, res) => {
  try {
    // Find all education records
    const education = await ResumeModel.Education.find();

    if (!education) {
      return res.status(404).json({ error: "Education section not found" });
    }

    res.status(200).json({ education });
  } catch (error) {
    console.error("Error getting education section:", error);
    res.status(500).json({ error: "Error getting education section" });
  }
};

exports.deleteEducation = async (req, res) => {
  try {
    const { id } = req.params;

    // Find and delete the education record by ID
    const deletedEducation = await ResumeModel.Education.findOneAndDelete({
      _id: id,
    });

    if (!deletedEducation) {
      return res.status(404).json({ error: "Education section not found" });
    }

    res.status(200).json({ message: "Education section deleted successfully" });
  } catch (error) {
    console.error("Error deleting education section:", error);
    res.status(500).json({ error: "Error deleting education section" });
  }
};
