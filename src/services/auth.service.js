const { User } = require('../models');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
require('dotenv').config();

const register = async (name, email, password) => {
    const existingUser = await User.findOne({ where: { email } });
    if (existingUser) {
        throw new Error('Email already in use');
    }
    const passwordHash = await bcrypt.hash(password, 10);
    const user = await User.create({ name, email, passwordHash });
    return user;
};

const login = async (email, password) => {
    const user = await User.findOne({ where: { email } });
    if (!user) {
        throw new Error('Invalid credentials');
    }
    const isValid = await bcrypt.compare(password, user.passwordHash);
    if (!isValid) {
        throw new Error('Invalid credentials');
    }
    const token = jwt.sign({ id: user.id }, process.env.JWT_SECRET, { expiresIn: '7d' });
    return { user, token };
};

const getUserById = async (id) => {
    return await User.findByPk(id);
};

module.exports = {
    register,
    login,
    getUserById,
};

