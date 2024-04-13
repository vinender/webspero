//authRoute.tsx
const express = require('express');
const router = express.Router();
const userController = require('../controllers/userController');



router.put('/profile', userController.updateUserProfile);


// router.post('/user-verify', authController.userVerify);
// router.get('/me', authController.fetchLoggedInUser);

 
module.exports = router;