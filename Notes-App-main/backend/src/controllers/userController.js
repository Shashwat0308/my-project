const User = require("../models/user");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

const SECRET_KEY = "secretkey";


const signup = async (req, res) => {
    const { username, email, password } = req.body;

    try {
        // 1. Check if user already exists
        const existingUser = await User.findOne({ email });
        if (existingUser) {
            return res.status(400).json({ message: "User already exists" });
        }

        // 2. Hash password
        const hashedPassword = await bcrypt.hash(password, 10);

        // 3. Create user
        const result = await User.create({
            username,
            email,
            password: hashedPassword
        });

        // 4. Generate token
        const token = jwt.sign(
            { email: result.email, id: result._id },
            SECRET_KEY,
            { expiresIn: "1h" }
        );

        res.status(201).json({
            user: result,
            token: token
        });

    } catch (error) {
        console.log(error);
        res.status(500).json({ message: "Something went wrong" });
    }
};

const signin = async (req, res) => {
    const { email, password } = req.body;

    try {
        // 1. Check if user exists
        const existingUser = await User.findOne({ email });
        if (!existingUser) {
            return res.status(404).json({ message: "User not found" });
        }

        // 2. Compare password
        const matchPassword = await bcrypt.compare(
            password,
            existingUser.password
        );

        if (!matchPassword) {
            return res.status(400).json({ message: "Invalid credentials" });
        }

        // 3. Generate token
        const token = jwt.sign(
            { email: existingUser.email, id: existingUser._id },
            SECRET_KEY,
            { expiresIn: "1h" }
        );

        res.status(200).json({
            user: existingUser,
            token: token
        });

    } catch (error) {
        console.log(error);
        res.status(500).json({ message: "Something went wrong" });
    }
};

module.exports = { signup, signin };