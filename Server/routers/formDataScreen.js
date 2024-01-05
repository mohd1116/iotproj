const express = require("express");
const bcrypt = require("bcrypt");
const fs = require("fs").promises;

const router = express.Router();

const readAllUserData = async (filePath) => {
  try {
    const fileData = await fs.readFile(filePath, "utf-8");
    return JSON.parse(fileData);
  } catch (readError) {
    if (readError.code === "ENOENT") {
      console.log("Creating new file for all user data.");
      return []; // Return an empty array if the file does not exist
    } else {
      throw readError;
    }
  }
};

router.get("/FormDataScreen", async (req, res) => {
  try {
    const allUserData = await readAllUserData("allUserData.json");
    res.json(allUserData);
  } catch (error) {
    console.error("Error fetching all user data:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

module.exports = router;