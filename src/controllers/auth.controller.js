const jwt = require('jsonwebtoken')
const User = require('../data/models/User')

const loginUser = async (credentials, callback) => {
  let _error
  // Je vérifie la présence des paramètres
  if (!credentials.email || !credentials.password) {
    _error = 'Invalid credentials'
  }

  const user = await User.findOne({ email: credentials.email })
  if (!user) {
    _error = 'Invalid credentials'
    return callback(_error, null)
  }

  user.comparePassword(credentials.password, (error, isMatch) => {
    if (isMatch) {
      const payload = {
        id: user.id
      }
      jwt.sign(payload, process.env.TOKEN_SECRET, { expiresIn: '7d' }, (error, token) => {
        if (error) {
          _error = 'Invalid credentials'
        }
        // On supprime le mot de passe de l'utilisateur récupéré en base
        const _user = user.toObject()
        delete _user.password
        // On retourne l'utilisateur et le token
        return callback(_error, {
          user,
          token
        })
      })
    } else {
      error = 'Invalid credentials'
      return callback(_error, null)
    }
    if (error) {
      console.error(error)
      error = 'Invalid credentials'
      return callback(_error, null)
    }
  })
  if (!user) {
    _error = 'Invalid credentials'
    return callback(_error, null)
  }
}

module.exports = {
  loginUser
}
