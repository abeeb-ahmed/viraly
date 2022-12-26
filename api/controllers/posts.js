import jwt from "jsonwebtoken";
import { db } from "../connect.js";

export const getPosts = (req, res) => {
  const token = req.cookies.accessToken;

  if (!token) return res.status(401).json("Not logged in");

  jwt.verify(token, process.env.JWT_PASSWORD, (err, userInfo) => {
    if (err) return res.status(403).json("Token is not valid");

    const q =
      "SELECT p.*, u.id AS userId, name, profilePic FROM posts AS p JOIN users as u ON (u.id = p.userId) LEFT JOIN relationships as r ON (p.userId = r.followedUserId) WHERE r.followerUserId = ? OR p.userId = ? ORDER BY p.createdAt DESC";

    db.query(q, [userInfo.id, userInfo.id], (err, data) => {
      if (err) return res.status(500).json(err);
      return res.status(200).json(data);
    });
  });
};
