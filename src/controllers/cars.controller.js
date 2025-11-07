const { Car } = require('../models/index');
const { Op } = require('sequelize');

// Get all cars with optional filtering
exports.getAllCars = async (req, res) => {
    try {
        const { category, minPrice, maxPrice, search } = req.query;
        const where = {};

        if (category) {
            where.category = category;
        }
        if (minPrice || maxPrice) {
            where.pricePerDay = {};
            if (minPrice) where.pricePerDay[Op.gte] = minPrice;
            if (maxPrice) where.pricePerDay[Op.lte] = maxPrice;
        }
        if (search) {
            where.title = { [Op.like]: `%${search}%` };
        }

        const cars = await Car.findAll({ where });
        res.status(200).json(cars);
    } catch (error) {
        res.status(500).json({ message: 'Error retrieving cars', error });
    }
};

// Get a single car by ID
exports.getCarById = async (req, res) => {
    try {
        const car = await Car.findByPk(req.params.id);
        if (!car) {
            return res.status(404).json({ message: 'Car not found' });
        }
        res.status(200).json(car);
    } catch (error) {
        res.status(500).json({ message: 'Error retrieving car', error });
    }
};

// Create a new car
exports.createCar = async (req, res) => {
    try {
        const { title, description, pricePerDay, category } = req.body;
        const imagePath = req.file ? `uploads/${req.file.filename}` : null;

        const newCar = await Car.create({ title, description, pricePerDay, category, imagePath });
        res.status(201).json(newCar);
    } catch (error) {
        res.status(500).json({ message: 'Error creating car', error });
    }
};

// Update an existing car
exports.updateCar = async (req, res) => {
    try {
        const car = await Car.findByPk(req.params.id);
        if (!car) {
            return res.status(404).json({ message: 'Car not found' });
        }

        const { title, description, pricePerDay, category } = req.body;
        if (req.file) {
            car.imagePath = `uploads/${req.file.filename}`;
        }

        car.title = title || car.title;
        car.description = description || car.description;
        car.pricePerDay = pricePerDay || car.pricePerDay;
        car.category = category || car.category;

        await car.save();
        res.status(200).json(car);
    } catch (error) {
        res.status(500).json({ message: 'Error updating car', error });
    }
};

// Delete a car
exports.deleteCar = async (req, res) => {
    try {
        const car = await Car.findByPk(req.params.id);
        if (!car) {
            return res.status(404).json({ message: 'Car not found' });
        }

        await car.destroy();
        res.status(204).send();
    } catch (error) {
        res.status(500).json({ message: 'Error deleting car', error });
    }
};