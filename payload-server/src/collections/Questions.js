import { CollectionConfig } from 'payload'

export const Questions = {
  slug: 'questions',
  auth: false,
  fields: [],
  access: {
    read: ({ req: { user } }) => {
      console.log(user)
      return true
    },
  },
}
