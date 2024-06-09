const mongoose = require('mongoose')
const {Schema} = mongoose

const userInterestSchema = new Schema({
    userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
    interestedUserId: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
});

const UserInterestModel = mongoose.model('UserInterest', userInterestSchema)

module.exports = UserInterestModel