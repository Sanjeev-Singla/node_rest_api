const express = require('express');
const postsController = require('../controllers/posts.controller');

const router = express.Router();

router.post('/create',postsController.create);
router.post('/show',postsController.show);
router.post('/all',postsController.index);
router.post('/update',postsController.update);
router.post('/delete',postsController.destroy);

module.exports = router;