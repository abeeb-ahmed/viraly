import express from "express";
import cors from "cors";
import userRoutes from "./routes/users.js";
import authRouters from "./routes/auth.js";

const app = express();

app.use(express.json());
app.use(cors());

app.use("/api/users", userRoutes);
app.use("/api/auth", authRouters);

app.listen(8000, () => {
  console.log("Connected on port 8000");
});
