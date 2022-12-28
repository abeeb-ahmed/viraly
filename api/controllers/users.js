import { db } from "../connect.js";

export const getUser = (req, res) => {
  let q = "SELECT  * FROM users WHERE id = ? ";
  db.query(q, [req.params.userId], (error, data) => {
    if (error) return res.status(500).json(error);

    return res.status(200).json(data[0]);
  });
};
