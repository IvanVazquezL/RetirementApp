const { response } = require('express');
const Doctor = require('../models/doctor');

const getDoctors = async(req, res) => {
    const from = Number(req.query.from) || 0;

    const [ doctors, total ] = await Promise.all([
        Doctor.find({}, '')
            .skip( from )
            .limit( 5 ),
        Doctor.countDocuments()
    ]);

    res.json({
        ok: true,
        doctors,
        total
    });
}

const getDoctorById = async(req, res = response) => {
    const id = req.params.id;

    try {
        const doctor = await Doctor.findById(id);
    
        res.json({
            ok: true,
            doctor
        });
    } catch (error) {
        res.json({
            ok: true,
            msg: 'Error retrieving doctor by id'
        });
    }
}

const createDoctor = async(req, res = response) => {
    const uid = req.uid;
    const doctor = new Doctor({
        user: uid,
        ...req.body,
    });

    try {
        const doctorDB = await doctor.save();

        res.json({
            ok: true,
            doctor: doctorDB
        });
    } catch (error) {
        res.status(500).json({
            ok: false,
            msg: 'Error creating doctor'
        });
    }
}

const updateDoctor = async(req, res = response) => {
    const id  = req.params.id;
    const uid = req.uid;

    try {
        const doctor = await Doctor.findById( id );

        if ( !doctor ) {
            return res.status(404).json({
                ok: true,
                msg: 'Doctor could not be found by id',
            });
        }

        const changesDoctor = {
            ...req.body,
            user: uid
        }

        const doctorUpdated = await Doctor.findByIdAndUpdate( id, changesDoctor, { new: true } );

        res.json({
            ok: true,
            doctor: doctorUpdated
        });
    } catch (error) {
        res.status(500).json({
            ok: false,
            msg: 'Error updating Doctor'
        })
    }
}

const deleteDoctor = async (req, res = response) => {
    const id  = req.params.id;

    try {
        const doctor = await Doctor.findById( id );

        if ( !doctor ) {
            return res.status(404).json({
                ok: true,
                msg: 'Doctor not found by id',
            });
        }

        await Doctor.findByIdAndDelete( id );

        res.json({
            ok: true,
            msg: 'Doctor deleted'
        }); 
    } catch (error) {
        res.status(500).json({
            ok: false,
            msg: 'Error deleting Doctor'
        })
    }
}

module.exports = {
    getDoctors,
    getDoctorById,
    createDoctor,
    updateDoctor,
    deleteDoctor
}
