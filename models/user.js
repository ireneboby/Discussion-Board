const mongoose = require('mongoose');
const bcrypt = require('bcrypt');

const Schema = mongoose.Schema;

const UserSchema = new Schema({
  username: { type: String, required: true },
  password: { type: String, required: true }
});

UserSchema.pre('save', function(next) {
    let user = this;
  
    bcrypt.hash(user.password, 10, function (err, hash){
      if (err) return next(err);
  
      user.password = hash;
      next();
    })
});

UserSchema.statics.authenticate = function(username, password, next) {
  User.findOne({ username: username }).exec()
  .then((user) => {
    bcrypt.compare(password, user.password, function (err, result) {
      if (result === true) {
        return next(null, user);
      } else {
        return next();
      }
    })
  })
  .catch((err, user) => {
    if (err) {
      return next(err)
    } else if (!user) {
      var err = new Error('User not found.');
      err.status = 401;
      return next(err);
    }
  });
}

const User = mongoose.model('User', UserSchema);
module.exports = User;