const { Schema, model } = require('mongoose');
const { DateTime } = require('luxon');

const reactionSchema = new Schema(
    {
        reactionId: {
            type: Schema.Types.ObjectId,
            default: () => new mongoose.Types.ObjectId(),
        },
        reactionBody: {type: String, required: true, maxlength: 280},
        username: {type: String, required: true},
        createdAt: {
            type: Date, 
            default: Date.now,
            // formating the timestamp along with using luxon for the time format.
            get: function (timestamp) {
                return DateTime.fromJSDate(timestamp).toFormat('MM/dd/yyy hh:mm a');
            },
        }
    }
)

const thoughtSchema = new Schema(
    {
        thoughtText: { type: String, required: true, minlength: 1, maxlength: 280},
        createdAt: { 
            type: Date, 
            default: Date.now,
            // formating the timestamp along with using luxon for the time format.
            get: function (timestamp) {
                return DateTime.fromJSDate(timestamp).toFormat('MM/dd/yyy hh:mm a');
            },
        },
        username: {type:String, required: true}, // need to be the user that created this thought
        reactions: [reactionSchema],
    },
    {
        toJSON: {
            virtuals: true,
            id: false,
        }
    }
);

thoughtSchema
    .virtual('reactionCount')
    .get(function () {
        return this.reactions.length;
    });

const Thought = model('thought', thoughtSchema)

module.exports = Thought;