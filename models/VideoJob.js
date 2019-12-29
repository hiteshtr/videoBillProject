const bcrypt = require('bcrypt');
const crypto = require('crypto');
const mongoose = require('mongoose');

const { Schema } = mongoose;

const videoJobSchema = new mongoose.Schema(
  {
    jobNo: { type: Number, unique: true },
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
    specialRequest: String,
    copyIn: String,
    drone: Boolean,
    crane: Boolean,
    extraCamera: Boolean,
    drive: String,
    size: Number,
    cardRec: Number,
    mixing: Boolean,
    highlights: Boolean,
    prewedding: Boolean,
    whatappInvitation: Boolean,
    song: Boolean,
    title: Boolean,
    jobDelivered: {
      penDrive: Boolean,
      mixDvd: Boolean,
      copyMixDvd: Boolean,
      originalDvd: Boolean
    },
    jobStatus: {
      mixStart: Date,
      mixEnd: Date,
      renderedOk: Date,
      mixBy: {
        type: Schema.Types.ObjectId,
        ref: 'Employee'
      },
      mixQuanitity: Number,
      highlightOk: Date,
      highlightBy: {
        type: Schema.Types.ObjectId,
        ref: 'Employee'
      },
      songOk: Date,
      songQuantity: Number,
      songBy: {
        type: Schema.Types.ObjectId,
        ref: 'Employee'
      },
      wedInvOk: Date,
      wedInvBy: {
        type: Schema.Types.ObjectId,
        ref: 'Employee'
      },
      titleOk: Date,
      titleBy: {
        type: Schema.Types.ObjectId,
        ref: 'Employee'
      },
      dvdQuantity: Number,
      dvdBy: {
        type: Schema.Types.ObjectId,
        ref: 'Employee'
      },
      finalStatus: String
    },
    jobComplete: Date,
    totalAmount: Number,
    recieved: Number,
    due: Number,
    tallyEntry: Boolean
  },
  { timestamps: true }
);

/**
 * Password hash middleware.
 */
videoJobSchema.pre('save', function save(next) {
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
videoJobSchema.methods.comparePassword = function comparePassword(candidatePassword, cb) {
  bcrypt.compare(candidatePassword, this.password, (err, isMatch) => {
    cb(err, isMatch);
  });
};

/**
 * Helper method for getting user's gravatar.
 */
videoJobSchema.methods.gravatar = function gravatar(size) {
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

const VideoJob = mongoose.model('VideoJob', videoJobSchema);

module.exports = VideoJob;
