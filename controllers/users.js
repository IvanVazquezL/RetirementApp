const { response } = require('express');
const bcrypt = require('bcryptjs');
const User = require('../models/user');
const { generateJWT } = require('../helpers/jwt');

const getUsers = async(req, res) => {
    const from = Number(req.query.from) || 0;

    const [ users, total ] = await Promise.all([
        User.find({}, 'email role')
            .skip( from )
            .limit( 5 ),
        User.countDocuments()
    ]);

    res.json({
        ok: true,
        users,
        total
    });
}

const createUser = async(req, res = response) => {
    const { email, password } = req.body;

    try {
        const emailExists = await User.findOne({ email });

        if ( emailExists ) {
            return res.status(400).json({
                ok: false,
                msg: 'Email is already registered'
            });
        }

        const user = new User( req.body );
    
        // Encrypt password
        const salt = bcrypt.genSaltSync();
        user.password = bcrypt.hashSync( password, salt );
    
        // Save user
        await user.save();

        // Generate token
        const token = await generateJWT( user.id );

        res.json({
            ok: true,
            user,
            token
        });
    } catch (error) {
        res.status(500).json({
            ok: false,
            msg: 'Error creating user'
        });
    }
}

const getUserById = async (req, res = response) => {
    const uid = req.params.id;

    try {
        const userDB = await User.findById( uid );

        if ( !userDB ) {
            return res.status(404).json({
                ok: false,
                msg: 'There is no user with that id'
            });
        }

        res.json({
            ok: true,
            user: userDB
        });
    } catch (error) {
        res.status(500).json({
            ok: false,
            msg: 'Error getting user by id'
        })
    }
}

const updateUser = async (req, res = response) => {
    const uid = req.params.id;

    try {
        const userDB = await User.findById( uid );

        if ( !userDB ) {
            return res.status(404).json({
                ok: false,
                msg: 'There is no user with that id'
            });
        }

        // Updates
        const { password, email, ...fields } = req.body;

        if ( userDB.email !== email ) {
            const emailExists = await User.findOne({ email });
            if ( emailExists ) {
                return res.status(400).json({
                    ok: false,
                    msg: 'There is another user with that email'
                });
            }
        }
        
        const userUpdated = await User.findByIdAndUpdate( uid, { password, email, ...fields }, { new: true } );

        res.json({
            ok: true,
            user: userUpdated
        });
    } catch (error) {
        res.status(500).json({
            ok: false,
            msg: 'Error updating user'
        })
    }
}


const deleteUser = async(req, res = response ) => {
    const uid = req.params.id;

    try {
        const userDB = await User.findById( uid );

        if ( !userDB ) {
            return res.status(404).json({
                ok: false,
                msg: 'There is no user with that id'
            });
        }

        await User.findByIdAndDelete( uid );

        res.json({
            ok: true,
            msg: 'Deleted user'
        });
    } catch (error) {
        res.status(500).json({
            ok: false,
            msg: 'Error deleting user'
        });
    }
}

module.exports = {
    getUsers,
    getUserById,
    createUser,
    updateUser,
    deleteUser
}