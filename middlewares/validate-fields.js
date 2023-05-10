const { response } = require('express');
const { validationResult } = require('express-validator')

const validateFields = (req, res = response, next ) => {
    const errors = validationResult( req );

    if ( !errors.isEmpty() ) {
        return res.status(400).json({
            ok: false,
            //  Gets the validation errors as an object. If a field has more than one 
            //  error, only the first one is set in the resulting object.
            errors: errors.mapped()
        });
    }

    //  If there are no errors, it calls the next() function to move on to the 
    //  next middleware function in the request processing chain.
    next();
}

module.exports = {
    validateFields
}