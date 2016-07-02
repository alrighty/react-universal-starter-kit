import { PostType } from '../types'
import { Post } from '../models'
import { createPaginatedList } from '../connections'

export default createPaginatedList(
  'Posts',
  'posts',
  PostType,
  Post
)
