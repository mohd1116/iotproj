const express = require("express");
const fs = require("fs").promises;

const router = express.Router();

const readAdditionalUserData = async () => {
    try {
        const data = await fs.readFile("userData.json", "utf-8");
        return JSON.parse(data);
    } catch (error) {
        console.error("Error reading user data:", error);
        return [];
    }
};

router.post("/FirstScreen", async (req, res) => {
    const { idCard, age, height, weight, maritalStatus } = req.body;

    if (!age || !height || !weight || !maritalStatus) {
        return res.status(400).json({ error: "Missing required fields" });
    }

    try {
        const userData = await readAdditionalUserData();
        const userIndex = userData.findIndex(user => user.idCard === idCard);

        if (userIndex !== -1) {
            // User exists, update their data
            userData[userIndex] = { ...userData[userIndex], age, height, weight, maritalStatus, firstScreenCompleted: true };
        } else {
            // New user, add them to the array
            userData.push({ idCard, age, height, weight, maritalStatus, firstScreenCompleted: true });
        }

        await fs.writeFile("userData.json", JSON.stringify(userData, null, 2), "utf-8");
        res.json({ success: true, message: "Data saved successfully" });
    } catch (error) {
        console.error("Error handling FirstScreen data:", error);
        return res.status(500).json({ error: "Error writing to file" });
    }
});

module.exports = router;
