import { Schema, arrayOf } from 'normalizr'

const user = new Schema('users')
const post = new Schema('posts')

post.define({
  likes: {
    lastUsers: arrayOf(user)
  }
})

export default {
  USER: user,
  USER_ARRAY: arrayOf(user),
  POST: post,
  POST_ARRAY: arrayOf(post)
}
