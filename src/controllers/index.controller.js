// 1. Import rental controller
const rentalController = require('../controllers/rental.controller');

// 2. Create empty obj for index controller methods
const indexController = {};

indexController.Render = async (req, res) => {
	const data = await rentalController.Get();
	return res.status(200).render('index', { data });
};

// 3. Export index controller
module.exports = indexController;
