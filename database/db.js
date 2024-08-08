const mongoose = require('mongoose');

const mongoURL = 'mongodb+srv://yhk8462:U5coERllR13TTZWU@taskcluster.r61uthg.mongodb.net/task-manager';
const options = {
	useNewUrlParser: true,
	useUnifiedTopology: true,
};

mongoose
	.connect(mongoURL, options)
	.then(() => {
		console.log('Connected to MongoDB');
		// Start your application or perform additional operations
	})
	.catch((error) => {
		console.error('Error connecting to MongoDB:', error);
	});