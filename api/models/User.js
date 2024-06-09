const mongoose = require('mongoose')
const {Schema} = mongoose

const userSchema = new Schema({
    name: String,
    email: {type:String, unique:true},
    password: String,
    profilePicture: String,
    admirers: [{ type: Schema.Types.ObjectId, ref: 'User' }],
    followedCourses: [{ type: Schema.Types.ObjectId, ref: 'Course' }]
})

const UserModel = mongoose.model('User', userSchema)

module.exports = UserModel