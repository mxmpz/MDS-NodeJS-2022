const User = require('../data/models/User')
const File = require('../data/models/File')

const getUsers = async () => {
  const users = await User.find().select('-password')
  return users
}

const createUser = async (user) => {
  // Vérification de la présence de l'email et du password
  if (!user.email || !user.password) {
    // Si il manque une donnée, on renvoit une erreur 400 (Bad Request)
    throw new Error('Missing data')
  }

  const _user = new User({
    firstName: user.firstName,
    lastName: user.lastName,
    phone: user.phone,
    email: user.email,
    password: user.password
  })
  // On enregistre l'utilisateur et on récupère la donnée crée dans MongoDB
  const savedUser = await _user.save()

  // On transforme le résultat en objet
  const savedUserObject = savedUser.toObject()
  // On retire le password de l'objet renvoyé
  delete savedUserObject.password

  // On renvoit l'utilisateur dans la réponse de l'API
  return savedUserObject
}

const getUserByID = async (id) => {
  if (!id) {
    throw new Error('Missing ID')
  }

  // On récupère l'utilisateur dans la base de donnée
  const user = await User.findById(id).select('-password').populate('files')
  const userObject = user.toObject()
  return userObject
}

const updateUserById = async (id, user) => {
  // On verifie la présence de l'id dans l'URL
  if (!id) {
    throw new Error('Missing ID')
  }

  // On verifie la présence d'un body dans la requête
  if (!user) {
    throw new Error('Missing user')
  }

  // On met à jour l'utilisateur via la méthode mongoose findByAndUpdate
  const userUpadted = await User.findByIdAndUpdate(id, user, { new: true }).select('-password')
  const userObject = userUpadted.toObject()
  return userObject
}

const deleteUserById = async (id) => {
  // On verifie la présence de l'id dans l'URL
  if (!id) {
    throw new Error('Missing ID')
  }
  await File.remove({ user: id }).exec()
  await User.findByIdAndDelete(id)
}

module.exports = {
  getUsers,
  createUser,
  getUserByID,
  updateUserById,
  deleteUserById
}
