const express = require('express');
const router = express.Router();
const { Car } = require('../models/index');
const uploadMiddleware = require('../middleware/upload.middleware');
const { authenticate, requireAdmin } = require('../middleware/auth.middleware');
const { Op } = require('sequelize');

// GET all cars with optional filtering and sorting
router.get('/', async (req, res) => {
    try {
        // use `q` to match frontend usage
        const { q, category, minPrice, maxPrice } = req.query;
        const where = {};

        // category filter: allow comma-separated list
        if (category) {
            const cats = String(category).split(',').map(c => c.trim()).filter(Boolean);
            where.category = cats.length > 1 ? { [Op.in]: cats } : cats[0];
        }

        // price range filter
        if (minPrice || maxPrice) {
            where.pricePerDay = {};
            if (minPrice !== undefined) where.pricePerDay[Op.gte] = parseFloat(minPrice);
            if (maxPrice !== undefined) where.pricePerDay[Op.lte] = parseFloat(maxPrice);
        }

        // full text-ish search across title and description
        if (q) {
            const term = `%${q}%`;
            where[Op.or] = [
                { title: { [Op.like]: term } },
                { description: { [Op.like]: term } }
            ];
        }

        const cars = await Car.findAll({ where });

        // attach full image URL for frontend
        const host = `${req.protocol}://${req.get('host')}`;
        const result = cars.map(c => {
          const obj = c.toJSON();
          obj.imageUrl = obj.imagePath ? `${host}/${obj.imagePath}` : null;
          return obj;
        });

        res.json(result);

    } catch (error) {
        res.status(500).json({ message: 'Error fetching cars', error: error.message || error });
    }
});

// GET a specific car by ID
router.get('/:id', async (req, res) => {
    try {
        const car = await Car.findByPk(req.params.id);
        if (!car) {
            return res.status(404).json({ message: 'Car not found' });
        }
        const obj = car.toJSON();
        obj.imageUrl = obj.imagePath ? `${req.protocol}://${req.get('host')}/${obj.imagePath}` : null;
        res.json(obj);
    } catch (error) {
        res.status(500).json({ message: 'Error fetching car details', error });
    }
});

// POST a new car (admin only) 😂 not anymore...
router.post('/', authenticate, uploadMiddleware('image'), async (req, res) => {
    try {
        const { title, description, pricePerDay, category } = req.body;
        const imagePath = req.file ? `uploads/${req.file.filename}` : null;

        const newCar = await Car.create({ title, description, pricePerDay, category, imagePath });

        const obj = newCar.toJSON();
        obj.imageUrl = obj.imagePath ? `${req.protocol}://${req.get('host')}/${obj.imagePath}` : null;
        res.status(201).json(obj);
    } catch (error) {
        res.status(500).json({ message: 'Error adding car', error });
    }
});

// PUT update a car (admin only) 😂 not anymore...
router.put('/:id', authenticate, uploadMiddleware('image'), async (req, res) => {
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
        
        const obj = car.toJSON();
        obj.imageUrl = obj.imagePath ? `${req.protocol}://${req.get('host')}/${obj.imagePath}` : null;
        res.json(obj);
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