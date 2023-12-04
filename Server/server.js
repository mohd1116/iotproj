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
    const { fullName, idCard, age, email, password, confirmPass } = req.body;

    if (!fullName || !email || !password || !idCard || !age || !confirmPass) {
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

    userData.push({ fullName, idCard, age, email, password: hashedPassword });

    await writeUserData(userData);

    res.json({ success: true, message: 'User registered successfully' });
});

// Endpoint to handle login requests
app.post('/login', async (req, res) => {
    const { idCard, password } = req.body;

    const userData = await readUserData();

    const user = userData.find(u => u.idCard === idCard);

    if (user && await bcrypt.compare(password, user.password)) {
        res.json({ success: true, message: 'Login successful', user: { ...user, password: undefined } });
    } else {
        res.status(401).json({ error: 'Invalid ID Number or password' });
    }
});

  
app.post('/FirstScreen', async (req, res) => {
    const { name, surname, age, height, weight, maritalStatus } = req.body;

    // Validate the received data
    if (!name || !surname || !age || !height || !weight || !maritalStatus) {
        return res.status(400).json({ error: 'Missing required fields' });
    }

    // Read existing data
    let userData;
    try {
        const data = await fs.readFile('userData.json', 'utf-8');
        userData = JSON.parse(data);
    } catch (error) {
        userData = [];
    }

    // Add new data
    userData.push({ name, surname, age, height, weight, maritalStatus });

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

const writeUserData = async (data) => {
    await fs.writeFile('userInfo.json', JSON.stringify(data, null, 2), 'utf-8');
};
app.post('/questions', async (req, res) => {
    const {
        diseases,
        medicalConditions,
        pastDiseases,
        hypertensionDiabetes,
        allergiesDetails,
        epilepsySyncopal,
        chronicConditions,
        currentMedications,
        regularMedication,
        medicationSideEffects,
        drugProblems,
        drugAddiction,
        surgicalOperations,
        familyCongenitalDisease,
        familyHeartProblems,
        smokingAlcohol
    } = req.body;

    // Validate the received data
    if (!diseases || !medicalConditions || !pastDiseases || !hypertensionDiabetes || 
        !allergiesDetails || !epilepsySyncopal || !chronicConditions || !currentMedications ||
        !regularMedication || !medicationSideEffects || !drugProblems || !drugAddiction ||
        !surgicalOperations || !familyCongenitalDisease || !familyHeartProblems || !smokingAlcohol) {
        return res.status(400).json({ error: 'Missing required fields' });
    }

    // Read existing data
    let questionnaireData;
    try {
        const data = await fs.readFile('questionnaireData.json', 'utf-8');
        questionnaireData = JSON.parse(data);
    } catch (error) {
        questionnaireData = [];
    }

    // Add new data
    questionnaireData.push({
        diseases,
        medicalConditions,
        pastDiseases,
        hypertensionDiabetes,
        allergiesDetails,
        epilepsySyncopal,
        chronicConditions,
        currentMedications,
        regularMedication,
        medicationSideEffects,
        drugProblems,
        drugAddiction,
        surgicalOperations,
        familyCongenitalDisease,
        familyHeartProblems,
        smokingAlcohol
    });

    // Write updated data back to file
    try {
        await fs.writeFile('questionnaireData.json', JSON.stringify(questionnaireData, null, 2), 'utf-8');
        res.json({ success: true, message: 'Questionnaire data saved successfully' });
    } catch (error) {
        return res.status(500).json({ error: 'Error writing to file' });
    }
});

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
