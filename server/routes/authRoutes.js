const express = require('express');
const router = express.Router();

const authController = require('../controllers/authController');
const multer = require('multer');
// handle image upload to storage
const storage = multer.diskStorage({
  destination: function(req, file, cb) {
    cb(null, 'client/public/images/');
  },
  filename: function(req, file, cb) {
    const date = Date.now();
    cb(null, date + file.originalname);
  }
});
const upload = multer({ storage: storage });


// handles routes after authentication
router.route('/signin').post(authController.signin);
router.route('/register').post(authController.register);
router.route('/uploadProfilePic/:userId').post(upload.single('image'), authController.uploadProfilePic);

module.exports = router;