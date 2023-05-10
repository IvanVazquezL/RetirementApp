/*
    Ruta: /api/nurses
*/
const { Router } = require('express');
const { check } = require('express-validator');
const { validateFields } = require('../middlewares/validate-fields');
const { validateJWT } = require('../middlewares/validate-jwt');
const {
    getNurses,
    getNurseById,
    createNurse,
    updateNurse,
    deleteNurse
} = require('../controllers/nurses');

const router = Router();

router.get( '/', validateJWT , getNurses );
router.get( '/:id', validateJWT , getNurseById );

router.post( '/',
    [
        check('firstName', 'firstName is mandatory').not().isEmpty(),
        check('lastName', 'lastName is mandatory').not().isEmpty(),
        check('email', 'email is mandatory').not().isEmpty(),
        check('phoneNumber', 'phoneNumber is mandatory').not().isEmpty(),
        check('shift', 'shift is mandatory').not().isEmpty(),
        validateFields,
        validateJWT
    ], 
    createNurse 
);

router.put( '/:id',
    [
        validateJWT,
        validateFields,
    ],
    updateNurse
);

router.delete( '/:id',
    [ validateJWT ],
    deleteNurse
);

module.exports = router;
