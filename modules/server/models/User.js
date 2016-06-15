import mongoose from 'mongoose'
import normalizeSchema from 'server/utils/normalizeSchema'

// create User Schema
const User = new mongoose.Schema({
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
  }
});

User.plugin(normalizeSchema)

export default mongoose.model('users', User);
