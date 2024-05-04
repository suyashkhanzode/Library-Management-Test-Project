const express = require('express');

const bookController = require('../controllers/book')

const router = express.Router();

router.post('/add-book',bookController.addBook)

router.get('/get-books',bookController.getBooks)

router.put('/update-return-status/:id',bookController.returnBook)

module.exports = router;