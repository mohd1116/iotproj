const express = require("express");
const bcrypt = require("bcrypt");
const fs = require("fs").promises;

const router = express.Router();

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

const readUserData = async () => {
    try {
        const data = await fs.readFile("userData.json", "utf-8");
        return JSON.parse(data);
    } catch (error) {
        console.error("Error reading from userData.json:", error);
        return [];
    }
};

router.post("/login", async (req, res) => {
    const { idCard, password } = req.body;
    const roles = ["doctor", "user"];

    for (const role of roles) {
        const userData = await readFromRoleFile(role);
        const user = userData.find((u) => u.idCard === idCard);

        if (user && (await bcrypt.compare(password, user.password))) {
            const additionalUserData = await readUserData();
            const additionalInfo = additionalUserData.find((u) => u.idCard === idCard) || {};

            const userWithoutPassword = {
                ...user,
                ...additionalInfo,
                password: undefined, // Remove password from the response
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

module.exports = router;
