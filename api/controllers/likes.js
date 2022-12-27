import { db } from "../connect.js";
import jwt from "jsonwebtoken";

export const getLikes = (req, res) => {
  const q = "SELECT userId FROM likes WHERE postId = ?";

  db.query(q, [req.query.postId], (error, data) => {
    if (error) return res.status(500).json(error);

    return res.status(200).json(data.map((like) => like.userId));
  });
};

export const addLikes = (req, res) => {
  const token = req.cookies.accessToken;
  jwt.verify(token, process.env.JWT_PASSWORD, (err, userInfo) => {
    if (err) return res.status(403).json("Token is not valid");

    const q = "INSERT INTO likes (`userId`, `postId`) VALUES (?)";

    const values = [userInfo.id, req.body.postId];

    db.query(q, [values], (err, data) => {
      if (err) return res.status(500).json(err);
      return res.status(200).json("Post has been liked");
    });
  });
};

export const deleteLikes = (req, res) => {
  try {
    const token = req.cookies.accessToken;
    jwt.verify(token, process.env.JWT_PASSWORD, (err, userInfo) => {
      if (err) return res.status(403).json("Token is not valid");

      const q = "DELETE FROM likes WHERE `userId` = ? AND `postId` = ?";

      db.query(q, [userInfo.id, req.query.postId], (err, data) => {
        if (err) return res.status(500).json(err);
        return res.status(200).json("Like has been removed");
      });
    });
  } catch (error) {
    console.log(error);
  }
};
