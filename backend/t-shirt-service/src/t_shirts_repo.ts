import { TShirt, PrismaClient } from "@prisma/client";

export interface ITShirtRepo {
  createTShirt(data: Partial<TShirt>): Promise<TShirt>;
  getTShirtById(id: number): Promise<TShirt | null>;
  getAllTShirts(): Promise<TShirt[]>;
  updateTShirt(id: number, data: Partial<TShirt>): Promise<TShirt>;
  deleteTShirt(id: number): Promise<TShirt>;
}

const prisma = new PrismaClient();

class TShirtRepo implements ITShirtRepo {
  async createTShirt(data: Partial<TShirt>): Promise<TShirt> {
    return prisma.tShirt.create({
      data: {
        title: data.title!,
        description: data.description!,
        price: data.price!,
        imageUrl: data.imageUrl!,
        sizes: data.sizes!,
        sellerId: data.sellerId!,
      },
    });
  }

  async getTShirtById(id: number): Promise<TShirt | null> {
    return prisma.tShirt.findUnique({
      where: { id },
    });
  }

  async getAllTShirts(): Promise<TShirt[]> {
    return prisma.tShirt.findMany();
  }
  async updateTShirt(id: number, data: Partial<TShirt>): Promise<TShirt> {
    return prisma.tShirt.update({
      where: { id },
      data: {
        title: data.title,
        description: data.description,
        price: data.price,
        imageUrl: data.imageUrl,
        sizes: data.sizes,
        sellerId: data.sellerId,
      },
    });
  }

  async deleteTShirt(id: number): Promise<TShirt> {
    return prisma.tShirt.delete({
      where: { id },
    });
  }
}

export const db_repo = new TShirtRepo();
