import { db } from "../connect.js";
import jwt from "jsonwebtoken";

export const getUser = (req, res) => {
  let q = "SELECT  * FROM users WHERE id = ? ";
  db.query(q, [req.params.userId], (error, data) => {
    if (error) return res.status(500).json(error);

    return res.status(200).json(data[0]);
  });
};

export const updateUser = (req, res) => {
  const token = req.cookies.accessToken;

  if (!token) return res.status(401).json("Not logged in");

  jwt.verify(token, process.env.JWT_PASSWORD, (err, userInfo) => {
    if (err) return res.status(403).json("Token is not valid");

    const q =
      "UPDATE users SET `username` = ?, `email`= ?, `name` = ?, `city` = ?, `website` = ?, `profilePic` = ? WHERE `id` = ?";

    db.query(
      q,
      [
        req.body.username,
        req.body.email,
        req.body.name,
        req.body.city,
        req.body.website,
        req.body.profilePic,
        userInfo.id,
      ],
      (err, data) => {
        if (err) return res.status(500).json(err);
        return res.status(200).json("User updated");
      }
    );
  });
};
