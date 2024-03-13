// app.js

const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");
const routes = require("./routes");
const mongoose = require("mongoose");
const path = require("path");
const uploadImagesToMongoDB = require("./utils/uploadImages"); // Importa la función para subir imágenes
require("dotenv").config();

const app = express();

app.use(cors());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use("/api", routes);

const PORT = process.env.PORT || 8000;

// Middleware
app.use(express.json());

// Conectar a la base de datos
mongoose
  .connect(process.env.DB_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => {
    console.log("MongoDB connected");
    // Llama a la función para subir imágenes a MongoDB después de que la conexión se haya establecido
    uploadImagesToMongoDB();
  })
  .catch((err) => console.error("MongoDB connection error:", err));

// Rutas
app.get("/", (req, res) => {
  res.send("Hello, world!");
});

// Establecer la carpeta 'public' como carpeta estática
app.use(express.static(path.join(__dirname, "public")));

// Escuchar el puerto
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
