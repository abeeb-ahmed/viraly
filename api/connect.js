import mysql from "mysql";
import * as dotenv from "dotenv";

dotenv.config();

export const db = mysql.createPool({
  host: "localhost",
  user: "root",
  database: "socials",
  password: process.env.MYSQL_PASSWORD,
});
