const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");
const fs = require("fs").promises;
const bcrypt = require("bcrypt");
//const { RtcTokenBuilder, RtcRole } = require("agora-access-token"); // import Agora

const app = express();
const PORT = 3000;

app.use(bodyParser.json());
app.use(cors());

// Endpoint to handle signup requests
app.post("/signup", async (req, res) => {
  const { idCard, name, surname, email, password, confirmPass } = req.body;

  if (!name || !surname || !email || !password || !idCard || !confirmPass) {
    return res.status(400).json({ error: "Missing required fields" });
  }

  if (password !== confirmPass) {
    return res.status(400).json({ error: "Passwords do not match" });
  }

  const userData = await readUserData();

  if (userData.some((user) => user.idCard === idCard || user.email === email)) {
    return res.status(409).json({ error: "ID Card or Email already exists" });
  }

  const hashedPassword = await bcrypt.hash(password, 10);
  const role = "user";
  userData.push({
    idCard,
    email,
    name,
    surname,
    password: hashedPassword,
    role,
  });

  await writeUserData(userData);

  res.json({ success: true, message: "User registered successfully" });
});

// Endpoint to handle login requests
app.post("/login", async (req, res) => {
  const { idCard, password } = req.body;
  const roles = ["doctor", "user"];
  // Read user data from your data source
  //const userData = await readUserData();

  // Find the user by idCard or email
  // const user = userData.find(u => u.idCard === idCard);
  // Check each role file for user authentication
  for (const role of roles) {
    const userData = await readFromRoleFile(role);
    const user = userData.find((u) => u.idCard === idCard);

    if (user && (await bcrypt.compare(password, user.password))) {
      const userWithoutPassword = {
        ...user,
        password: undefined,
        role: user.role,
      };

      return res.json({
        success: true,
        message: "Login successful",
        user: userWithoutPassword,
        role: user.role,
      });
    }
  }

  res.status(401).json({ error: "Invalid ID Card/Email or password" });
});
// Function to read data from a specific role file
const readFromRoleFile = async (role) => {
  const filePath = `${role}s.json`; // e.g., 'users.json'
  try {
    const data = await fs.readFile(filePath, "utf-8");
    return JSON.parse(data);
  } catch (error) {
    console.error(`Error reading from ${filePath}:`, error);
    return [];
  }
};

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
app.post("/FirstScreen", async (req, res) => {
  const { idCard, age, height, weight, maritalStatus } = req.body;

  // Validate the received data
  if (!age || !height || !weight || !maritalStatus) {
    return res.status(400).json({ error: "Missing required fields" });
  }

  // Read existing data
  const userData = await readAdditionalUserData();
  // Add new data
  userData.push({ idCard, age, height, weight, maritalStatus });

  // Write updated data back to file
  try {
    await fs.writeFile(
      "userData.json",
      JSON.stringify(userData, null, 2),
      "utf-8"
    );
    res.json({ success: true, message: "Data saved successfully" });
  } catch (error) {
    return res.status(500).json({ error: "Error writing to file" });
  }
});
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
const writeUserData = async (data) => {
  await fs.writeFile("users.json", JSON.stringify(data, null, 2), "utf-8");
};
app.post("/questions", async (req, res) => {
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

    // Write updated data back to file

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

app.get("/FormDataScreen", async (req, res) => {
  try {
    const allUserData = await readAllUserData("allUserData.json");
    res.json(allUserData);
  } catch (error) {
    console.error("Error fetching all user data:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

//video call
// const appId = "5e005026fe9748e3ae2dbbac7d402989";
// const appCertificate = "e22fa84155fe4264afce2a1ee775870c";
// // Read doctor and user data
// //let doctorData, userData;

// const readDoctorData = async () => {
//   try {
//     const data = await fs.readFile("doctors.json", "utf8");
//     return JSON.parse(data);
//   } catch (error) {
//     console.error("Error reading doctors.json:", error);
//     return []; // Return empty array or handle error as needed
//   }
// };

// // Endpoint to generate Agora token
// app.post("/get-token", async (req, res) => {
//   const { idCard, channelName } = req.body;

//   if (!idCard || !channelName) {
//     return res.status(400).send("User ID and channel name are required");
//   }

//   // Assuming readDoctorData() and readUserData() are async functions that return arrays
//   const doctorData = await readDoctorData();
//   const userData = await readUserData();

//   // Convert doctor and user arrays to objects for easier lookup
//   const doctors = doctorData.reduce((acc, doctor) => {
//     acc[doctor.doctorId] = { role: "doctor", ...doctor };
//     return acc;
//   }, {});

//   const users = userData.reduce((acc, user) => {
//     acc[user.idCard] = { role: "user", ...user };
//     return acc;
//   }, {});

//   const allUsers = { ...doctors, ...users };

//   const user = allUsers[idCard];
//   if (!user) {
//     return res.status(404).send("User not found");
//   }

//   // Define the role based on the user type
//   const role = user.role === "doctor" ? RtcRole.PUBLISHER : RtcRole.SUBSCRIBER;

//   const expirationTimeInSeconds = 3600; // Token valid for 1 hour
//   const currentTimestamp = Math.floor(Date.now() / 1000);
//   const privilegeExpiredTs = currentTimestamp + expirationTimeInSeconds;

//   // Generate the token
//   const token = RtcTokenBuilder.buildTokenWithUid(
//     appId, // Ensure appId is defined
//     appCertificate, // Ensure appCertificate is defined
//     channelName,
//     0, // UID (set to 0 if not used)
//     role,
//     privilegeExpiredTs
//   );

//   res.json({ token });
// });

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
