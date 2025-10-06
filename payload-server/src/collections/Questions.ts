import type { CollectionConfig } from 'payload'

export const Questions: CollectionConfig = {
  slug: 'questions',
  dbName: 'q',
  access: {
    read: () => true,
  },

  fields: [
    // --- Core attributes ---
    {
      name: 'type',
      type: 'select',
      required: true,
      defaultValue: 'written-response',
      options: [
        { label: 'Written Response', value: 'written-response' },
        { label: 'Multiple Choice', value: 'multiple-choice' },
      ],
    },

    { name: 'hasGroup', type: 'checkbox', defaultValue: false },
    { name: 'groupId', type: 'relationship', relationTo: 'questionGroups' },

    // --- Common fields ---
    {
      name: 'label',
      type: 'group',
      fields: [
        { name: 'raw', type: 'text' },
        { name: 'normalised', type: 'text' },
      ],
    },
    { name: 'position', type: 'number' },
    { name: 'stimulus', type: 'richText' },
    { name: 'marks', type: 'number' },

    // --- Written Response fields ---
    { name: 'questionContent', type: 'richText' },
    { name: 'working_lines', type: 'number' },
    { name: 'workedSolutionHtml', type: 'richText' },

    // ✅ Flattened relatedMediaKeys (no nested array)
    {
      name: 'relatedMediaKeys',
      type: 'array',
      label: 'Related Media',
      fields: [
        {
          name: 'originalValue',
          type: 'text',
          label: 'Original value', // e.g. old image path or key
        },
        {
          name: 'placeholder',
          type: 'text',
          label: 'Placeholder token', // e.g. {{image-123}}
        },
        {
          name: 'mediaRef',
          type: 'relationship',
          relationTo: 'media',
          label: 'Current media reference', // actual uploaded media file
        },
      ],
    },

    // --- Subparts (nested written-response sub-questions) ---
    {
      name: 'subparts',
      type: 'array',
      fields: [
        {
          name: 'label',
          type: 'group',
          fields: [
            { name: 'raw', type: 'text' },
            { name: 'normalised', type: 'text' },
          ],
        },
        { name: 'position', type: 'number' },
        { name: 'stimulus', type: 'richText' },
        { name: 'questionContent', type: 'richText' },
        { name: 'marks', type: 'number' },
        { name: 'working_lines', type: 'number' },
        { name: 'workedSolutionHtml', type: 'richText' },

        // ✅ Flattened relatedMediaKeys for each subpart
        {
          name: 'relatedMediaKeys',
          type: 'array',
          label: 'Related Media',
          fields: [
            { name: 'originalValue', type: 'text' },
            { name: 'placeholder', type: 'text' },
            { name: 'mediaRef', type: 'relationship', relationTo: 'media' },
          ],
        },
      ],
    },

    // --- Multiple Choice fields ---
    { name: 'promptHtml', type: 'richText' },
    {
      name: 'choices',
      type: 'array',
      fields: [
        {
          name: 'key',
          type: 'group',
          fields: [
            { name: 'raw', type: 'text' },
            { name: 'normalised', type: 'text' },
          ],
        },
        { name: 'position', type: 'number' },
        { name: 'html', type: 'richText' },
      ],
    },
    {
      name: 'answers',
      type: 'array',
      fields: [
        {
          name: 'key',
          type: 'group',
          fields: [
            { name: 'raw', type: 'text' },
            { name: 'normalised', type: 'text' },
          ],
        },
        { name: 'position', type: 'number' },
        { name: 'html', type: 'richText' },
      ],
    },

    // --- Meta Data relationship ---
    {
      name: 'metaData',
      type: 'relationship',
      relationTo: 'metaData',
    },
  ],
}
