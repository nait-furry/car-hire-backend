const express = require('express');
const router = express.Router();
const { Booking } = require('../models/index');
const { authenticate } = require('../middleware/auth.middleware');


// Create a new booking
router.post('/', authenticate, async (req, res) => {
  try {
    const { carId, startDate, endDate, totalPrice } = req.body;
    const booking = await Booking.create({
      userId: req.user.id,
      carId,
      startDate,
      endDate,
      totalPrice,
    });
    res.status(201).json(booking);
  } catch (error) {
    res.status(500).json({ message: 'Error creating booking', error });
  }
});

// Get all bookings for the authenticated user
router.get('/', authenticate, async (req, res) => {
  try {
    const bookings = await Booking.findAll({ where: { userId: req.user.id } });
    res.json(bookings);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching bookings', error });
  }
});

// Get a specific booking by ID
router.get('/:id', authenticate, async (req, res) => {
  try {
    const booking = await Booking.findOne({ where: { id: req.params.id, userId: req.user.id } });
    if (!booking) return res.status(404).json({ message: 'Booking not found' });
    res.json(booking);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching booking', error });
  }
});

// Update a booking
router.put('/:id', authenticate, async (req, res) => {
  try {
    const booking = await Booking.findOne({ where: { id: req.params.id, userId: req.user.id } });
    if (!booking) return res.status(404).json({ message: 'Booking not found' });
    
    const { startDate, endDate, totalPrice } = req.body;
    booking.startDate = startDate || booking.startDate;
    booking.endDate = endDate || booking.endDate;
    booking.totalPrice = totalPrice || booking.totalPrice;
    
    await booking.save();
    res.json(booking);
  } catch (error) {
    res.status(500).json({ message: 'Error updating booking', error });
  }
});

// Delete a booking
router.delete('/:id', authenticate, async (req, res) => {
  try {
    const booking = await Booking.findOne({ where: { id: req.params.id, userId: req.user.id } });
    if (!booking) return res.status(404).json({ message: 'Booking not found' });
    
    await booking.destroy();
    res.status(204).send();
  } catch (error) {
    res.status(500).json({ message: 'Error deleting booking', error });
  }
});

module.exports = router;