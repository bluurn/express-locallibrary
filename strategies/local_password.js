import { Strategy } from 'passport-local';
import User from '../models/user';

const LocalPasswordStrategy = new Strategy(
  (username, password, cb) => {
    User.findOne({ username }, (err, user) => {
      if (err) { return cb(err); }
      if (!user) { return cb(null, false); }

      return user.comparePassword(password, function(err, isMatch) {
        isMatch ? cb(null, user) : cb(null, false);
      });
    });
  });

const serializeUser = (user, cb) => cb(null, user.id);

const deserializeUser = (id, cb) =>
  User.findById(id, function (err, user) {
    if (err) { return cb(err); }
    return cb(null, user);
  });

export default {
  LocalPasswordStrategy,
  serializeUser,
  deserializeUser
}
