const express = require('express');
const router = express.Router();
const websiteController = require('./website_controller');
const authMiddleware = require('../../middleware/authMiddleware');

// All routes here are protected by JWT
router.use(authMiddleware);

router.post('/add', websiteController.addWebsite);
router.get('/list', websiteController.getUserWebsites);
router.get('/:id', websiteController.getWebsiteById);
router.put('/:id', websiteController.updateWebsite);
router.patch('/toggle-pause/:id', websiteController.togglePause);
router.delete('/:id', websiteController.deleteWebsite);
router.get('/logs/activity', websiteController.getActivity);



module.exports = router;
