const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");


//const { RtcTokenBuilder, RtcRole } = require("agora-access-token"); // import Agora
const signupRouter = require('./routers/signup');
const loginRouter = require('./routers/login');
const firstScreen = require('./routers/firstScreen');
const questionnaireDataRouter = require('./routers/questionnaireData');
const formDataScreen = require('./routers/formDataScreen');

const app = express();
const PORT = 3000;

app.use(bodyParser.json());
app.use(cors());

app.use(signupRouter);
app.use(loginRouter);
app.use(firstScreen);
app.use(questionnaireDataRouter)
app.use(formDataScreen)

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
