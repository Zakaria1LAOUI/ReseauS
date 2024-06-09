const mongoose = require('mongoose')
const {Schema} = mongoose

const courseSchema = new Schema({
    userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
    title: String,
    description: String,
    file: { type: String, required: true },
    startDate: Date,
    endDate: Date,
});

const CourseModel = mongoose.model('Course', courseSchema)


module.exports = CourseModel