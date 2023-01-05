const router = require('express').Router()
const { dirname } = require('path')
const appDir = dirname(require.main.filename)
const multer = require('multer')
const { sanatizeFilename } = require('../../../tools/strings')
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, appDir + '/../files/')
  },
  filename: (req, file, cb) => {
    const uniqueSuffix = Date.now() + '_' + Math.round(Math.random() * 1E9)
    cb(null, uniqueSuffix + '_' + sanatizeFilename(file.originalname))
  }
})

const upload = multer({ storage })

router.route('/')
  .post(upload.single('file'), (req, res) => {
    console.log(req.file)
    console.log(req.body)
    return res.send('OK')
  })

module.exports = router
