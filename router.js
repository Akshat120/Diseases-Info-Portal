const express = require('express')
const router = express.Router();
const homeController = require('./Controllers/homeController')

router.get('/',homeController.home)
router.get('/majorDiseases',homeController.majorDiseases)
router.get('/addDisease',homeController.addDiseaseForm)
router.get('/diseaseprofile/:diseaseid',homeController.diseaseprofile)

router.post('/addDisease',homeController.addDisease)
module.exports = router;

