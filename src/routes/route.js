const express = require('express')
const router = express.Router()

const { cityCreation, getAllCity } = require('../Controller/cityController')
const { creatUser, fetchUserData, updateUser } = require('../Controller/userController')
const callAPI = require('../Controller/thirdPartyAPI')


router.post('/createCity', cityCreation)
router.get('/getCity', getAllCity)

router.get('/callAPI', callAPI)

router.post('/createUser', creatUser)
router.get('/getUserData', fetchUserData)
router.put('/updateUserData', updateUser)

router.all('*', (req, res) => res.status(400).send('Bad Request!'))

module.exports = router