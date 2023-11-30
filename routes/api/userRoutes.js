const router = require('express').Router();

const {
    getUsers,
    getSingleUser,
    updateUser,
    addFriend, 
    createNewUser,
    deleteFriend,
    deleteUser,
} = require('../../controllers/userController')

// /api/user/
// get route for all users and to create user
router.route('/').get(getUsers).post(createNewUser);

// get route for single user, update user, and delete user
router.route('/:userId').get(getSingleUser).put(updateUser).delete(deleteUser)

// post route for adding a friend and deleting a friend
router.route('/:userId/friends/:friendId').post(addFriend).delete(deleteFriend)

module.exports = router;