/*
    Ruta: /api/doctors
*/
const { Router } = require('express');
const { check } = require('express-validator');
const { validateFields } = require('../middlewares/validate-fields');
const { validateJWT } = require('../middlewares/validate-jwt');
const {
    getDoctors,
    getDoctorById,
    createDoctor,
    updateDoctor,
    deleteDoctor
} = require('../controllers/doctors');

const router = Router();

router.get( '/', validateJWT , getDoctors );
router.get( '/:id', validateJWT , getDoctorById );

router.post( '/',
    [
        check('firstName', 'firstName is mandatory').not().isEmpty(),
        check('lastName', 'lastName is mandatory').not().isEmpty(),
        check('email', 'email is mandatory').not().isEmpty(),
        check('phoneNumber', 'phoneNumber is mandatory').not().isEmpty(),
        check('specialization', 'specialization is mandatory').not().isEmpty(),
        validateFields,
        validateJWT
    ], 
    createDoctor 
);

router.put( '/:id',
    [
        validateJWT,
        validateFields,
    ],
    updateDoctor
);

router.delete( '/:id',
    [ validateJWT ],
    deleteDoctor
);

module.exports = router;
