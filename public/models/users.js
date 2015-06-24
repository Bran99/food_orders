// Required packages
var mongoose          = require('mongoose'),
    Schema            = mongoose.Schema,
    bcrypt            = require('bcrypt'),
    SALT_WORK_FACTOR  = 10;

// Users Schema
var UserSchema = new Schema({
    username: {type : String, requird : true, index : {unique : true}},
    password: {type : String, requird : true}
}, {collection : 'users'});

// Password hashing middleware
UserSchema.pre('save', function(next){
  var user = this;
// This only hashes if the password is new or modified
  if (!user.isModified('password')) return next();
// This generates the Salted hash
  bcrypt.genSalt(SALT_WORK_FACTOR, function(err, salt){
    if (err) return next(err);
// This hashes password with new salt
    bcrypt.hash(user.password, salt, function(err, hash){
      if (err) return next(err)
// This overwrites the plantext password with a hash
        user.password = hash
        next();
    });
  });
});

// Password verification
UserSchema.methods.comparePassword = function(candidatePassword, cb){
  bcrypt.compare(candidatePassword, this.password, function(err, isMatch){
    if (err) return cb(err);
    cb(null, isMatch);
  });
};

module.exports = mongoose.model('Users', UserSchema);
