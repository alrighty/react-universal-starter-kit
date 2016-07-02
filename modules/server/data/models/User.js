import mongoose, { Schema } from 'mongoose'
import mongoosePaginate from 'mongoose-paginate'
import normalizeSchema from 'server/utils/normalizeSchema'

// create User Schema
const User = new Schema({
  name: String,
  local: {
    email: String,
    password: String
  },
  github: {
    id: Number,
    name: String,
    username: String,
    email: String,
    token: String
  },
  likes: [{
    type: Schema.Types.ObjectId,
    ref: 'Post'
  }]
})

User.plugin(mongoosePaginate)
User.plugin(normalizeSchema)

export default mongoose.model('users', User)
