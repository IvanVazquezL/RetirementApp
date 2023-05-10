const { response } = require('express');
const Nurse = require('../models/nurse');

const getNurses = async(req, res) => {
    const from = Number(req.query.from) || 0;

    const [ nurses, total ] = await Promise.all([
        Nurse.find({}, '')
            .skip( from )
            .limit( 5 ),
        Nurse.countDocuments()
    ]);

    res.json({
        ok: true,
        nurses,
        total
    });
}

const getNurseById = async(req, res = response) => {
    const id = req.params.id;

    try {
        const nurse = await Nurse.findById(id);
    
        res.json({
            ok: true,
            nurse
        });
    } catch (error) {
        res.json({
            ok: true,
            msg: 'Error retrieving nurse by id'
        });
    }
}

const createNurse = async(req, res = response) => {
    const uid = req.uid;
    const nurse = new Nurse({
        user: uid,
        ...req.body,
    });

    try {
        const nurseDB = await nurse.save();

        res.json({
            ok: true,
            nurse: nurseDB
        });
    } catch (error) {
        res.status(500).json({
            ok: false,
            msg: 'Error creating nurse'
        });
    }
}

const updateNurse = async(req, res = response) => {
    const id  = req.params.id;
    const uid = req.uid;

    try {
        const nurse = await Nurse.findById( id );

        if ( !nurse ) {
            return res.status(404).json({
                ok: true,
                msg: 'Nurse could not be found by id',
            });
        }

        const changesNurse = {
            ...req.body,
            user: uid
        }

        const nurseUpdated = await Nurse.findByIdAndUpdate( id, changesNurse, { new: true } );

        res.json({
            ok: true,
            nurse: nurseUpdated
        });
    } catch (error) {
        res.status(500).json({
            ok: false,
            msg: 'Error updating Nurse'
        })
    }
}

const deleteNurse = async (req, res = response) => {
    const id  = req.params.id;

    try {
        const nurse = await Nurse.findById( id );

        if ( !nurse ) {
            return res.status(404).json({
                ok: true,
                msg: 'Nurse not found by id',
            });
        }

        await Nurse.findByIdAndDelete( id );

        res.json({
            ok: true,
            msg: 'Nurse deleted'
        }); 
    } catch (error) {
        res.status(500).json({
            ok: false,
            msg: 'Error deleting Nurse'
        })
    }
}

module.exports = {
    getNurses,
    getNurseById,
    createNurse,
    updateNurse,
    deleteNurse
}
