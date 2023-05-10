const { response } = require('express');
const Resident = require('../models/resident');
const { generateKey } = require('../helpers/generateKey');

const getResidents = async(req, res) => {
    const from = Number(req.query.from) || 0;

    const [ residents, total ] = await Promise.all([
        Resident.find({}, '')
            .skip( from )
            .limit( 5 ),
        Resident.countDocuments()
    ]);

    res.json({
        ok: true,
        residents,
        total
    });
}

const getResidentById = async(req, res = response) => {
    const id = req.params.id;

    try {
        const resident = await Resident.findById(id)
                                    .populate('user','email')
                                    .populate('emergencyContact','email');
    
        res.json({
            ok: true,
            resident
        });
    } catch (error) {
        res.json({
            ok: true,
            msg: 'Error retrieving resident by id'
        });
    }
}

const getResidentByKey = async(req, res = response) => {
    const key = req.params.key;

    try {
        const resident = await Resident.find({key})
                                    .populate('user','email')
                                    .populate('emergencyContact','email');
    
        res.json({
            ok: true,
            resident
        });
    } catch (error) {
        res.json({
            ok: true,
            msg: 'Error retrieving resident by key'
        });
    }
}

const createResident = async(req, res = response) => {
    const uid = req.uid;
    const key = generateKey('R');
    const resident = new Resident({
        user: uid,
        ...req.body,
        key
    });

    try {
        const residentDB = await resident.save();

        res.json({
            ok: true,
            resident: residentDB
        });
    } catch (error) {
        res.status(500).json({
            ok: false,
            msg: 'Error creating resident'
        });
    }
}

const updateResident = async(req, res = response) => {
    const id  = req.params.id;
    const uid = req.uid;

    try {
        const resident = await Resident.findById( id );

        if ( !resident ) {
            return res.status(404).json({
                ok: true,
                msg: 'Resident could not be found by id',
            });
        }

        const changesResident = {
            ...req.body,
            user: uid
        }

        const residentUpdated = await Resident.findByIdAndUpdate( id, changesResident, { new: true } );

        res.json({
            ok: true,
            resident: residentUpdated
        });
    } catch (error) {
        res.status(500).json({
            ok: false,
            msg: 'Error updating Resident'
        })
    }
}

const deleteResident = async (req, res = response) => {
    const id  = req.params.id;

    try {
        const resident = await Resident.findById( id );

        if ( !resident ) {
            return res.status(404).json({
                ok: true,
                msg: 'Resident not found by id',
            });
        }

        await Resident.findByIdAndDelete( id );

        res.json({
            ok: true,
            msg: 'Resident deleted'
        }); 
    } catch (error) {
        res.status(500).json({
            ok: false,
            msg: 'Error deleting Resident'
        })
    }
}

module.exports = {
    getResidents,
    getResidentById,
    getResidentByKey,
    createResident,
    updateResident,
    deleteResident
}
