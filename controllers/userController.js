const User = require('../models/User');

module.exports = {
    // get all users
    async getUsers(req, res) {
        try {
            const users = await User.find().select('-__v');
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

            if (!user) {
                return res.result(404).json({message: 'No user with that ID'})
            }

            res.json(user);
        } catch (err) {
            res.status(500).json(err);
        }
    },

    async updateUser (req, res) {
        try {
            const user = await User.findOneAndUpdate(
                { _id: req.params.userId },
                { $set: req.body },
                { new: true }
            );

            if (!user) {
                return res.status(404).json({ message: 'No user with that id'})
            }

            res.json(user)
        } catch (err) {
            res.status(500).json(err);
        }
    },

    // add a friend
    async addFriend (req, res) {
        try {
            const friend = await User.findOneAndUpdate(
                { _id: req.params.userId},
                { $addToSet: { friends: {_id: req.params.friendId} } },
                { new: true }
            );
            
            if (!friend) {
                return res
                .status(404)
                .json({ message: 'Friend not found'})
            }

            res.json('Friend added!')
        } catch (err) {
            res.status(500).json(err);
        }
    },
    // create new user
    async createNewUser (req, res) {
        try {
            const newUser = await User.create(req.body);
            res.json(newUser);
        } catch (err) {
            res.status(500).json(err);
        }
    },

    // update user info 

    
    // delete user
    async deleteUser (req, res) {
        try {
            const userDelete = await User.findOneAndDelete({_id: req.params.userId})
            res.status(200).json('User deleted')
        } catch (err) {
            res.status(500).json(err);
        }
    },

    // delete friend
    async deleteFriend (req, res) {
        try {
            const friendDelete = await User.findOneAndDelete(
                { _id: req.params.userId},
                { $pull: { friends: {_id: req.params.friendId} } },
                { new: true }
            );

            res.status(200).json('Friend deleted!')
        } catch (err) {
            res.status(500).json(err);
        }    
    },
    
};