const router = require('express').Router()
const { dirname } = require('path')
const appDir = dirname(require.main.filename)

const filesDir = appDir + '/../files/'

router.route('/')
  .get((req, res) => {
    const { body } = req

    if (!body.fileName) {
      return res.status(404).send('File not found')
    }

    return res.download(filesDir + body.fileName, (error) => {
      console.error(error)
      return res.status(500).send('error')
    })
  })

module.exports = router
