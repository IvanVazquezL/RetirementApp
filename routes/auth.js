/*
    Path: '/api/login'
*/
const { Router } = require('express');
const { login, renewToken } = require('../controllers/auth');
const { check } = require('express-validator');
const { validateFields } = require('../middlewares/validate-fields');
const { validateJWT } = require('../middlewares/validate-jwt');

const router = Router();

router.post( '/',
    [
        check('email', 'Email is mandatory').isEmail(),
        check('password', 'Password is mandatory').not().isEmpty(),
        validateFields
    ],
    login
);

router.get( '/renew',
    validateJWT,
    renewToken
)

module.exports = router;