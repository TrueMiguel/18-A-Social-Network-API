const { restart } = require('nodemon');
const { Thought, User} = require('../models')

module.exports = {
    // get all thoughts
    async getThoughts (req, res) {
        try {
            const thoughts = await Thought.find().select('-__v');
            res.json(thoughts);
        } catch (err) {
            res.status(500).json(err);
        }
    },
    // get a single thought
    async getSingleThoght (req, res) {
        try {
            const thought = await Thought.findOne({_id: req.params.thoughtId}).select('-__v')
            
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
                { username: req.body.username },
                { $addToSet: { thoughts: newThought._id } },
                { new: true }
            );

            if (!user) {
                return res
                .status(404)
                .json({ message: 'Thought created, but found no user with that ID', newThought});
            }

            res.json({ message: 'New thought created!', newThought});
        } catch (err) {
            console.log(err);
            res.status(500).json(err);
        }
    },

    // update thought
    async updateThought (req, res) {
        try {
            const thought = await Thought.findOneAndUpdate(
                { _id: req.params.thoughtId },
                { $set: req.body },
                { new: true }
            );

            if (!thought) {
                return res.status(404).json({ message: 'No thought with that id'})
            }

            res.json(thought)
        } catch (err) {
            res.status(500).json(err);
        }
    },

    // delete thought
    async deleteThought (req, res) {
        try {
            const thoughtDelete = await Thought.findOneAndDelete({_id: req.params.thoughtId})
            res.status(200).json('Thought deleted')
        } catch (err) {
            res.status(500).json(err);
        }
    },

    // add a reaction
    async addReaction (req, res) {
        try {
            const { reactionBody, username } = req.body;

            const reactionData = { reactionBody, username};

            const reaction = await Thought.findOneAndUpdate(
                { _id: req.params.thoughtId},
                { $addToSet: { reactions: reactionData} },
                { new: true }
            );
            
            if (!reaction) {
                return res
                .status(404)
                .json({ message: 'Thought not found'})
            }

            const newReactions = reaction.reactions.find((reaction) => reaction.username === reactionData.username)

            res.json({message: 'Reaction added!', newReactions})
        } catch (err) {
            res.status(500).json(err);
        }
    },

    async deleteReaction (req, res) {
        try {
            const reactionDelete = await Thought.findOneAndUpdate(
                { _id: req.params.thoughtId},
                {$pull: { reactions: { _id: req.body.reactionId}} },
                { new: true }
            )

            res.status(200).json({ message: 'Reaction deleted!', reactionDelete})
        } catch (err) {
            res.status(500).json(err);
        }
    },
}