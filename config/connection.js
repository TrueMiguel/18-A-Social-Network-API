const { connect, connection } = require('mongoose');

connect('mongodb+srv://Miguel:Megamono%401@cluster0.hazfobm.mongodb.net/');//need to add the correct destination after the last / This is supposed to be th ename of the MongoDB

module.exports = connection;
