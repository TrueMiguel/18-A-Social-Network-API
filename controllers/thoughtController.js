const { Thought, User} = require('../models')

module.exports = {
    // get all thoughts
    async getThoughts (req, res) {
        try {
            const thoughts = await Thought.find();
            res.json(thoughts);
        } catch (err) {
            res.status(500).json(err);
        }
    },
    // get a single thought
    async getSingleThoght (req, res) {
        try {
            const thought = await Thought.findOne({_id: req.params.thoughtId})
            
            if (!thought) {
                return res.status(404).json({ message: 'No thought with that ID'})
            }

            res.json(thought);
        } catch (err) {
            res.status(500).json(err)
        }
    },
    // create a new thought

    async createThought (req, res) {
        try{
            const newThought = await Thought.create(req.body);
            const user = await User.findOneAndUpdate(
                { _id: req.body.userId },
                { $addToSet: { thoughts: newThought._id } },
                { new: true }
            );

            if (!user) {
                return res
                .status(404)
                .json({ message: 'Post created, but found no user with that ID'});
            }

            res.json('New thought created!', newThought);
        } catch (err) {
            console.log(err);
            res.status(500).json(err);
        }
    }

}