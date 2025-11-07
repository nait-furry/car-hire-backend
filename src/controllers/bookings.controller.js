const { Booking } = require('../models/index');
const { User } = require('../models/index');
const { Car } = require('../models/index');

exports.createBooking = async (req, res) => {
    try {
        const { carId, startDate, endDate } = req.body;
        const userId = req.user.id;

        const booking = await Booking.create({
            userId,
            carId,
            startDate,
            endDate,
        });

        res.status(201).json(booking);
    } catch (error) {
        res.status(500).json({ message: 'Error creating booking', error });
    }
};

exports.getUserBookings = async (req, res) => {
    try {
        const userId = req.user.id;
        const bookings = await Booking.findAll({ where: { userId } });

        res.status(200).json(bookings);
    } catch (error) {
        res.status(500).json({ message: 'Error fetching bookings', error });
    }
};

exports.getBookingById = async (req, res) => {
    try {
        const bookingId = req.params.id;
        const booking = await Booking.findByPk(bookingId);

        if (!booking) {
            return res.status(404).json({ message: 'Booking not found' });
        }

        res.status(200).json(booking);
    } catch (error) {
        res.status(500).json({ message: 'Error fetching booking', error });
    }
};

exports.updateBooking = async (req, res) => {
    try {
        const bookingId = req.params.id;
        const booking = await Booking.findByPk(bookingId);

        if (!booking) {
            return res.status(404).json({ message: 'Booking not found' });
        }

        const { startDate, endDate } = req.body;
        booking.startDate = startDate || booking.startDate;
        booking.endDate = endDate || booking.endDate;

        await booking.save();
        res.status(200).json(booking);
    } catch (error) {
        res.status(500).json({ message: 'Error updating booking', error });
    }
};

exports.deleteBooking = async (req, res) => {
    try {
        const bookingId = req.params.id;
        const booking = await Booking.findByPk(bookingId);

        if (!booking) {
            return res.status(404).json({ message: 'Booking not found' });
        }

        await booking.destroy();
        res.status(204).send();
    } catch (error) {
        res.status(500).json({ message: 'Error deleting booking', error });
    }
};