const router = require('express').Router()
const { dirname } = require('path')
const appDir = dirname(require.main.filename)

const { sanatizeFilename } = require('../../../tools/strings')

const multer = require('multer')
const { createFile } = require('../../../controllers/files.controller')

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, appDir + '/../files/')
  },
  filename: (req, file, cb) => {
    const uniquePrefix = Date.now() + '_' + Math.round(Math.random() * 1E9)
    cb(null, uniquePrefix + '_' + sanatizeFilename(file.originalname))
  }
})

const authorizedTypes = [
  'png',
  'jpeg',
  'jpg',
  'gif',
  'webp',
  'webm',
  'pdf'
]

const upload = multer({
  storage,
  fileFilter: (req, file, cb) => {
    const type = file.mimetype.split('/')[1]
    if (authorizedTypes.includes(type)) {
      cb(null, true)
    } else {
      cb(null, false)
      return cb(new Error('File type must be ' + authorizedTypes))
    }
  }
})

router.route('/')
  .post(upload.single('file'), async (req, res) => {
    const userId = '63626fa14a3a562fd618221a'
    const { file } = req
    try {
      const savedFileObject = await createFile(file, userId)
      return res.send(savedFileObject)
    } catch (error) {
      console.error(error)
      return res.status(500).send(error)
    }
  })

module.exports = router
