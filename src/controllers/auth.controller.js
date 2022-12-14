const jwt = require('jsonwebtoken')
const User = require('../data/models/User')

const loginUser = async (credentials) => {
  // Je vérifie la présence des paramètres
  if (!credentials.email || !credentials.password) {
    throw new Error('Invalid credentials')
  }

  const user = await User.findOne({ email: credentials.email })

  if (!user) {
    throw new Error('Invalid credentials')
  }

  user.comparePassword(credentials.password, (error, isMatch) => {
    if (isMatch) {
      const payload = {
        id: user.id
      }
      jwt.sign(payload, 'MON SUPER MOT DE PASSE SECRET', { expiresIn: '7d' }, (error, token) => {
        if (error) {
          throw new Error('Invalid credentials')
        }
        // On supprime le mot de passe de l'utilisateur récupéré en base
        const _user = user.toObject()
        delete _user.password
        // On retourne l'utilisateur et le token
        return {
          user,
          token
        }
      })
    } else {
      throw new Error('Invalid credentials')
    }
    if (error) {
      throw new Error('Invalid credentials')
    }
  })
  if (!user) {
    throw new Error('Invalid credentials')
  }
}

module.exports = {
  loginUser
}
