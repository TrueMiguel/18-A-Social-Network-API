const router = require('express').Router();

const {
    getThoughts,
    getSingleThoght,
    createThought,
    updateThought,
    deleteThought,
    addReaction,
    deleteReaction
} = require('../../controllers/thoughtController')

//api/thought
//get route for all thoughts and create thought
router.route('/').get(getThoughts).post(createThought);

// route for single thought, update thought, delete thought
router.route('/:thoughtId').get(getSingleThoght).put(updateThought).delete(deleteThought)


// route for addting reaction and deleting reaction
router.route('/:thoughtId/reactions').post(addReaction).delete(deleteReaction)

module.exports = router;