const router = require('express').Router();
const verifyToken = require('../middleware/auth');
const { addItem, search, getHistory, suggest } = require('../controllers/searchController');

router.post('/add', verifyToken, addItem);
router.get('/', verifyToken, search);
router.get('/history', verifyToken, getHistory);
router.get('/suggest', verifyToken, suggest);

module.exports = router;
