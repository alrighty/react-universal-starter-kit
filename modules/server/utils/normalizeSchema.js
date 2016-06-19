function transform(doc, ret) {
  /* eslint-disable no-underscore-dangle, no-param-reassign */
  ret.id = ret._id
  delete ret._id
  delete ret.__v
  /* eslint-enable no-underscore-dangle, no-param-reassign */
}

export default function normalizeSchema(schema) {
  schema.set('toObject', { transform })
  schema.set('toJSON', { transform })
}
