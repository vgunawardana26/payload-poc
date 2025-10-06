// storage-adapter-import-placeholder
// import { mongooseAdapter } from '@payloadcms/db-mongodb'
import { s3Storage } from '@payloadcms/storage-s3'
import { postgresAdapter } from '@payloadcms/db-postgres'
import { payloadCloudPlugin } from '@payloadcms/payload-cloud'
import { lexicalEditor } from '@payloadcms/richtext-lexical'
import path from 'path'
import { buildConfig } from 'payload'
import { fileURLToPath } from 'url'
import sharp from 'sharp'

import { Users } from './collections/Users/config'
import { Media } from './collections/Media'
import { Questions } from './collections/Questions'
import { QuestionGroups } from './collections/QuestionGroups'
import { MetaData } from './collections/MetaData'
const filename = fileURLToPath(import.meta.url)
const dirname = path.dirname(filename)

export default buildConfig({
  admin: {
    disable: true,
    user: Users.slug,
    importMap: {
      baseDir: path.resolve(dirname),
    },
  },
  cors: ['http://localhost:5173'],
  collections: [Users, Media, Questions, QuestionGroups, MetaData],
  editor: lexicalEditor(),
  secret: process.env.PAYLOAD_SECRET || '',
  typescript: {
    outputFile: path.resolve(dirname, 'payload-types.ts'),
  },
  db: postgresAdapter({
    // Postgres-specific arguments go here.
    // `pool` is required.
    pool: {
      connectionString: process.env.DATABASE_URI,
    },
  }),
  sharp,
  plugins: [
    payloadCloudPlugin(),

    s3Storage({
      // Map which collections should use S3 for uploads
      collections: {
        // simplest: enable S3 for your 'media' collection
        media: true,

        // EXAMPLE: add a key prefix for a second media collection
        // 'media-with-prefix': {
        //   prefix: 'assets/', // keys will be stored under assets/...
        // },

        // EXAMPLE: sign only certain downloads (e.g., private MP4s)
        // 'media-with-presigned-downloads': {
        //   signedDownloads: {
        //     shouldUseSignedURL: ({ filename }) => filename.endsWith('.mp4'),
        //   },
        // },
      },

      bucket: process.env.S3_BUCKET!,
      config: {
        region: process.env.S3_REGION!,
        // endpoint is optional for AWS S3; include if you’ve set it
        endpoint: process.env.S3_ENDPOINT || undefined,
        credentials: {
          accessKeyId: process.env.S3_ACCESS_KEY_ID!,
          secretAccessKey: process.env.S3_SECRET_ACCESS_KEY!,
        },
        // You can add other AWS S3 config here if needed (forcePathStyle, etc.)
      },
    }),
  ],
})
