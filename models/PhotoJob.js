const bcrypt = require('bcrypt');
const crypto = require('crypto');
const mongoose = require('mongoose');

const { Schema } = mongoose;

const photoSchema = new mongoose.Schema(
  {
    jobNo: {
      type: Number,
      unique: true
    },
    recievedDate: Date,
    deliveryDate: Date,
    studio: {
      type: Schema.Types.ObjectId,
      ref: 'Studio'
    },
    partyName: String,
    events: String,
    jobCategory: {
      type: String,
      enum: ['platinum', 'gold', 'silver']
    },
    copyIn: String,
    drive: String,
    photoQuantity: Number,
    size: String,
    sheet: {
      toCreate: Number,
      created: Number
    },
    albumReady: Date,
    albumPrint: Boolean,
    sheetQuality: String,
    cover: String,
    print: String,
    specialRequest: String,
    employeeQuery: String,
    job: {
      status: String,
      deliveredDate: String
    },
    totalAmount: Number,
    recieved: Number,
    due: Number
  },
  { timestamps: true }
);

/**
 * Password hash middleware.
 */
photoSchema.pre('save', function save(next) {
  const user = this;
  if (!user.isModified('password')) {
    return next();
  }
  bcrypt.genSalt(10, (err, salt) => {
    if (err) {
      return next(err);
    }
    bcrypt.hash(user.password, salt, (err, hash) => {
      if (err) {
        return next(err);
      }
      user.password = hash;
      next();
    });
  });
});

/**
 * Helper method for validating user's password.
 */
photoSchema.methods.comparePassword = function comparePassword(
  candidatePassword,
  cb
) {
  bcrypt.compare(candidatePassword, this.password, (err, isMatch) => {
    cb(err, isMatch);
  });
};

/**
 * Helper method for getting user's gravatar.
 */
photoSchema.methods.gravatar = function gravatar(size) {
  if (!size) {
    size = 200;
  }
  if (!this.email) {
    return `https://gravatar.com/avatar/?s=${size}&d=retro`;
  }
  const md5 = crypto
    .createHash('md5')
    .update(this.email)
    .digest('hex');
  return `https://gravatar.com/avatar/${md5}?s=${size}&d=retro`;
};

const Photo = mongoose.model('Photo', photoSchema);

module.exports = Photo;
