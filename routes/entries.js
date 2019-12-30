const entry_controller = require('../controllers/entry_controller');
const express = require('express');
const router = express.Router();

router.post('/add_entry', entry_controller.add_entry);

module.exports = router;
