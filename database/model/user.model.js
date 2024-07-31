const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');

const userSchema = mongoose.Schema(
	{
		username: { type: String },
		email: { type: String },
		password: { type: String },
		photoURL: { type: String }
	},
	{ timestamp: true }
);

// hashes password before saving to database
userSchema.pre('save', function (next) {
	let user = this;
	if (user.isModified('password')) {
		return bcrypt.hash(user.password, 12, function (err, hash) {
			if (err) {
				return next(err);
			}
			user.password = hash;
			return next();
		});
	} else {
		return next();
	}
});

// compares hashed password
userSchema.methods.comparePassword = function (password, next) {
	bcrypt.compare(password, this.password, function (err, match) {
		if (err) {
			return next(err, false);
		}

		return next(null, match);
	});
};

const User = mongoose.model('User', userSchema);
module.exports = User;