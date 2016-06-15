function transform(doc, ret) {
  ret.id = ret._id;
  delete ret._id
  delete ret.__v
}

export default function normalizeSchema(schema, options) {
  schema.set('toObject', { transform })
  schema.set('toJSON', { transform })
}
