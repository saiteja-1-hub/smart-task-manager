const bcrypt = require("bcryptjs");

const {
    createUser,
    findUserByEmail,
    findUserById,
} = require("../models/userModel");

const generateToken = require("../utils/generateToken");

const {
    isValidEmail,
    isValidPassword,
} = require("../utils/validators");

const register = async (req, res, next) => {
    try {
        const {
            name,
            email,
            password,
        } = req.body;

        if (!name || !email || !password) {
            return res.status(400).json({
                success: false,
                message: "Name, email and password are required",
            });
        }

        const trimmedName = name.trim();
        const normalizedEmail = email
            .trim()
            .toLowerCase();

        if (trimmedName.length < 2) {
            return res.status(400).json({
                success: false,
                message: "Name must contain at least 2 characters",
            });
        }

        if (!isValidEmail(normalizedEmail)) {
            return res.status(400).json({
                success: false,
                message: "Please provide a valid email",
            });
        }

        if (!isValidPassword(password)) {
            return res.status(400).json({
                success: false,
                message: "Password must contain at least 6 characters",
            });
        }

        const existingUser =
            await findUserByEmail(normalizedEmail);

        if (existingUser) {
            return res.status(409).json({
                success: false,
                message: "User already exists with this email",
            });
        }

        const hashedPassword =
            await bcrypt.hash(password, 10);

        const user = await createUser(
            trimmedName,
            normalizedEmail,
            hashedPassword
        );

        const token = generateToken(user);

        res.status(201).json({
            success: true,
            message: "Registration successful",
            user,
            token,
        });
    } catch (error) {
        next(error);
    }
};

const login = async (req, res, next) => {
    try {
        const {
            email,
            password,
        } = req.body;

        if (!email || !password) {
            return res.status(400).json({
                success: false,
                message: "Email and password are required",
            });
        }

        const normalizedEmail = email
            .trim()
            .toLowerCase();

        const user =
            await findUserByEmail(normalizedEmail);

        if (!user) {
            return res.status(401).json({
                success: false,
                message: "Invalid email or password",
            });
        }

        const passwordMatch =
            await bcrypt.compare(
                password,
                user.password
            );

        if (!passwordMatch) {
            return res.status(401).json({
                success: false,
                message: "Invalid email or password",
            });
        }

        const token = generateToken(user);

        const safeUser = {
            id: user.id,
            name: user.name,
            email: user.email,
            created_at: user.created_at,
            updated_at: user.updated_at,
        };

        res.status(200).json({
            success: true,
            message: "Login successful",
            user: safeUser,
            token,
        });
    } catch (error) {
        next(error);
    }
};

const getMe = async (req, res, next) => {
    try {
        const user = await findUserById(
            req.user.id
        );

        if (!user) {
            return res.status(404).json({
                success: false,
                message: "User not found",
            });
        }

        res.status(200).json({
            success: true,
            user,
        });
    } catch (error) {
        next(error);
    }
};

module.exports = {
    register,
    login,
    getMe,
};