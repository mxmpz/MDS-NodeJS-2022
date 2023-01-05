const { uploadFile, downloadFileByID } = require('../../controllers/files.controller')
const router = require('express').Router()

  // Create a user
  .post(async (req, res) => {
    try {
      // Appel de la méthode du contrôleur
      const fileCreated = await uploadFile(req.body)
      return res.send(fileCreated)
    } catch (error) {
      // En cas d'erreur, on renvoit une erreur 500 + detail dans la réponse
      console.error(error)
      return res.status(500).send(error)
    }
  })

router.route('/:id')
  .get(async (req, res) => {
    try {
      // On récupère l'utilisateur dans la base de donnée
      const file = await downloadFileByID(req.params.id)
      return res.send(file)
    } catch (error) {
      console.error(error)
      return res.status(500).send(error)
    }
  })

module.exports = router
