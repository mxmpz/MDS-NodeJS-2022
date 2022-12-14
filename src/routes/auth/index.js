const router = require('express').Router
const { loginUser } = require('../../controllers/auth.controller')

router.route('/login')
  .post(async (req, res) => {
    const credentials = req.body
    try {
      const { _user, token } = await loginUser(credentials)
      return res.send({ user: _user, token })
    } catch (error) {
      console.error(error)
      res.status(500).send('error')
    }
  })

module.exports = router
