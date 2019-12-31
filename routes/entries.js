const entry_controller = require('../controllers/entry_controller');
const express = require('express');
const router = express.Router();

router.post('/add_entry', entry_controller.add_entry);

router.get('/get_user_entries', entry_controller.get_user_entries);

module.exports = router;

