import { Schema, model } from 'mongoose';
import { hash, genSalt, compare } from 'bcrypt';

const SALT_WORK_FACTOR = 10;

const UserSchema = new Schema({
  username: { type: Schema.Types.String, required: true, index: { unique: true } },
  password: { type: Schema.Types.String, required: true }
});

UserSchema.pre('save', function(next) {
  var user = this;

  if (!user.isModified('password')) return next();

  genSalt(SALT_WORK_FACTOR, (err, salt) => {
    if (err) { return next(err); }

    hash(user.password, salt, function(err, hash) {
      if (err) { return next(err); }
      user.password = hash;
      return next();
    });
  });
});

UserSchema.methods.comparePassword = function(candidatePassword, cb) {
  compare(candidatePassword, this.password, function(err, isMatch) {
    if (err) return cb(err);
    cb(null, isMatch);
  });
};


export default model('User', UserSchema);
