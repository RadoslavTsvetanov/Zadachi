import mongoose, { Document, Schema, Model } from "mongoose";
import Redis, { RedisClientType, createClient } from "redis";
import { promisify } from "util";

// Define UserDocument and UserModel
export interface UserDocument extends Document {
  username: string;
  password: string;
}

const userSchema = new Schema<UserDocument>({
  username: { type: String, required: true, unique: true },
  password: { type: String, required: true },
});

export const UserModel: Model<UserDocument> = mongoose.model(
  "User",
  userSchema
);

// Define interfaces for AuthDB and TokenDB
interface IAuthDB {
  register_user(username: string, password: string): Promise<void>;
  login_user(username: string, password: string): Promise<void>;
  disconnect(): Promise<void>;
}

class AuthDB implements IAuthDB {
  private dbUri: string;
  private connection: mongoose.Connection;

  constructor(dbUri: string) {
    this.dbUri = dbUri;
    this.connection = mongoose.createConnection(this.dbUri);
  }

  async register_user(username: string, password: string): Promise<void> {
    try {
      await UserModel.create({ username, password });
    } catch (error) {
      console.error("Error registering user:", error);
      throw error;
    }
  }

  async login_user(username: string, password: string): Promise<void> {
    try {
      const user = await UserModel.findOne({ username, password }).exec();
      if (!user) {
        throw new Error("User not found or invalid credentials");
      }
      // Perform login logic here
    } catch (error) {
      console.error("Error logging in user:", error);
      throw error;
    }
  }

  async disconnect(): Promise<void> {
    try {
      await this.connection.close();
      console.log("Disconnected from MongoDB");
    } catch (error) {
      console.error("Error disconnecting from MongoDB:", error);
      throw error;
    }
  }
}

interface ITokenDB {
  issue_token(username: string): Promise<{ token: string }>;
  getUser(token: string): Promise<any>;
  check_token(username: string): Promise<boolean>;
}

class TokenDB implements ITokenDB {
  client: RedisClientType;
  constructor(url: string) {
    this.client = Redis.createClient({ url: url });
  }

  async issue_token(username: string): Promise<{ token: string }> {
    const token = this.generateToken();
    await this.client.set(username, token);
    return { token };
  }

  async getUser(token: string): Promise<any> {
    const username = await this.client.get(token);
    if (!username) {
      throw new Error("Token not found");
    }
    const userData = {}; // Placeholder, you should implement logic to retrieve user data
    return userData;
  }

  async check_token(username: string): Promise<boolean> {
    const token = await promisify(this.client.get).call(this.client, username);
    return !!token;
  }

  private generateToken(): string {
    return Math.random().toString(36).slice(2);
  }
}

// Define AuthRepo and implement IAuthRepo
interface IAuthRepo {
  create_user(username: string, password: string): Promise<void>;
  get_user(username: string, password: string): Promise<void>;
  issue_token(username: string): Promise<{ token: string }>;
  check_token(username: string): Promise<boolean>;
  getUser(token: string): Promise<any>;
}

class AuthRepo implements IAuthRepo {
  private authDB: IAuthDB;
  private tokenDB: ITokenDB;

  constructor(authDB: IAuthDB, tokenDB: ITokenDB) {
    this.authDB = authDB;
    this.tokenDB = tokenDB;
  }

  async create_user(username: string, password: string): Promise<void> {
    await this.authDB.register_user(username, password);
  }

  async get_user(username: string, password: string): Promise<void> {
    await this.authDB.login_user(username, password);
  }

  async issue_token(username: string): Promise<{ token: string }> {
    return await this.tokenDB.issue_token(username);
  }

  async check_token(username: string): Promise<boolean> {
    return await this.tokenDB.check_token(username);
  }

  async getUser(token: string): Promise<any> {
    return await this.tokenDB.getUser(token);
  }
}

// Initialize instances and export
const { MONGO_URI, REDIS_URI } = process.env;
if (!MONGO_URI || !REDIS_URI) {
  throw new Error("Missing required environment variables");
}

const authDB = new AuthDB(MONGO_URI);
const tokenDB = new TokenDB(REDIS_URI);

export const auth_repo = new AuthRepo(authDB, tokenDB);
