import { describe, test, expect, vi, beforeEach } from 'vitest'
import { 
  notesHandler, 
  notesPostHandler, 
  writeNotesToKV, 
  readNotesFromKV, 
  deleteNotesFromKV 
} from './notes'

// Mock next function
const createMockNext = () => vi.fn()
// Mock Hono context
const createMockContext = (overrides = {}) => {
  return {
    json: vi.fn((data, status) => ({ data, status })),
    req: {
      valid: vi.fn(),
      param: vi.fn(),
    },
    env: {
      KV: {
        put: vi.fn(),
        get: vi.fn(),
        delete: vi.fn(),
      },
       BACKEND_SECRET: process.env.BACKEND_SECRET,
    },
    ...overrides
  }
}

describe('Notes Controllers', () => {
  beforeEach(() => {
    vi.clearAllMocks()
  })

  describe('notesHandler', () => {
    test('should return getting notes message', async () => {
      const mockContext = createMockContext()
        const mockNext = createMockNext()
      await notesHandler(mockContext as any, mockNext)
      
      expect(mockContext.json).toHaveBeenCalledWith('getting notes')
    })
  })

  describe('notesPostHandler', () => {
    test('should return success message with user data', async () => {
      const mockBody = {
        name: 'John Doe',
        email: 'john@example.com',
        key: 'test-key'
      }
      const mockNext = createMockNext()
      const mockContext = createMockContext({
        req: {
          valid: vi.fn().mockReturnValue(mockBody)
        }
      })
      
      await notesPostHandler(mockContext as any, mockNext)
      
      expect(mockContext.req.valid).toHaveBeenCalledWith('json')
      expect(mockContext.json).toHaveBeenCalledWith({
        message: `wrote ${mockBody.name} to ${mockBody.email} with key ${mockBody.key} successfully!`
      })
    })
  })

  describe('writeNotesToKV', () => {
    test('should write data to KV store successfully', async () => {
      const mockBody = {
        name: 'Test User',
        email: 'test@example.com',
        key: 'test-key'
      }
      const mockNext = createMockNext()
      const mockContext = createMockContext({
        req: {
          valid: vi.fn().mockReturnValue(mockBody)
        }
      })
      
      mockContext.env.KV.put.mockResolvedValue(undefined)
      
      await writeNotesToKV(mockContext as any, mockNext)  
      
      expect(mockContext.req.valid).toHaveBeenCalledWith('json')
      expect(mockContext.env.KV.put).toHaveBeenCalledWith('test', JSON.stringify(mockBody))
      expect(mockContext.json).toHaveBeenCalledWith({
        message: `Successfully wrote to key 'test'`,
        data: mockBody
      })
    })
  })

  describe('readNotesFromKV', () => {
    test('should return data when key exists', async () => {
      const mockValue = JSON.stringify({ name: 'Test', email: 'test@example.com' })
      const mockContext = createMockContext()
      const mockNext = createMockNext()
      
      mockContext.env.KV.get.mockResolvedValue(mockValue)
      
      await readNotesFromKV(mockContext as any, mockNext)   
      
      expect(mockContext.env.KV.get).toHaveBeenCalledWith('test')
      expect(mockContext.json).toHaveBeenCalledWith(`Key  found ${mockValue}`, 200)
    })

    test('should return 404 when key does not exist', async () => {
      const mockContext = createMockContext()
      const mockNext = createMockNext()
      
      mockContext.env.KV.get.mockResolvedValue(null)
      
      await readNotesFromKV(mockContext as any, mockNext)
      
      expect(mockContext.env.KV.get).toHaveBeenCalledWith('test')
      expect(mockContext.json).toHaveBeenCalledWith('Key not found', 404)
    })
  })

  describe('deleteNotesFromKV', () => {
    test('should delete key successfully when it exists', async () => {
      const mockKey = 'test-key'
      const mockValue = JSON.stringify({ name: 'Test', email: 'test@example.com' })
      const mockContext = createMockContext({
        req: {
          param: vi.fn().mockReturnValue(mockKey)
        }
      })
      const mockNext = createMockNext()
      
      mockContext.env.KV.get.mockResolvedValue(mockValue)
      mockContext.env.KV.delete.mockResolvedValue(true)
      
      // Mock console.log to avoid output during tests
      const consoleSpy = vi.spyOn(console, 'log').mockImplementation(() => {})
      
      await deleteNotesFromKV(mockContext as any, mockNext) 
      
      expect(mockContext.req.param).toHaveBeenCalledWith('key')
      expect(mockContext.env.KV.get).toHaveBeenCalledWith(mockKey)
      expect(mockContext.env.KV.delete).toHaveBeenCalledWith(mockKey)
      expect(mockContext.json).toHaveBeenCalledWith(`Key  found ${mockValue} deleted true`, 200)
      
      consoleSpy.mockRestore()
    })

    test('should return 404 when key does not exist', async () => {
      const mockKey = 'non-existent-key'
      const mockContext = createMockContext({
        req: {
          param: vi.fn().mockReturnValue(mockKey)
        }
      })
      
      mockContext.env.KV.get.mockResolvedValue(null)
      const mockNext = createMockNext()
      
      // Mock console.log to avoid output during tests
      const consoleSpy = vi.spyOn(console, 'log').mockImplementation(() => {})
      
      await deleteNotesFromKV(mockContext as any, mockNext) 
      
      expect(mockContext.req.param).toHaveBeenCalledWith('key')
      expect(mockContext.env.KV.get).toHaveBeenCalledWith(mockKey)
      expect(mockContext.env.KV.delete).not.toHaveBeenCalled()
      expect(mockContext.json).toHaveBeenCalledWith('Key not found', 404)
      
      consoleSpy.mockRestore()
    })

    test('should handle KV delete failure', async () => {
      const mockKey = 'test-key'
      const mockValue = JSON.stringify({ name: 'Test', email: 'test@example.com' })
      const mockContext = createMockContext({
        req: {
          param: vi.fn().mockReturnValue(mockKey)
        }
      })
      const mockNext = createMockNext()
      
      mockContext.env.KV.get.mockResolvedValue(mockValue)
      mockContext.env.KV.delete.mockResolvedValue(false)
      
      // Mock console.log to avoid output during tests
      const consoleSpy = vi.spyOn(console, 'log').mockImplementation(() => {})
      
      await deleteNotesFromKV(mockContext as any, mockNext)                       
      
      expect(mockContext.json).toHaveBeenCalledWith(`Key  found ${mockValue} deleted false`, 200)
      
      consoleSpy.mockRestore()
    })
  })

  describe('Error handling', () => {
    test('writeNotesToKV should handle KV put errors', async () => {
      const mockBody = { name: 'Test', email: 'test@example.com', key: 'test' }
      const mockContext = createMockContext({
        req: {
          valid: vi.fn().mockReturnValue(mockBody)
        }
      })
      const mockNext = createMockNext()
      
      const mockError = new Error('KV put failed')
      mockContext.env.KV.put.mockRejectedValue(mockError)
      
      await expect(writeNotesToKV(mockContext as any, mockNext)).rejects.toThrow('KV put failed')           
    })

    test('readNotesFromKV should handle KV get errors', async () => {
      const mockContext = createMockContext()
      const mockError = new Error('KV get failed')
      const mockNext = createMockNext()
      
      mockContext.env.KV.get.mockRejectedValue(mockError)
      
      await expect(readNotesFromKV(mockContext as any, mockNext)).rejects.toThrow('KV get failed')    
    })

    test('deleteNotesFromKV should handle KV delete errors', async () => {
      const mockKey = 'test-key'
      const mockValue = 'test-value'
      const mockContext = createMockContext({
        req: {
          param: vi.fn().mockReturnValue(mockKey)
        }
      })
      const mockNext = createMockNext()
      
      mockContext.env.KV.get.mockResolvedValue(mockValue)
      const mockError = new Error('KV delete failed')
      mockContext.env.KV.delete.mockRejectedValue(mockError)
      
      // Mock console.log to avoid output during tests
      const consoleSpy = vi.spyOn(console, 'log').mockImplementation(() => {})
      
      await expect(deleteNotesFromKV(mockContext as any, mockNext)).rejects.toThrow('KV delete failed')
      
      consoleSpy.mockRestore()
    })
  })
})