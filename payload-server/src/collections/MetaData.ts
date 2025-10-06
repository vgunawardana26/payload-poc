import type { CollectionConfig } from 'payload'

export const MetaData: CollectionConfig = {
  slug: 'metaData',

  fields: [
    {
      name: 'exam_reference',
      type: 'group',
      fields: [
        { name: 'authority', type: 'text' },
        { name: 'year', type: 'number' },
        { name: 'subject', type: 'text' },
        { name: 'exam', type: 'text' },
        { name: 'cas', type: 'checkbox' },
        { name: 'stats', type: 'json' },
      ],
    } ],
}
