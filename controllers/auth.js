const { response } = require('express');
const bcrypt = require('bcryptjs');

const User = require('../models/user');
const { generateJWT } = require('../helpers/jwt');

const login = async( req, res = response ) => {
    const { email, password } = req.body;

    try {
        const userDB = await User.findOne({ email });

        if ( !userDB ) {
            return res.status(404).json({
                ok: false,
                msg: 'Email not found'
            });
        }

        const validPassword = bcrypt.compareSync( password, userDB.password );
        if ( !validPassword ) {
            return res.status(400).json({
                ok: false,
                msg: 'Password is not valid'
            });
        }

        const token = await generateJWT( userDB.id );

        res.json({
            ok: true,
            token
        });

    } catch (error) {
        res.status(500).json({
            ok: false,
            msg: 'Login failed'
        });
    }
}

const renewToken = async(req, res = response) => {
    const uid = req.uid;
    const token = await generateJWT( uid );
    const user = await User.findById( uid );

    res.json({
        ok: true,
        token,
        user
    });
}

module.exports = {
    login,
    renewToken
}