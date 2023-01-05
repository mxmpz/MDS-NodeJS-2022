const router = require('express').Router()
const multer = require('multer')
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, '/files/')
  },
  filename: (req, file, cb) => {
    const uniqueSuffix = Date.now() + '_' + Math.round(Math.random() * 1E9)
    cb(null, file.originalname + '_' + uniqueSuffix)
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
