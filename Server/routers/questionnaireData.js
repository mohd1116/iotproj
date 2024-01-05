const express = require("express");
const fs = require("fs").promises;

const router = express.Router();

const getUserData = async (idCard) => {
  const users =
    (await readUserData()).find((user) => user.idCard === idCard) || {};
  const userAdditionalData =
    (await readAdditionalUserData()).find((data) => data.idCard === idCard) ||
    {};
  const userQuestionnaireData =
    (await readQuestionnaireData()).find((data) => data.idCard === idCard) ||
    {};
  if (users) {
    delete userAdditionalData.idCard;
    delete userQuestionnaireData.idCard;
    delete users.password;
    delete users.role;
    return {
      ...users, // Ensure users is always an object
      ...userAdditionalData,
      ...userQuestionnaireData,
    };
  } else {
    // Handle the case where users is not found
    return {}; // or any appropriate default value
  }
};

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

const readUserData = async () => {
  try {
    const data = await fs.readFile("users.json", "utf-8");
    return JSON.parse(data);
  } catch (error) {
    return [];
  }
};

const readAdditionalUserData = async () => {
  try {
    const data = await fs.readFile("userData.json", "utf-8");
    return JSON.parse(data);
  } catch (error) {
    return [];
  }
};

const readQuestionnaireData = async () => {
  try {
    const data = await fs.readFile("questionnaireData.json", "utf-8");
    return JSON.parse(data);
  } catch (error) {
    return [];
  }
};

router.post("/questions", async (req, res) => {
  const {
    idCard,
    diseases,
    medicalConditions,
    pastDiseases,
    hypertensionDiabetes,
    allergiesDetails,
    epilepsySyncopal,
    chronicConditions,
    regularMedication,
    medicationSideEffects,
    drugAddiction,
    surgicalOperations,
    familyCongenitalDisease,
    smokingAlcohol,
    familyHeartProblems,
  } = req.body;

  // Validate the received data
  if (
    !diseases ||
    !medicalConditions ||
    !pastDiseases ||
    !hypertensionDiabetes ||
    !allergiesDetails ||
    !epilepsySyncopal ||
    !chronicConditions ||
    !regularMedication ||
    !medicationSideEffects ||
    !drugAddiction ||
    !surgicalOperations ||
    !familyCongenitalDisease ||
    !familyHeartProblems ||
    !smokingAlcohol
  ) {
    return res.status(400).json({ error: "Missing required fields" });
  }
  try {
    // Read existing data
    const questionnaireData = await readQuestionnaireData();

    // Add new data
    questionnaireData.push({
      idCard,
      diseases,
      medicalConditions,
      pastDiseases,
      hypertensionDiabetes,
      allergiesDetails,
      epilepsySyncopal,
      chronicConditions,
      regularMedication,
      medicationSideEffects,
      drugAddiction,
      surgicalOperations,
      familyCongenitalDisease,
      smokingAlcohol,
      familyHeartProblems,
    });

    const userData = await readAdditionalUserData();
    const userIndex = userData.findIndex((user) => user.idCard === idCard);
    // Write updated data back to file
    if (userIndex !== -1) {
      userData[userIndex].questionScreenCompleted = true; // Update the flag
    } else {
      // If user not found in userData, create a new entry
      userData.push({ idCard, questionScreenCompleted: true });
    }
    // Save the updated user data
    await fs.writeFile(
      "userData.json",
      JSON.stringify(userData, null, 2),
      "utf-8"
    );

    await fs.writeFile(
      "questionnaireData.json",
      JSON.stringify(questionnaireData, null, 2),
      "utf-8"
    );

    const combinedUserData = await getUserData(idCard);
    if (!combinedUserData.idCard) {
      return res.status(404).json({ error: "User not found" });
    }

    const allUserDataFile = "allUserData.json";
    let allUserData = await readAllUserData(allUserDataFile);
    allUserData.push(combinedUserData);
    await fs.writeFile(
      allUserDataFile,
      JSON.stringify(allUserData, null, 2),
      "utf-8"
    );

    res.json({
      success: true,
      message: "Questionnaire data saved successfully",
      filePath: allUserDataFile,
    });
  } catch (error) {
    console.error("Error in catch block:", error);
    return res.status(500).json({ error: "Internal Server Error" });
  }
});

module.exports = router;

// const express = require("express");
// const fs = require("fs").promises;

// const router = express.Router();

// // Function to read additional user data
// const readAdditionalUserData = async () => {
//     try {
//         const data = await fs.readFile("userData.json", "utf-8");
//         return JSON.parse(data);
//     } catch (error) {
//         console.error("Error reading user data:", error);
//         return [];
//     }
// };

// // Function to read questionnaire data
// const readQuestionnaireData = async () => {
//     try {
//         const data = await fs.readFile("questionnaireData.json", "utf-8");
//         return JSON.parse(data);
//     } catch (error) {
//         console.error("Error reading questionnaire data:", error);
//         return [];
//     }
// };

// router.post("/questions", async (req, res) => {
//     const {
//         idCard,
//         diseases,
//         medicalConditions,
//         pastDiseases,
//         hypertensionDiabetes,
//         allergiesDetails,
//         epilepsySyncopal,
//         chronicConditions,
//         regularMedication,
//         medicationSideEffects,
//         drugAddiction,
//         surgicalOperations,
//         familyCongenitalDisease,
//         smokingAlcohol,
//         familyHeartProblems,
//     } = req.body;

//     // Validate the received data
//     if (
//         !diseases ||
//         !medicalConditions ||
//         !pastDiseases ||
//         !hypertensionDiabetes ||
//         !allergiesDetails ||
//         !epilepsySyncopal ||
//         !chronicConditions ||
//         !regularMedication ||
//         !medicationSideEffects ||
//         !drugAddiction ||
//         !surgicalOperations ||
//         !familyCongenitalDisease ||
//         !smokingAlcohol ||
//         !familyHeartProblems
//     ) {
//         return res.status(400).json({ error: "Missing required fields" });
//     }

//     try {
//         // Read existing questionnaire data
//         const questionnaireData = await readQuestionnaireData();
//         questionnaireData.push(req.body); // Add new questionnaire data
//         await fs.writeFile("questionnaireData.json", JSON.stringify(questionnaireData, null, 2), "utf-8");

//         // Update user's progress in additional user data
//         const userData = await readAdditionalUserData();
//         const userIndex = userData.findIndex(user => user.idCard === idCard);

//         if (userIndex !== -1) {
//             userData[userIndex].questionScreenCompleted = true; // Update the flag
//         } else {
//             // If user not found in userData, create a new entry
//             userData.push({ idCard, questionScreenCompleted: true });
//         }

//         // Save the updated user data
//         await fs.writeFile("userData.json", JSON.stringify(userData, null, 2), "utf-8");

//         res.json({
//             success: true,
//             message: "Questionnaire data saved successfully"
//         });
//     } catch (error) {
//         console.error("Error in /questions route:", error);
//         return res.status(500).json({ error: "Internal Server Error" });
//     }
// });

// module.exports = router;
