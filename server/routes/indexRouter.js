const express = require('express');
const router = express.Router();
const indexController = require('../controllers/indexController')

router.get('/add', indexController.displayList)
router.post('/add', indexController.addItemToList)
router.delete('/delete/:id', indexController.deleteItem)
router.post('/update', indexController.updateItem)
router.post('/bought', indexController.purchased)


module.exports = router;