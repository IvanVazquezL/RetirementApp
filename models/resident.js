const {
    Schema,
    model
} = require('mongoose');

const ResidentSchema = Schema({
    firstName: {
        type: String,
        required: true
    },
    lastName: {
        type: String,
        required: true
    },
    dateOfBirth: {
        type: Date,
        required: true
    },
    gender: {
        type: String,
        enum: ['male', 'female', 'other'],
        required: true
    },
    emergencyContact: {
        type: Schema.Types.ObjectId,
        ref: 'Relative',
    },
    medicalHistory: {
        type: String
    },
    allergies: {
        type: [String]
    },
    medications: {
        type: [String]
    },
    roomNumber: {
        type: String,
        required: true,
    },
    status: {
        type: String,
        required: true,
    },
    key: {
        type: String,
        required: true,
        unique: true
    },
    user: {
        type: Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },
});

ResidentSchema.method('toJSON', function () {
    const {
        __v,
        _id,
        ...object
    } = this.toObject();
    object.uid = _id;
    return object;
})


module.exports = model('Resident', ResidentSchema);