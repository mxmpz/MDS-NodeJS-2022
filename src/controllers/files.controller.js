const File = require('../data/models/Files')
const User = require('../data/models/User')

const createFile = async (file, userId) => {
  // Vérification présence
  if (!file) {
    // Si il manque une donnée, on renvoit une erreur 400 (Bad Request)
    throw new Error('Missing file')
  }

  const newfile = new File({
    fileName: file.fileName,
    originalName: file.originalName,
    mimeType: file.mimeType,
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

/* const downloadFileByID = async (id) => {
  if (!id) {
    throw new Error('Missing ID')
  }

  // On récupère l'utilisateur dans la base de donnée
  const file = await File.findById(id)
  const fileObject = file.toObject()
  return fileObject
} */

module.exports = {
  createFile/*,
  downloadFileByID */
}
