const {
    Schema,
    model
} = require('mongoose');

const DoctorSchema = Schema({
    firstName: {
      type: String,
      required: true,
    },
    lastName: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
    },
    phoneNumber: {
      type: String,
      required: true,
    },
    specialization: {
      type: String,
      required: true,
    },
    residents: [{
      type: Schema.Types.ObjectId,
      ref: 'Resident',
    }],
});

DoctorSchema.method('toJSON', function () {
    const {
        __v,
        ...object
    } = this.toObject();
    return object;
})
  
module.exports = model('Doctor', DoctorSchema);