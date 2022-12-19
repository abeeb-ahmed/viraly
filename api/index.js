import express from "express";
import cors from "cors";
import mysql from "mysql";
import * as dotenv from "dotenv";

dotenv.config();

const app = express();

const db = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: process.env.MYSQL_PASSWORD,
});

app.use(express.json());
app.use(cors());

app.listen(8000, () => {
  console.log("Connected on port 8000");
});
