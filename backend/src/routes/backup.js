const { Router } = require('express');
const router = Router();
const verifyToken = require('../middlewares/verifyToken');

const { getBackups, backupDB, restoreDB } = require('../controllers/backup.controller');

router.get('/api/getBackups', verifyToken, getBackups);
router.get('/api/backup', verifyToken, backupDB);
router.post('/api/restore', verifyToken, restoreDB);

module.exports = router;
