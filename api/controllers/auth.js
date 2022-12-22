import bcrypt from "bcrypt";
import { db } from "../connect.js";

export const registerUser = (req, res) => {
  const salt = bcrypt.genSaltSync(10);
  const hash = bcrypt.hashSync(req.body.password, salt);

  const q = "SELECT * FROM users WHERE username = ?";

  db.query(q, [req.body.username], (error, data) => {
    if (error) return res.status(500).json(error);
    if (data.length) return res.status(500).json("User already exists");

    const q =
      "INSERT INTO users (`username`, `email`, `name`, `password`) VALUES (?)";

    const values = [
      req.body.username,
      req.body.email,
      req.body.name,
      hashedPassword,
    ];

    db.query(q, [values], (error, data) => {
      if (error) return res.status(500).json(error);
      return res.status(200).json("User created");
    });
  });
};
