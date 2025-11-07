const express = require('express');
const router = express.Router();
const { Car } = require('../models/index');
const upload = require('../middleware/upload.middleware');
const { authenticate, requireAdmin } = require('../middleware/auth.middleware');


// GET all cars with optional filtering and sorting
router.get('/', async (req, res) => {
    try {
        const { category, minPrice, maxPrice, search } = req.query;
        const where = {};
        
        if (category) {
            where.category = category;
        }
        if (minPrice || maxPrice) {
            where.pricePerDay = {};
            if (minPrice) where.pricePerDay.$gte = minPrice;
            if (maxPrice) where.pricePerDay.$lte = maxPrice;
        }
        if (search) {
            where.title = { $like: `%${search}%` };
        }

        const cars = await Car.findAll({ where });
        res.json(cars);
    } catch (error) {
        res.status(500).json({ message: 'Error fetching cars', error });
    }
});

// GET a specific car by ID
router.get('/:id', async (req, res) => {
    try {
        const car = await Car.findByPk(req.params.id);
        if (!car) {
            return res.status(404).json({ message: 'Car not found' });
        }
        res.json(car);
    } catch (error) {
        res.status(500).json({ message: 'Error fetching car details', error });
    }
});

// POST a new car (admin only)
router.post('/', authenticate, requireAdmin, upload.single('image'), async (req, res) => {
    try {
        const { title, description, pricePerDay, category } = req.body;
        const imagePath = req.file ? `uploads/${req.file.filename}` : null;

        const newCar = await Car.create({ title, description, pricePerDay, category, imagePath });
        res.status(201).json(newCar);
    } catch (error) {
        res.status(500).json({ message: 'Error adding car', error });
    }
});

// PUT update a car (admin only)
router.put('/:id', authenticate, requireAdmin, upload.single('image'), async (req, res) => {
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
        res.json(car);
    } catch (error) {
        res.status(500).json({ message: 'Error updating car', error });
    }
});

// DELETE a car (admin only)
router.delete('/:id', authenticate, requireAdmin, async (req, res) => {
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
});

module.exports = router;