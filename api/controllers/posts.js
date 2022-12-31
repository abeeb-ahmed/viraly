import jwt from "jsonwebtoken";
import moment from "moment";

import { db } from "../connect.js";

export const getPosts = (req, res) => {
  const userId = req.query.userId;
  const token = req.cookies.accessToken;

  if (!token) return res.status(401).json("Not logged in");

  jwt.verify(token, process.env.JWT_PASSWORD, (err, userInfo) => {
    if (err) return res.status(403).json("Token is not valid");

    const q = userId
      ? "SELECT p.*, u.id AS userId, name, profilePic FROM posts AS p JOIN users AS u ON (u.id = p.userId) WHERE p.userId = ? ORDER BY p.createdAt DESC"
      : "SELECT p.*, u.id AS userId, name, profilePic FROM posts AS p JOIN users AS u ON (u.id = p.userId) LEFT JOIN relationships as r ON (p.userId = r.followedUserId) WHERE r.followerUserId = ? OR p.userId = ? ORDER BY p.createdAt DESC";

    db.query(q, [userId ? userId : userInfo.id, userInfo.id], (err, data) => {
      if (err) return res.status(500).json(err);
      return res.status(200).json(data);
    });
  });
};

export const sendPost = (req, res) => {
  const token = req.cookies.accessToken;
  if (!token) return res.status(401).json("Not logged in");

  jwt.verify(token, process.env.JWT_PASSWORD, (err, userInfo) => {
    if (err) return res.status(403).json("Token is not valid");

    const q =
      "INSERT INTO posts ( `desc`, `img`, `userId`, `createdAt`) VALUES (?)";

    const values = [
      req.body.desc,
      req.body.img,
      userInfo.id,
      moment(Date.now()).format("YYYY/MM/DD HH:mm:ss"),
    ];

    db.query(q, [values], (err, data) => {
      if (err) return res.status(500).json(err);
      return res.status(200).json(data);
    });
  });
};
