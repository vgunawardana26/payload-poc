import type { CollectionConfig } from 'payload'

export const QuestionGroups: CollectionConfig = {
  slug: 'questionGroups',

  fields: [
    {
      name: 'type',
      type: 'text',
      defaultValue: 'extended-response',
      required: true,
    },

    {
      name: 'number',
      type: 'text',
    },

    {
      name: 'stimulus',
      type: 'richText',
    },

    {
      name: 'marks',
      type: 'number',
    },

    // relationship to Questions with order preserved
    {
      name: 'questions',
      type: 'array',
      required: true,
      fields: [
        {
          name: 'question',
          type: 'relationship',
          relationTo: 'questions',
          required: true,
        },
        {
          name: 'position',
          type: 'number',
          required: true,
        },
      ],
    },

    // relationship to MetaData
    {
      name: 'metaData',
      type: 'relationship',
      relationTo: 'metaData',
      required: false,
      hasMany: true,
    },

    {
  name: 'relatedMediaKeys',
  type: 'array',
  label: 'Related Media',
  fields: [
    {
      name: 'mapping',
      type: 'group',
      fields: [
        {
          name: 'originalValue',
          type: 'text',
          label: 'Original value', // e.g. original image key in XML/Contentful
        },
        {
          name: 'placeholder',
          type: 'text',
          label: 'Placeholder token', // e.g. {{image-123}}
        },
        {
          name: 'mediaRef',
          type: 'relationship',
          relationTo: 'media', // your Media collection
          label: 'Current media reference', // e.g. actual file in S3
        },
      ],
    },
  ],
}

  ],
}
