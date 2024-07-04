import express from "express";
import bodyParser from "body-parser";
import bcrypt from "bcrypt";
import { User } from "./models";
// import { auth_repo } from "./auth_repo";
import cors from "cors";
const saltRounds = 10;
const app = express();
const PORT = process.env.PORT || 6000;
console.log(typeof PORT);
app.use(cors({ origin: true, credentials: true }));

app.use(bodyParser.json());
// app.post("/register", async (req, res) => {
//   const { username, password } = req.body;
//   try {
//     const new_user = await auth_repo.create_user(username, password);
//     if (new_user === null || new_user === undefined) {
//       res.status(500).send({ error: "Error registering user" });
//       return;
//     }
//     res
//       .status(201)
//       .send({ message: "User registered successfully", response: new_user });
//   } catch (error) {
//     res.status(500).send({ error: error.message });
//   }
// });

// app.post("/login", async (req, res) => {
//   const { username, password } = req.body;
//   try {
//     await auth_repo.get_user(username, password);
//     const token = await auth_repo.issue_token(username);
//     res.status(200).send(token);
//   } catch (error) {
//     res.status(401).send({ error: error.message });
//   }
// });

// app.get("/check-token", async (req, res) => {
//   const { username } = req.query;
//   try {
//     const isValid = await auth_repo.check_token(username as string);
//     res.status(200).send({ isValid });
//   } catch (error) {
//     res.status(500).send({ error: error.message });
//   }
// });

// app.get("/user", async (req, res) => {
//   const { token } = req.query;
//   try {
//     const user = await auth_repo.getUser(token as string);
//     res.status(200).send(user);
//   } catch (error) {
//     res.status(500).send({ error: error.message });
//   }
// });

app.get("/login", async (req, res) => {});

app.post("/user", async (req, res) => {
  const user = "hihi";

  try {
    res.status(200).json({ user });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});
// Start the server
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
