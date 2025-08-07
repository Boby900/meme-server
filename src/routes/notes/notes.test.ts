import { describe, test, expect } from 'vitest'
import router from './notes.index' // Import the actual notes app from notes.index.ts
describe('Notes Routes', () => {
  const mockEnv = {
      BACKEND_SECRET: process.env.BACKEND_SECRET,
      // Also provide a mock for any other bindings your app uses
      KV: {
        get: async () => null,
        put: async () => {},
        delete: async () => {},
      },
    };

    const requestInit = {
      headers: {
        Authorization: `Bearer ${process.env.BACKEND_SECRET}`,
      },
    };
  test('GET /notes should return 200', async () => {
    const res = await router.request('/notes', requestInit, mockEnv)

    console.log('token:', process.env.BACKEND_SECRET)
console.log('Response:', res)
    // Add debugging info
    if (res.status !== 200) {
      console.log('Test failed - Status:', res.status)
      const text = await res.text()
      console.log('Test failed - Response:', text)
    }
    
    expect(res.status).toBe(200)
  })

  test('GET /notes should return correct message', async () => {
    const res = await router.request('/notes', requestInit, mockEnv)

    if (res.status === 200) {
      const data= await res.json()
      expect(data).toEqual( 'getting notes')
    }
  })

  test('GET /notes should return JSON content-type', async () => {
    const res = await router.request('/notes', requestInit, mockEnv)
    expect(res.headers.get('content-type')).toContain('application/json')
  })

  test('POST /notes should return 200', async () => {

    const res = await router.request('/notes',{
        method:'post',
        headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${process.env.BACKEND_SECRET}`,
          },
          body: JSON.stringify({
            key: 'test',
            name: 'Test User',
            email: 'test@example.com'
          })
        }, mockEnv)
    
    // Add debugging info
    if (res.status !== 200) {
      console.log('Test failed - Status:', res.status)
      const text = await res.text()
      console.log('Test failed - Response:', text)
    }
    
    expect(res.status).toBe(200)
  })
})
 
