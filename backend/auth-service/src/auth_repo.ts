import mongoose, { Document, Schema, Model } from "mongoose";
import Redis, { RedisClientType, createClient } from "redis";
import { promisify } from "util";
import dotenv from "dotenv";

dotenv.config();

export interface UserDocument extends Document {
  email: string;
  password: string;
}

const userSchema = new Schema<UserDocument>({
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
});

export const UserModel: Model<UserDocument> = mongoose.model(
  "User",
  userSchema
);

interface IAuthDB {
  register_user(email: string, password: string): Promise<UserDocument | null>;
  login_user(email: string, password: string): Promise<UserDocument | null>;
  disconnect(): Promise<string>;
}

class AuthDB implements IAuthDB {
  private dbUri: string;
  private connection;
  constructor(dbUri: string) {
    this.dbUri = dbUri;
    this.connection = mongoose.connect(this.dbUri);
  }

  async register_user(
    email: string,
    password: string
  ): Promise<UserDocument | null> {
    try {
      const user = await UserModel.create({ email, password });
      return user;
    } catch (error) {
      console.error("Error registering user:", error);
      return null;
    }
  }

  async login_user(
    email: string,
    password: string
  ): Promise<UserDocument | null> {
    try {
      const user = await UserModel.findOne({ email, password }).exec();
      if (!user) {
        throw new Error("User not found or invalid credentials");
      }
      return user;
    } catch (error) {
      console.error("Error logging in user:", error);
      return null;
    }
  }

  async disconnect(): Promise<string> {
    try {
      await this.connection.close();
      return "Disconnected from MongoDB";
    } catch (error) {
      console.error("Error disconnecting from MongoDB:", error);
      return "Error disconnecting from MongoDB";
    }
  }
}

interface ITokenDB {
  issue_token(email: string): Promise<{ token: string }>;
  getUser(token: string): Promise<any>;
  check_token(email: string): Promise<boolean>;
}

class TokenDB implements ITokenDB {
  client: RedisClientType;
  constructor(url: string) {
    this.client = createClient({ url: url });
    this.client.connect().catch(console.error);
  }

  async issue_token(email: string): Promise<{ token: string }> {
    const token = this.generateToken();
    await this.client.set(email, token);
    return { token };
  }

  async getUser(token: string): Promise<any> {
    const email = await this.client.get(token);
    if (!email) {
      throw new Error("Token not found");
    }
    const userData = {}; // Placeholder, you should implement logic to retrieve user data
    return userData;
  }

  async check_token(email: string): Promise<boolean> {
    const token = await promisify(this.client.get).call(this.client, email);
    return !!token;
  }

  private generateToken(): string {
    return Math.random().toString(36).slice(2);
  }
}

// Define AuthRepo and implement IAuthRepo
interface IAuthRepo {
  create_user(email: string, password: string): Promise<UserDocument | null>;
  get_user(email: string, password: string): Promise<UserDocument | null>;
  issue_token(email: string): Promise<{ token: string }>;
  check_token(email: string): Promise<boolean>;
  getUser(token: string): Promise<any>;
}

class AuthRepo implements IAuthRepo {
  private authDB: IAuthDB;
  private tokenDB: ITokenDB;

  constructor(authDB: IAuthDB, tokenDB: ITokenDB) {
    this.authDB = authDB;
    this.tokenDB = tokenDB;
  }

  async create_user(
    email: string,
    password: string
  ): Promise<UserDocument | null> {
    return await this.authDB.register_user(email, password);
  }

  async get_user(
    email: string,
    password: string
  ): Promise<UserDocument | null> {
    return await this.authDB.login_user(email, password);
  }

  async issue_token(email: string): Promise<{ token: string }> {
    return await this.tokenDB.issue_token(email);
  }

  async check_token(email: string): Promise<boolean> {
    return await this.tokenDB.check_token(email);
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
