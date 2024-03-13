const Image = require("../models/Image");

// Obtener una imagen por su ID
exports.getImageById = async (req, res) => {
  try {
    const { id } = req.params;
    const image = await Image.findById(id);
    if (!image) {
      return res.status(404).json({ message: "Image not found" });
    }
    res.set("Content-Type", "image/*"); // Establecer el tipo de contenido como imagen
    res.send(image.data);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Internal server error" });
  }
};

// Obtener todas las imágenes
exports.getAllImages = async (req, res) => {
  try {
    const images = await Image.find();
    res.json(images);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Internal server error" });
  }
};

exports.getImageByName = async (req, res) => {
  try {
    const { name } = req.params;
    const image = await Image.findOne({ name });
    if (!image) {
      return res.status(404).json({ message: "Image not found" });
    }
    res.set("Content-Type", "image/*"); // Establecer el tipo de contenido como imagen
    res.send(image.data);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Internal server error" });
  }
};
