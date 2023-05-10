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
        name: {
            type: String,
            required: true,
        },
        relationship: {
            type: String,
            required: true
        },
        phoneNumber: {
            type: String,
            required: true
        },
        email: {
            type: String,
            required: true
        }
    },
    medicalHistory: {
        type: String,
        required: true
    },
    allergies: {
        type: [String],
        required: true
    },
    medications: {
        type: [String],
        required: true
    },
    roomNumber: {
        type: String,
        required: true,
    },
    status: {
        type: String,
        required: true,
    },
    id: {
        type: String,
        required: true
    }
});

ResidentSchema.method('toJSON', function () {
    const {
        __v,
        ...object
    } = this.toObject();
    return object;
})


module.exports = model('Resident', ResidentSchema);