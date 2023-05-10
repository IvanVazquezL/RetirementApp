/*
    Ruta: /api/residents
*/
const { Router } = require('express');
const { check } = require('express-validator');
const { validateFields } = require('../middlewares/validate-fields');
const { validateJWT } = require('../middlewares/validate-jwt');
const {
    getResidents,
    getResidentById,
    getResidentByKey,
    createResident,
    updateResident,
    deleteResident
} = require('../controllers/residents');

const router = Router();

router.get( '/', validateJWT , getResidents );
router.get( '/:id', validateJWT , getResidentById );
router.get('/key/:key', validateJWT, getResidentByKey);

router.post( '/',
    [
        check('firstName', 'firstName is mandatory').not().isEmpty(),
        check('lastName', 'lastName is mandatory').not().isEmpty(),
        check('dateOfBirth', 'dateOfBirth is mandatory').not().isEmpty(),
        check('gender', 'gender is mandatory').not().isEmpty(),
        check('roomNumber', 'roomNumber is mandatory').not().isEmpty(),
        check('status', 'status is mandatory').not().isEmpty(),
        validateFields,
        validateJWT
    ], 
    createResident 
);

router.put( '/:id',
    [
        validateJWT,
        validateFields,
    ],
    updateResident
);

router.delete( '/:id',
    [ validateJWT ],
    deleteResident
);

module.exports = router;