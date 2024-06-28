import express, { Request, Response } from "express";
import multer from "multer";
import { S3 } from "./s3";
import { ITShirtRepo } from "./t_shirts_repo";

export const setupApi = (dbInstance: ITShirtRepo, port: number) => {
  const app = express();
  const upload = multer();

  app.use(express.json());

  app.post(
    "/upload",
    upload.single("file"),
    async (req: Request, res: Response) => {
      try {
        const { name } = req.body;
        const file = req.file;

        if (!file) {
          throw new Error("No file uploaded");
        }

        const s3Url = await S3.UploasdTshirt(file, name);

        res.status(200).json({ message: "File uploaded successfully", s3Url });
      } catch (error) {
        console.error("Error uploading file:", error);
        res.status(500).json({ error: "Error uploading file" });
      }
    }
  );

  app.post("/tshirts", async (req: Request, res: Response) => {
    try {
      const tshirt = await dbInstance.createTShirt(req.body);
      res.status(201).json(tshirt);
    } catch (error) {
      console.error("Error creating T-Shirt:", error);
      res.status(500).json({ error: "Error creating T-Shirt" });
    }
  });

  app.get("/tshirts/:id", async (req: Request, res: Response) => {
    try {
      const { id } = req.params;
      const tshirt = await dbInstance.getTShirtById(Number(id));
      if (!tshirt) {
        res.status(404).json({ error: "T-Shirt not found" });
      } else {
        res.status(200).json(tshirt);
      }
    } catch (error) {
      console.error("Error getting T-Shirt:", error);
      res.status(500).json({ error: "Error getting T-Shirt" });
    }
  });

  app.get("/tshirts", async (req: Request, res: Response) => {
    try {
      const tshirts = await dbInstance.getAllTShirts();
      res.status(200).json(tshirts);
    } catch (error) {
      console.error("Error getting T-Shirts:", error);
      res.status(500).json({ error: "Error getting T-Shirts" });
    }
  });

  app.put("/tshirts/:id", async (req: Request, res: Response) => {
    try {
      const { id } = req.params;
      const updatedTShirt = await dbInstance.updateTShirt(Number(id), req.body);
      res.status(200).json(updatedTShirt);
    } catch (error) {
      console.error("Error updating T-Shirt:", error);
      res.status(500).json({ error: "Error updating T-Shirt" });
    }
  });

  app.delete("/tshirts/:id", async (req: Request, res: Response) => {
    try {
      const { id } = req.params;
      await dbInstance.deleteTShirt(Number(id));
      res.status(200).json({ message: "T-Shirt deleted successfully" });
    } catch (error) {
      console.error("Error deleting T-Shirt:", error);
      res.status(500).json({ error: "Error deleting T-Shirt" });
    }
  });

  app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
  });
};
