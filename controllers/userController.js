const User = require('../models/User');

module.exports = {
    // get all users
    async getUsers(req, res) {
        try {
            const users = await User.find();
            res.json(users);
        } catch (err) {
            res.status(500).json(err);
        }
    },
    // get single user by id
    async getSingleUser (req, res) {
        try {
            const user = await User.findOne({_id: req.params.userId})
            .select('-__v')
            .populate('thought', 'friend');

            if (!user) {
                return res.result(404).json({message: 'No user with that ID'})
            }

            res.json(user);
        } catch (err) {
            res.status(500).json(err);
        }
    },
    // create new user
    async createNewUser (req, res) {
        try {
            const newUser = await newUser.create(req.body);
            res.json(newUser);
        } catch (err) {
            res.status(500).json(err);
        }
    },
};