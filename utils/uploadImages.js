const fs = require("fs");
const path = require("path");
const Image = require("../models/Image");

const uploadImagesToMongoDB = async () => {
  try {
    const imagesPath = path.join(__dirname, "../public");
    const imageFiles = fs.readdirSync(imagesPath);

    for (const imageFile of imageFiles) {
      // Verificar si la imagen ya está en la base de datos
      const existingImage = await Image.findOne({ name: imageFile });
      if (existingImage) {
        console.log(`Image ${imageFile} already exists in the database`);
        continue; // Saltar al siguiente archivo de imagen
      }

      // Si la imagen no existe en la base de datos, cargarla
      const imageData = fs.readFileSync(path.join(imagesPath, imageFile));
      const image = new Image({
        url: imageFile,
        data: imageData,
        name: imageFile,
      });
      await image.save();
      console.log(`Image ${imageFile} uploaded successfully`);
    }
  } catch (error) {
    console.error("Error uploading images to MongoDB:", error);
  }
};

module.exports = uploadImagesToMongoDB;
