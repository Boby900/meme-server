import { describe, test, expect } from 'vitest'
import router from './notes.index' // Import the actual notes app from notes.index.ts
describe('Notes Routes', () => {
  test('GET /get-notes should return 200', async () => {
    const res = await router.request('/get-notes')
    
    // Add debugging info
    if (res.status !== 200) {
      console.log('Test failed - Status:', res.status)
      const text = await res.text()
      console.log('Test failed - Response:', text)
    }
    
    expect(res.status).toBe(200)
  })

  test('GET /get-notes should return correct message', async () => {
    const res = await router.request('/get-notes')
    
    if (res.status === 200) {
      const data= await res.json()
      expect(data).toEqual( 'getting notes')
    }
  })

  test('GET /get-notes should return JSON content-type', async () => {
    const res = await router.request('/get-notes')
    expect(res.headers.get('content-type')).toContain('application/json')
  })

  test('POST /post-notes should return 200', async () => {
    
    const res = await router.request('/post-notes',{
        method:'post',
        headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            key: 'test',
            name: 'Test User',
            email: 'test@example.com'
          })
        })
    
    // Add debugging info
    if (res.status !== 200) {
      console.log('Test failed - Status:', res.status)
      const text = await res.text()
      console.log('Test failed - Response:', text)
    }
    
    expect(res.status).toBe(200)
  })
})
 
