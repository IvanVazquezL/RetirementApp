/*
    Ruta: /api/usuarios
*/
const { Router } = require('express');
const { check } = require('express-validator');
const { validateFields } = require('../middlewares/validate-fields');
const { validateJWT } = require('../middlewares/validate-jwt');
const {
    getUsers,
    createUser,
    updateUser,
    deleteUser,
    getUserById
} = require('../controllers/users');

const router = Router();

router.get( '/', validateJWT , getUsers );
router.get( '/:id', validateJWT, getUserById);

router.post( '/',
    [
        check('password', 'Password is mandatory').not().isEmpty(),
        check('email', 'Email is mandatory').isEmail(),
        validateFields,
    ], 
    createUser 
);

router.put( '/:id',
    [
        validateJWT,
        validateFields,
    ],
    updateUser
);

router.delete( '/:id',
    [ validateJWT ],
    deleteUser
);

module.exports = router;