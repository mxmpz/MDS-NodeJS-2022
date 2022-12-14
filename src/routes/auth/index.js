const User = require('../../data/models/User')
const jwt = require('jsonwebtoken')

const router = require('express').Router()

router.route('/login')
  .post(async (req, res) => {
    const credentials = req.body

    if (!credentials.email || !credentials.password) {
      return res.status(403).send('Invalid credentials')
    }

    try {
      const user = await User.findOne({ email: credentials.email })

      if (!user) {
        return res.status(403).send('Invalid credentials')
      }
      // if (!user) return res.status(403).send('Invalid crednetials')

      user.comparePassword(credentials.password, (error, isMatch) => {
        if (error) {
          return res.status(500).send('Invalid credentials')
        }

        if (isMatch) {
          const payload = {
            id: user.id
          }
          jwt.sign(payload, 'MON SUPER MOT DE PASSE SECRET', { expiresIn: '7d' }, (error, token) => {
            if (error) {
              return res.status(500).send('Invalid credentials')
            }

            const _user = user.toObject()
            delete _user.password

            return res.send({
              user,
              token
            })
          })
        } else {
          return res.status(403).send('Invalid credentials')
        }
      })
    } catch (error) {
      console.error(error)
      res.status(500).send('Invalid crednetials')
    }
  })

module.exports = router
