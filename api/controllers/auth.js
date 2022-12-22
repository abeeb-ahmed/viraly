import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import { db } from "../connect.js";

export const registerUser = (req, res) => {
  const salt = bcrypt.genSaltSync(10);
  const hashedPassword = bcrypt.hashSync(req.body.password, salt);

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

export const login = (req, res) => {
  const q = "SELECT * FROM users WHERE username = ?";
  db.query(q, [req.body.username], (error, data) => {
    if (error) return res.status(500).json(error);
    if (data[0].length === 0) {
      return res.status(404).json("User not found");
    }

    // compare hashed password
    const checkedPassword = bcrypt.compareSync(
      req.body.password,
      data[0].password
    );

    if (!checkedPassword) {
      return res.status(500).json("Username or password is incorrect");
    } else {
      const token = jwt.sign({ id: data[0].id }, process.env.JWT_PASSWORD);
      const { password, ...others } = data;
      res
        .cookie("accessToken", token, {
          httpOnly: true,
        })
        .status(200)
        .json(others);
    }
  });
};

export const logout = (req, res) => {
  res
    .clearCookie("accessToken", {
      secure: true,
      sameSite: "none",
    })
    .status(200)
    .json("User has been successfully signed out");
};
