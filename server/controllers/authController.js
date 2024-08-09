const User = require('../../database/model/user.model');
const jwt = require('jsonwebtoken');
const validator = require('email-validator');

// controller for sign in
const signin = async (req, res) => {
	let { email, password } = req.body;
	try {
		// first find matching email from db
		let user = await User.findOne({ email });
		console.log(user, req.body);
		if (!user) {
			//return 400 if no matching email
			return res.status(400).send('email does not exist');
		}

		// compare password with matching email
		user.comparePassword(password, (err, match) => {
			// if password does not match return 400
			if (!match || err) return res.status(400).send('password does not match');
			// save authentication token for 24hrs
			let token = jwt.sign({ _id: user._id }, 'kljclsadflkdsjfklsdjfklsdjf', {
				expiresIn: '24h',
			});

			res.status(200).send({
				token,
				username: user.username,
				email: user.email,
				id: user._id,
				photo: user.photo,
				createdAt: user.createdAt,
				updatedAt: user.updatedAt,
			});
		});
	} catch (error) {
		return res.status(400).send('login failed');
	}
};

// controller form register
const register = async (req, res) => {
	console.log(req.body, 'req');
	const { username, password, email, photo } = req.body;
	try {
		if (!username) return res.status(400).send('username is required');

		if (!email) return res.status(400).send('email is required');

		if (!validator.validate(email)) {
			return res.status(400).send('enter valid email id');
		}
		if (!password || password.length < 6) {
			return res.status(400).send('enter valid password');
		}

		const userExist = await User.findOne({ email });
		if (userExist) {
			return res.status(400).send('email is taken');
		}

		const user = await new User({
			email,
			username,
			password,
			photo,
		});

		await user.save();
		return res.status(200).send(user);
	} catch (error) {
		return res, statusbar(400).send('Error creating user');
	}
};

const uploadProfilePic = async (req, res) => {
	console.log("File:");
	console.log(req.file);
    try {
        if (!req.file) {
            return res.status(400).send('No file uploaded');
        }

        let user = await User.findById(req.params.userId);
		console.log(user);
        if (!user) {
            return res.status(404).send('User not found');
        }

        user.photo = req.file.filename;
        user.save();
		return res.send(user);
    } catch (error) {
        console.log(error);
        res.status(500).send('Error uploading profile picture');
    }
};

module.exports = {
	signin,
	register,
	uploadProfilePic,
};