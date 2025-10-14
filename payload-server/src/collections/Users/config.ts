import type { CollectionConfig } from 'payload'
import { protectRoles } from './hooks/protectRoles'

export const Users: CollectionConfig = {
  slug: 'users',
  admin: {
    useAsTitle: 'email',
  },
  auth: { useSessions: false },
  fields: [
    {
      name: 'roles',
      type: 'select',
      hasMany: true,
      saveToJWT: true,
      options: [
        { label: 'Admin', value: 'admin' },
        { label: 'editor', value: 'editor' },
        { label: 'user', value: 'user' },
      ],
      hooks: {
        beforeChange: [protectRoles],
      },
    },
    {
      name: 'firstName',
      type: 'text',
      hasMany: false,
      saveToJWT: true,
    },
    {
      name: 'lastName',
      type: 'text',
      hasMany: false,
      saveToJWT: true,
    },
  ],
}
