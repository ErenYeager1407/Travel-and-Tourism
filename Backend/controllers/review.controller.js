import Review from '../models/Review.js';

// @desc    Create new review
// @route   POST /reviews
// @access  Private
const createReview = async (req, res) => {
    const { destination, rating, comment } = req.body;

    try {
        const review = await Review.create({
            user: req.user.id,
            destination,
            rating,
            comment
        });

        res.status(201).json(review);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};

export {
    createReview
};
