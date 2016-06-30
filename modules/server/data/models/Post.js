import mongoose from 'mongoose'
import normalizeSchema from 'server/utils/normalizeSchema'

// create Post Schema
const Post = new mongoose.Schema({
  title: String,
  text: String
})

Post.plugin(normalizeSchema)

export default mongoose.model('posts', Post)
