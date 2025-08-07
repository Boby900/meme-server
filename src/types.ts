import type { KVNamespace } from '@cloudflare/workers-types'
import type { D1Database } from '@cloudflare/workers-types'
import type { R2Bucket } from '@cloudflare/workers-types'
export interface Bindings {
  KV: KVNamespace, 
  DB: D1Database,
  NEXT_INC_CACHE_R2_BUCKET: R2Bucket,
  DEBUG_MODE: string
  API_VERSION: string
  BACKEND_SECRET: string
  BEARER_TOKEN: string  
}
