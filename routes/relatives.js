/*
    Ruta: /api/relatives
*/
const { Router } = require('express');
const { check } = require('express-validator');
const { validateFields } = require('../middlewares/validate-fields');
const { validateJWT } = require('../middlewares/validate-jwt');
const {
    getRelatives,
    getRelativeById,
    createRelative,
    updateRelative,
    deleteRelative
} = require('../controllers/relatives');

const router = Router();

router.get( '/', validateJWT , getRelatives );
router.get( '/:id', validateJWT , getRelativeById );

router.post( '/',
    [
        check('firstName', 'firstName is mandatory').not().isEmpty(),
        check('lastName', 'lastName is mandatory').not().isEmpty(),
        check('email', 'email is mandatory').not().isEmpty(),
        check('phoneNumber', 'phoneNumber is mandatory').not().isEmpty(),
        validateFields,
        validateJWT
    ], 
    createRelative 
);

router.put( '/:id',
    [
        validateJWT,
        validateFields,
    ],
    updateRelative
);

router.delete( '/:id',
    [ validateJWT ],
    deleteRelative
);

module.exports = router;