// crudService.ts
import {
  PrismaClient,
  Prisma,
  User,
  UserProfile,
  TShirt,
  Order,
} from "@prisma/client";

// Initialize Prisma Client
const prisma = new PrismaClient();

class CrudService {
  // User operations
  async createUser(data: Prisma.UserCreateInput): Promise<User> {
    return prisma.user.create({
      data,
    });
  }

  async getUser(id: number): Promise<User | null> {
    return prisma.user.findUnique({
      where: { id },
      include: { profile: true, orders: true },
    });
  }

  async updateUser(id: number, data: Prisma.UserUpdateInput): Promise<User> {
    return prisma.user.update({
      where: { id },
      data,
    });
  }

  async deleteUser(id: number): Promise<User> {
    return prisma.user.delete({
      where: { id },
    });
  }

  // UserProfile operations
  async createUserProfile(
    data: Prisma.UserProfileCreateInput
  ): Promise<UserProfile> {
    return prisma.userProfile.create({
      data,
    });
  }

  async getUserProfile(id: number): Promise<UserProfile | null> {
    return prisma.userProfile.findUnique({
      where: { id },
      include: { User: true, tshirts: true },
    });
  }

  async updateUserProfile(
    id: number,
    data: Prisma.UserProfileUpdateInput
  ): Promise<UserProfile> {
    return prisma.userProfile.update({
      where: { id },
      data,
    });
  }

  async deleteUserProfile(id: number): Promise<UserProfile> {
    return prisma.userProfile.delete({
      where: { id },
    });
  }

  // TShirt operations
  async createTShirt(data: Prisma.TShirtCreateInput): Promise<TShirt> {
    return prisma.tShirt.create({
      data,
    });
  }

  async getTShirt(id: number): Promise<TShirt | null> {
    return prisma.tShirt.findUnique({
      where: { id },
      include: { seller: true, orders: true },
    });
  }

  async updateTShirt(
    id: number,
    data: Prisma.TShirtUpdateInput
  ): Promise<TShirt> {
    return prisma.tShirt.update({
      where: { id },
      data,
    });
  }

  async deleteTShirt(id: number): Promise<TShirt> {
    return prisma.tShirt.delete({
      where: { id },
    });
  }

  // Order operations
  async createOrder(data: Prisma.OrderCreateInput): Promise<Order> {
    return prisma.order.create({
      data,
    });
  }

  async getOrder(id: number): Promise<Order | null> {
    return prisma.order.findUnique({
      where: { id },
      include: { user: true, tshirt: true },
    });
  }

  async updateOrder(id: number, data: Prisma.OrderUpdateInput): Promise<Order> {
    return prisma.order.update({
      where: { id },
      data,
    });
  }

  async deleteOrder(id: number): Promise<Order> {
    return prisma.order.delete({
      where: { id },
    });
  }
}

// exampleUsage.ts
const crudService = new CrudService();

// Create a new user
async function createUser() {
  const newUser = await crudService.createUser({
    authId: "some-auth-id",
    profile: {
      create: {
        name: "John Doe",
        address: "123 Main St",
        phone: "555-1234",
      },
    },
  });
  console.log("Created User:", newUser);
}

// Get a user by id
async function getUser(id: number) {
  const user = await crudService.getUser(id);
  console.log("User:", user);
}

// Update a user
async function updateUser(id: number, data: Prisma.UserUpdateInput) {
  const updatedUser = await crudService.updateUser(id, data);
  console.log("Updated User:", updatedUser);
}

// Delete a user
async function deleteUser(id: number) {
  await crudService.deleteUser(id);
  console.log("Deleted User with id:", id);
}

// Run example functions
createUser();
getUser(1);
updateUser(1, { role: "ADMIN" });
deleteUser(1);
