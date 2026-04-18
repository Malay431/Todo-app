const {Router} = require('express')
const router = Router()
const {signupController, loginController} = require('../controllers/AuthController')

router.post('/signup', signupController)
router.post('/login', loginController)


module.exports = router