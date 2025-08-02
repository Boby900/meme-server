import type { Bindings } from "@/types"
import { logger } from 'hono/logger'
import { HTTPException } from 'hono/http-exception' 
import { OpenAPIHono, z } from '@hono/zod-openapi'


export default function createApp() {
    const app = new OpenAPIHono<{ Bindings: Bindings }>()
    app.use(logger())
    
//     app.onError((err, c) => {
//       if (err instanceof HTTPException || err instanceof z.ZodError) {
//         // Get the custom response
//         return c.json({
//             message: "Something went wrong🚧",
//             error: err
//           })
//       }
//       return c.json({
//         message: "Internal Server Error",
//         error: err.message
//       }, 500)
//     }
   
// )
    return app
}