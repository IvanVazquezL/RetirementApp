const {
    Schema,
    model
} = require('mongoose');

const RelativeSchema = Schema({
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
    residentId: [{
      type: Schema.Types.ObjectId,
      ref: 'Resident',
      required: true,
    }],
  });

RelativeSchema.method('toJSON', function () {
    const {
        __v,
        _id,
        ...object
    } = this.toObject();
    object.uid = _id;
    return object;
});
  
module.exports = model('Relative', RelativeSchema);
