import { db } from "../connect.js";

export const getUser = (req, res) => {
  let q = "SELECT  * FROM users WHERE username = ? ";
  db.query(q, [req.body.username]);
};
