const mongoose = require('mongoose')
const {Schema} = mongoose

const competitionSchema = new Schema({
    userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
    name: String,
    description: String,
    startDate: Date,
    endDate: Date,
});

const CompetitionModel = mongoose.model('Competition', competitionSchema)

module.exports = CompetitionModel