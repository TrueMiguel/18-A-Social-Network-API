const router = require('express').Router();

const thoughtRoute = require('./thoughtRoutes');
const userRoutes = require('./userRoutes');

router.use('/thought', thoughtRoute);
router.use('/user', userRoutes);

module.exports = router;