const { Router } = require('express');
const authController = require('../controllers/authController');

const router = Router();

router.post('/signup', authController.signup_post);
router.post('/login',  authController.login_post);
router.post('/package',  authController.package_post);
router.post('/price',  authController.price_post);


router.get('/logout',  authController.logout_get);

router.get('/testget',  authController.test_get);
router.post('/testpost',  authController.test_post);

module.exports = router;