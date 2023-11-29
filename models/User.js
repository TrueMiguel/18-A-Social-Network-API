const { Schema, model } = require ('mongoose');

// user schema
const userSchema = Schema(
    {
        username: {type: String, unique: true, required: true, trim: true},
        // using regular expresison to check if the email string matches the standard email format. 
        email: {type: String, required: true, unique: true, match: /^([\w-\.]+@([\w-]+\.)+[\w-]{2,4})?$/},   //need to have it match a valid email form
        thoughts: [{type: Schema.Types.ObjectId, ref: 'thought'}],
        friends: [{type: Schema.Types.ObjectId, ref: 'friend'}]
    },
    {
        toJson: {virtuals: true,},
        id:false,
    }
);

//virtual for friend count. 
userSchema
    .virtual('friendCount')
    .get(function () {
        return this.friends.length;
    });

const User = model('user', userSchema);

module.exports = User;