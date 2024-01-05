const express = require("express");
const bcrypt = require("bcrypt");
const fs = require("fs").promises;

const router = express.Router();


const readUserData = async () => {
    try {
        const data = await fs.readFile("users.json", "utf-8");
        return JSON.parse(data);
    } catch (error) {
        return [];
    }
};
const writeUserData = async (data) => {
    await fs.writeFile("users.json", JSON.stringify(data, null, 2), "utf-8");
};
// SignUp
router.post("/signup", async (req, res) => {
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

module.exports = router;