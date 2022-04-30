const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const blogSchema = new Schema({
    title: {
        type: String,
        required: true,
        unique: false,
        
    }, 
    snippet: {
        type: String,
        required: true,
        unique: false,
    },
    author: {
        type: String,
        required: true,
        unique: false,
    }, 
    body: {
        type: String,
        required: true,
        unique: false,
    }

    //constructor object automatically creates time stamps.
}, { timestamps: true })

const Blog = mongoose.model('Blog', blogSchema);
module.exports = Blog;