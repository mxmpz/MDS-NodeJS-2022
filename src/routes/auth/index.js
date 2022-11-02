const User = require('../../data/models/User')

const router = require('express').Router()

router.route('/login')
  .post(async (req, res) => {
    const credentials = req.body

    if (!credentials.email || !credentials.password) {
      return res.status(403).send('Invalid crednetials')
    }

    try {
      const user = await User.findOne({ email: credentials.email })

      if (!user) {
        return res.status(403).send('Invalid crednetials')
      }
      // if (!user) return res.status(403).send('Invalid crednetials')
    } catch (error) {
      console.error(error)
      res.status(500).send('Invalid crednetials')
    }
  })
