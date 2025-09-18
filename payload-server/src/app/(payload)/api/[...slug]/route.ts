// app/api/[[...payload]]/route.ts
import config from '@payload-config'
import '@payloadcms/next/css'
import {
  REST_DELETE,
  REST_GET,
  REST_PATCH,
  REST_POST,
  REST_PUT,
} from '@payloadcms/next/routes'
import { NextResponse } from 'next/server'

export const runtime = 'nodejs'
export const dynamic = 'force-dynamic'

// Keep Payload handlers for real requests
export const GET = REST_GET(config)
export const POST = REST_POST(config)
export const DELETE = REST_DELETE(config)
export const PATCH = REST_PATCH(config)
export const PUT = REST_PUT(config)

// Custom preflight that ALWAYS sets Origin + Credentials when allowed
const ALLOWED = new Set([
  'http://localhost:5173',
  'http://127.0.0.1:5173',
  'http://[::1]:5173',
])

export async function OPTIONS(req: Request) {



  const origin = req.headers.get('origin') || ''
  const res = new NextResponse(null, { status: 204 })

  if (ALLOWED.has(origin)) {
    res.headers.set('Access-Control-Allow-Origin', origin)
    res.headers.set('Access-Control-Allow-Credentials', 'true')
    res.headers.append('Vary', 'Origin')
  }

  res.headers.set(
    'Access-Control-Allow-Headers',
    req.headers.get('access-control-request-headers') || 'Content-Type'
  )
  res.headers.set(
    'Access-Control-Allow-Methods',
    req.headers.get('access-control-request-method') || 'GET,POST,PUT,PATCH,DELETE,OPTIONS'
  )

  return res
}