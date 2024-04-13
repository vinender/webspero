//authRoute.tsx
const express = require('express');
const router = express.Router();
const authController = require('../controllers/authController');


router.post('/register', authController.register);

router.post('/login', authController.login);

// router.post('/user-verify', authController.userVerify);
// router.get('/me', authController.fetchLoggedInUser);

 
module.exports = router;