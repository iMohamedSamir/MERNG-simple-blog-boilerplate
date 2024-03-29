import mongoose from 'mongoose';
const postSchema = new mongoose.Schema({
    title: String,
    body: String,
    username: String,
    createdAt: String,
    comments: [
        {
            body: String,
            username: String,
            createdAt: String
        }
    ],
    likes: [
        {
            username: String,
            createdAt: String
        }
    ],
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'users'
    }
}); 
export const Post = mongoose.model('Post', postSchema);