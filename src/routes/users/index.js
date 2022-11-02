const { getUsers, createUser, getUserByID, updateUserById, deleteUserById } = require('../../controllers/users.controller')

const router = require('express').Router()

router.route('/')
  .get(async (req, res) => {
    const users = await getUsers()
    return res.send(users)
  })

  // Create a user
  .post(async (req, res) => {
    try {
      // Appel de la méthode du contrôleur
      const userCreated = await createUser(req.body)
      return res.send(userCreated)
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
      const user = await getUserByID(req.params.id)
      return res.send(user)
    } catch (error) {
      console.error(error)
      return res.status(500).send(error)
    }
  })

  .patch(async (req, res) => {
    try {
      // On met à jour l'utilisateur via la méthode mongoose findByAndUpdate
      const user = await updateUserById(req.params.id, req.body)
      return res.send(user)
    } catch (error) {
      console.error(error)
      return res.status(500).send(error)
    }
  })

  .delete(async (req, res) => {
    try {
      // On supprime l'utilisateur via la méthode mongoose findByAndDelete
      await deleteUserById(req.params.id)
      return res.send(`User with ID ${req.params.id} as been deleted`)
    } catch (error) {
      console.error(error)
      return res.status(500).send(error)
    }
  })

module.exports = router
