const {
    Schema,
    model
} = require('mongoose');

const NurseSchema = Schema({
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
    shift: {
      type: String,
      required: true,
    },
    residents: [{
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Resident',
    }],
});

NurseSchema.method('toJSON', function () {
    const {
        __v,
        ...object
    } = this.toObject();
    return object;
})

  
module.exports = model('Nurse', NurseSchema);