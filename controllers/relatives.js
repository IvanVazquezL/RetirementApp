const { response } = require('express');
const Relative = require('../models/relative');

const getRelatives = async(req, res) => {
    const from = Number(req.query.from) || 0;

    const [ relatives, total ] = await Promise.all([
        Relative.find({}, '')
            .skip( from )
            .limit( 5 ),
        Relative.countDocuments()
    ]);

    res.json({
        ok: true,
        relatives,
        total
    });
}

const getRelativeById = async(req, res = response) => {
    const id = req.params.id;

    try {
        const relative = await Relative.findById(id);
    
        res.json({
            ok: true,
            relative
        });
    } catch (error) {
        res.json({
            ok: true,
            msg: 'Error retrieving relative by id'
        });
    }
}

const createRelative = async(req, res = response) => {
    const uid = req.uid;
    const relative = new Relative({
        user: uid,
        ...req.body,
    });

    try {
        const relativeDB = await relative.save();

        res.json({
            ok: true,
            relative: relativeDB
        });
    } catch (error) {
        res.status(500).json({
            ok: false,
            msg: 'Error creating relative'
        });
    }
}

const updateRelative = async(req, res = response) => {
    const id  = req.params.id;
    const uid = req.uid;

    try {
        const relative = await Relative.findById( id );

        if ( !relative ) {
            return res.status(404).json({
                ok: true,
                msg: 'Relative could not be found by id',
            });
        }

        const changesRelative = {
            ...req.body,
            user: uid
        }

        const relativeUpdated = await Relative.findByIdAndUpdate( id, changesRelative, { new: true } );

        res.json({
            ok: true,
            relative: relativeUpdated
        });
    } catch (error) {
        res.status(500).json({
            ok: false,
            msg: 'Error updating Relative'
        })
    }
}

const deleteRelative = async (req, res = response) => {
    const id  = req.params.id;

    try {
        const relative = await Relative.findById( id );

        if ( !relative ) {
            return res.status(404).json({
                ok: true,
                msg: 'Resident not found by id',
            });
        }

        await Relative.findByIdAndDelete( id );

        res.json({
            ok: true,
            msg: 'Relative deleted'
        }); 
    } catch (error) {
        res.status(500).json({
            ok: false,
            msg: 'Error deleting Relative'
        })
    }
}

module.exports = {
    getRelatives,
    getRelativeById,
    createRelative,
    updateRelative,
    deleteRelative
}
