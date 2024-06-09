const mongoose = require('mongoose')
const {Schema} = mongoose

const postSchema = new Schema({
    userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
    title: { type: String, required: true },
    caption: { type: String, required: true },
    file: { type: String, required: true },
    createdAt: { type: Date, default: Date.now },
    evaluations: [{ type: mongoose.Schema.Types.ObjectId, ref: 'User' }],
    comments: [{
        userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
        userComment: { type: String, required: true },
        userCommentPicture: { type: String,  required: false },
        comment: { type: String, required: true },
        createdAt: { type: Date, default: Date.now }
      }], 
    shares: [{ type: mongoose.Schema.Types.ObjectId, ref: 'User' }],
})

const PostModel = mongoose.model('Post', postSchema)


module.exports = PostModel