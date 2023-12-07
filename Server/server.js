const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const fs = require('fs').promises;
const bcrypt = require('bcrypt');

const app = express();
const PORT = 3000;

app.use(bodyParser.json());
app.use(cors());

// Endpoint to handle signup requests
app.post('/signup', async (req, res) => {
    const {  idCard,name, surname,  email, password, confirmPass } = req.body;

    if ( !name || !surname || !email || !password || !idCard || !confirmPass) {
        return res.status(400).json({ error: 'Missing required fields' });
    }

    if (password !== confirmPass) {
        return res.status(400).json({ error: 'Passwords do not match' });
    }

    const userData = await readUserData();

    if (userData.some(user => user.idCard === idCard || user.email === email)) {
        return res.status(409).json({ error: 'ID Card or Email already exists' });
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    userData.push({  idCard, email, password: hashedPassword });

    await writeUserData(userData);

    res.json({ success: true, message: 'User registered successfully' });
});

// Endpoint to handle login requests
app.post('/login', async (req, res) => {
    const { idCard, password } = req.body;

    // Read user data from your data source
    const userData = await readUserData();

    // Find the user by idCard or email
    const user = userData.find(u => u.idCard === idCard );
    // Check if user exists and password is correct
    if (user && await bcrypt.compare(password, user.password)) {
        // User found and password matches
        // Remove password from the user data before sending response
        const userWithoutPassword = { ...user, password: undefined };
        res.json({ success: true, message: 'Login successful', user: userWithoutPassword });
    } else {
        // User not found or password doesn't match
        res.status(401).json({ error: 'Invalid ID Card/Email or password' });
    }
});

const getUserData = async (idCard) => {
    const userInfo = (await readUserData()).find(user => user.idCard === idCard) || {};
    const userAdditionalData = (await readAdditionalUserData()).find(data => data.idCard === idCard) || {};
    const userQuestionnaireData = (await readQuestionnaireData()).find(data => data.idCard === idCard) || {};
    if (userInfo) {
        delete userAdditionalData.idCard;
        delete userQuestionnaireData.idCard;
        delete userInfo.password;
    return {
        ...userInfo, // Ensure userInfo is always an object
        ...userAdditionalData,
        ...userQuestionnaireData
    };
    } else {
    // Handle the case where userInfo is not found
    return {}; // or any appropriate default value
    }
};
app.post('/FirstScreen', async (req, res) => {
    const { idCard, age, height, weight, maritalStatus } = req.body;

    // Validate the received data
    if ( !age || !height || !weight || !maritalStatus) {
        return res.status(400).json({ error: 'Missing required fields' });
    }

    // Read existing data
    const userData = await readAdditionalUserData();
    // Add new data
    userData.push({ idCard, age, height, weight, maritalStatus });

    // Write updated data back to file
    try {
        await fs.writeFile('userData.json', JSON.stringify(userData, null, 2), 'utf-8');
        res.json({ success: true, message: 'Data saved successfully' });
    } catch (error) {
        return res.status(500).json({ error: 'Error writing to file' });
    }
});
const readUserData = async () => {
    try {
        const data = await fs.readFile('userInfo.json', 'utf-8');
        return JSON.parse(data);
    } catch (error) {
        return [];
    }
};
const readAdditionalUserData = async () => {
    try {
        const data = await fs.readFile('userData.json', 'utf-8');
        return JSON.parse(data);
    } catch (error) {
        return [];
    }
};

const readQuestionnaireData = async () => {
    try {
        const data = await fs.readFile('questionnaireData.json', 'utf-8');
        return JSON.parse(data);
    } catch (error) {
        return [];
    }
};
const writeUserData = async (data) => {
    await fs.writeFile('userInfo.json', JSON.stringify(data, null, 2), 'utf-8');
};
app.post('/questions', async (req, res) => {
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
    if (!diseases || !medicalConditions || !pastDiseases || !hypertensionDiabetes || 
        !allergiesDetails || !epilepsySyncopal || !chronicConditions ||
        !regularMedication || !medicationSideEffects || !drugAddiction ||
        !surgicalOperations || !familyCongenitalDisease || !familyHeartProblems || !smokingAlcohol) {
        return res.status(400).json({ error: 'Missing required fields' });
    }
try{
    // Read existing data
    const questionnaireData= await readQuestionnaireData();
    

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
   
        await fs.writeFile('questionnaireData.json', JSON.stringify(questionnaireData, null, 2), 'utf-8');
        
   
        const combinedUserData = await getUserData(idCard);
        if (!combinedUserData.idCard) {
            return res.status(404).json({ error: 'User not found' });
        }

        const allUserDataFile = 'allUserData.json';
        let allUserData = await readAllUserData(allUserDataFile);
        allUserData.push(combinedUserData);
        await fs.writeFile(allUserDataFile, JSON.stringify(allUserData, null, 2), 'utf-8');

        res.json({ success: true, message: 'Questionnaire data saved successfully', filePath: allUserDataFile });
    } catch (error) {
        console.error('Error in catch block:', error);
        return res.status(500).json({ error: 'Internal Server Error' });
    }
});

const readAllUserData = async (filePath) => {
    try {
        const fileData = await fs.readFile(filePath, 'utf-8');
        return JSON.parse(fileData);
    } catch (readError) {
        if (readError.code === 'ENOENT') {
            console.log('Creating new file for all user data.');
            return []; // Return an empty array if the file does not exist
        } else {
            throw readError;
        }
    }
};

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
