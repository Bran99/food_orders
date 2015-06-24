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
  if (!user.isModified('password')) return next();                       // This only hashes if the password is new or modified
  bcrypt.genSalt(SALT_WORK_FACTOR, function(err, salt){                  // This generates the Salted hash
    if (err) return next(err);                                           // This hashes password with new salt
    bcrypt.hash(user.password, salt, function(err, hash){
      if (err) return next(err)                                          // This overwrites the plantext password with a hash
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


// Signup form
<form action="/signup" method="post">
    <div class="form-group">
        <label>User Name</label>
        <input type="text" class="form-control" name="User Name" placeholder="User Name">
    </div>
    <div class="form-group">
        <label>Password</label>
        <input type="password" class="form-control" name="password">
    </div>

    <button type="submit" class="btn btn-warning btn-lg">Signup</button>
</form>
