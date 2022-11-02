const User = require('../../data/models/User')

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
          return res.status(403).send('Invalid credentials')
        }

        if (isMatch) {
          console.log('OK')
        } else {
          console.log('KO')
        }
      })
    } catch (error) {
      console.error(error)
      res.status(500).send('Invalid crednetials')
    }
  })

module.exports = router
