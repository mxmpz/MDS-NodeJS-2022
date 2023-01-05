const router = require('express').Router()
const { dirname } = require('path')
const withAuth = require('../../../middlewares/auth')
const appDir = dirname(require.main.filename)
const File = require('../../../data/models/File')
const filesDir = appDir + '/../files/'

router.route('/')
  .get(withAuth, (req, res) => {
    const { body } = req

    if (!body.fileName) {
      return res.status(404).send('File not found')
    }

    return res.download(filesDir + body.fileName, (error) => {
      console.error(error)
      return res.status(500).send('error')
    })
  })

router.route('/:id')
  .get(withAuth, async (req, res) => {
    const { id } = req.params
    try {
      const file = await File.findById(id)
      if (file) {
        const fileObject = file.toObject()
        if (fileObject.user.equals(req.userId)) {
          return res.send(fileObject)
        } else {
          return res.status(402).send('You are not authorized to access this file')
        }
      } else {
        return res.status(404).send('File not found')
      }
    } catch (error) {
      console.error(error)
      return res.status(500).send(error)
    }
  })

module.exports = router
