const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");
const User = require("../models/User");
require("dotenv").config();

const secretKey = process.env.KEY;

exports.login = async (req, res) => {
  const { email, password } = req.body;

  try {
    // Buscar el usuario por su correo electrónico
    let user = await User.findOne({ email });

    // Verificar si el usuario existe en la base de datos
    if (!user) {
      console.log("User not found"); // Agrega un mensaje de depuración
      return res.status(404).json({ message: "User not found" });
    }

    // Verificar si la contraseña coincide
    const isPasswordValid = await bcrypt.compare(password, user.password);

    if (!isPasswordValid) {
      console.log("Invalid password"); // Agrega un mensaje de depuración
      return res.status(401).json({ message: "Invalid password" });
    }

    // Generar el token
    const token = jwt.sign(
      { email: user.email, isAdmin: user.email === "admin@admin.com" },
      secretKey
    );

    // Devolver el token y otros datos relevantes
    res.status(200).json({ token, firstName: user.firstName });
  } catch (error) {
    console.error(error); // Agrega un mensaje de depuración para los errores
    res.status(500).json({ message: "Internal server error" });
  }
};

exports.register = async (req, res) => {
  const { email, password, firstName, lastName, accountType } = req.body;

  try {
    const existingUser = await User.findOne({ email });

    if (existingUser) {
      return res.status(400).json({ message: "User already exists" });
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const newUser = new User({
      email,
      password: hashedPassword,
      firstName,
      lastName,
      accountType,
    });
    await newUser.save();

    res.status(201).json({ message: "User created successfully" });
  } catch (error) {
    res.status(500).json({ message: "Internal server error" });
  }
};
