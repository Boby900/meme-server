import type { KVNamespace } from '@cloudflare/workers-types'

export interface Bindings {
  KV: KVNamespace
  DEBUG_MODE: string
  API_VERSION: string
}
