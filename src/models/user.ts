export interface User {
    id: string;
    username: string;
    email: string;
    createdAt: string; // ISO string
    updatedAt: string; // ISO string

  }
  
  export interface UserCreateInput {
    username: string;
    email: string;
  }
  
  
  export class UserModel {
    private kv: memekv;
  
    constructor(kv: memekv) {
      this.kv = kv;
    }
  
    // Generate a unique ID for users
    private generateId(): string {
      return `user_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`;
    }
  
    // Create a new user
    async create(input: UserCreateInput): Promise<User> {
      // Check if username or email already exists
      const existingByUsername = await this.getByUsername(input.username);
      if (existingByUsername) {
        throw new Error('Username already exists');
      }
  
      const existingByEmail = await this.getByEmail(input.email);
      if (existingByEmail) {
        throw new Error('Email already exists');
      }
  
      const id = this.generateId();
      const now = new Date().toISOString();
      
      const user: User = {
        id,
        username: input.username.toLowerCase(),
        email: input.email.toLowerCase(),
        createdAt: now,
        updatedAt: now,
      };
  
      // Store the user
      await this.kv.put(`user:${id}`, JSON.stringify(user));
      
      // Create username -> id mapping
      await this.kv.put(`username:${user.username}`, id);
      
      // Create email -> id mapping
      await this.kv.put(`email:${user.email}`, id);
  
      return user;
    }
  
    // Get a user by ID
    async getById(id: string): Promise<User | null> {
      const userData = await this.kv.get(`user:${id}`);
      if (!userData) return null;
      
      return JSON.parse(userData) as User;
    }
  
    // Get a user by username
    async getByUsername(username: string): Promise<User | null> {
      const userId = await this.kv.get(`username:${username.toLowerCase()}`);
      if (!userId) return null;
      
      return this.getById(userId);
    }
  
    // Get a user by email
    async getByEmail(email: string): Promise<User | null> {
      const userId = await this.kv.get(`email:${email.toLowerCase()}`);
      if (!userId) return null;
      
      return this.getById(userId);
    }
  
    // Get all users with pagination (admin function)
    async getAllUsers(limit: number = 50, cursor?: string): Promise<{ users: User[], nextCursor?: string }> {
      const listResult = await this.kv.list({ 
        prefix: 'user:', 
        limit,
        cursor 
      });
      
      const users = await Promise.all(
        listResult.keys.map(async (key) => {
          const userData = await this.kv.get(key.name);
          return userData ? JSON.parse(userData) as User : null;
        })
      );
  
      return {
        users: users.filter(Boolean) as User[],
        nextCursor: listResult.list_complete ? undefined : listResult.cursor
      };
    }
  
  }