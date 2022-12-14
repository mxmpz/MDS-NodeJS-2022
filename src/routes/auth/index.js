const router = require('express').Router
const { loginUser } = require('../../controllers/auth.controller')

router.route('/login')
  .post(async (req, res) => {
    const credentials = req.body
    try {
      loginUser(credentials, (result) => {
        return res.send(result)
      })
    } catch (error) {
      console.error(error)
      res.status(500).send('error')
    }
  })

module.exports = router
