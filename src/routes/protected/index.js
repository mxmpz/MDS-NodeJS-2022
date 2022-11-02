const router = require('express').Router()

router.route('/')
  .get((req, res) => {
    return res.send('COUCOU')
  })

module.exports = router
