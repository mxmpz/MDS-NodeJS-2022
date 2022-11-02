const User = require('../../data/models/User')

const router = require('express').Router()


router.route('/')
.get(async (req, res)=>{
    const users = await User.find().select('-password')
    return res.send(users)
})

router.route('/:id')
.get(async(req, res)=>{
    // On récupère  les paramètres
    const params = req.params
    if(!params.id){
        return res.status(400).send('Missing ID')
    }

    try {
        //On récupère l'utilisateur dans la base de donnée
        const user = await User.findById(params.id).select('-password')
        const userObject = user.toObject()
        return res.send(userObject)  
    } catch (error) {
        console.error(error)
        return res.statuts(500).send(error)
    }
    
})
  

//Create a user
.post(async (req, res) => {

    //Récupération des parametres de la requête
    const user = req.body
    //Vérification de la présence de l'email et du password
    if (!user.email || !user.password){
        //Si il manque une donnée, on renvoit une erreur 400 (Bad Request)
        return res.status(400).send('Missing data')
    }

    try {

        //Si les paramètres sont OK, on continue
        const _user = new User({
            firstName: user.firstName,
            lastName: user.lastName,
            phone: user.phone,
            email: user.email,
            password: user.password
        })
        //On enregistre l'utilisateur et on récupère la donnée crée dans MongoDB
        const savedUser = await _user.save()

        //On transforme le résultat en objet
        let savedUserObject=savedUser.toObject()
        //On retire le password de l'objet renvoyé
        delete savedUserObject.password

        //On renvoit l'utilisateur dans la réponse de l'API
        return res.send(savedUser)
        
    } catch (error) {
        //En cas d'erreur, on renvoit une erreur 500 + detail dans la réponse
        console.error(error)
        return res.statuts(500).send(error)
    }

    // user.save()
    // .then((result) => console.log(result))
    // .catch((error) => console.error(error))

})

// .deleate
// .update
module.exports = router