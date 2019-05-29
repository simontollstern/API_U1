const express = require('express');
const router = express.Router();

const students = require('./students.js');

router.get('/students', students.get);
router.post('/students', students.post);
router.get('/students/:id', students.getById);
router.put('/students/:id', students.put);
router.delete('/students/:id', students.deleteById);

module.exports = router;
