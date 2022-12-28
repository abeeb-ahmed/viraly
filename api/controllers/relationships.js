import { db } from "../connect.js";
import jwt from "jsonwebtoken";

export const getRelationship = (req, res) => {
  const q = "SELECT followerUserId FROM relationships WHERE followedUserId = ?";

  db.query(q, [req.query.followedUserId], (error, data) => {
    if (error) return res.status(500).json(error);

    return res
      .status(200)
      .json(data.map((relationship) => relationship.followerUserId));
  });
};

export const addRelationship = (req, res) => {
  const token = req.cookies.accessToken;

  if (!token) return res.status(401).json("Not logged in");

  jwt.verify(token, process.env.JWT_PASSWORD, (err, userInfo) => {
    if (err) return res.status(403).json("Token is not valid");

    const q =
      "INSERT INTO relationships (`followedUserId`, `followerUserId`) VALUES (?)";

    const values = [req.body.followedUserId, userInfo.id];

    db.query(q, [values], (err, data) => {
      if (err) return res.status(500).json(err);
      return res.status(200).json(data);
    });
  });
};

export const deleteRelationship = (req, res) => {
  const token = req.cookies.accessToken;

  if (!token) return res.status(401).json("Not logged in");

  jwt.verify(token, process.env.JWT_PASSWORD, (err, userInfo) => {
    if (err) return res.status(403).json("Token is not valid");

    const q =
      "DELETE FROM relationships WHERE `followedUserId` = ? AND `followerUserId` = ?";

    db.query(q, [req.query.followedUserId, userInfo.id], (err, data) => {
      if (err) return res.status(500).json(err);
      return res.status(200).json("User unfollowed");
    });
  });
};
