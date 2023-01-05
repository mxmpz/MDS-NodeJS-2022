const File = require('../data/models/Files')
const User = require('../data/models/User')

const createFile = async (file, userId) => {
  // Vérification présence
  if (!file) {
    // Si il manque une donnée, on renvoit une erreur 400 (Bad Request)
    throw new Error('Missing file')
  }

  const newfile = new File({
    fileName: file.filename,
    originalName: file.originalname,
    mimeType: file.mimetype,
    path: file.path,
    size: file.size,
    user: userId
  })
  // On enregistre l'utilisateur et on récupère la donnée crée dans MongoDB
  const savedFile = await newfile.save()

  if (savedFile) {
    await User.findByIdAndUpdate(userId,
      { $push: { files: savedFile._id } },
      { $new: true, useFindAndModify: false })
  }

  const savedFileObject = savedFile.toObject()
  return savedFileObject
}

module.exports = {
  createFile
}
