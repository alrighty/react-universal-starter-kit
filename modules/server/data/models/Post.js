import mongoose, { Schema } from 'mongoose'
import mongoosePaginate from 'mongoose-paginate'
import normalizeSchema from 'server/utils/normalizeSchema'

// create Post Schema
const Post = new Schema({
  title: String,
  text: String,
  author: {
    type: Schema.Types.ObjectId,
    ref: 'User'
  }
})

Post.plugin(mongoosePaginate)
Post.plugin(normalizeSchema)

export default mongoose.model('posts', Post)
