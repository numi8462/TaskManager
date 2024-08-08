const Task = require('../../database/model/task.model');

const addTask = async (req, res) => {
	const { task, id } = req.body;

	try {
		if (!task) return res.status(400).send('please enter the task');
		// if (task.length < 10) res.status(400).send('add minimum 10 char');
		const taskDetail = await new Task({
			task,
			createdBy: id,
		});
		await taskDetail.save();
		return res.status(200).send(taskDetail);
	} catch (error) {
		return res.status(400).send('task addition failed');
	}
};

const getAllTasks = async (req, res) => {
	const { id } = req.query;
	try {
		let tasklist = await Task.find({ createdBy: id });
		return res.status(200).send(tasklist);
	} catch (error) {
		return res.status(400).send(error);
	}
};

const editTask = async (req, res) => {
	const { id, string } = req.body;
	try {
		console.log("edit!");
		let task = await Task.findById({_id:id})
		task.task = string;
		task.save();
		console.log(task);
		return res.send(task);
	} catch (err) {}
};

const statusChange = async (req, res) => {
	const { id, string } = req.body;

	try {
		let task = await Task.findById({ _id: id });
		if(string == 'done'){
			if(task.status === 'todo'){
				task.status = 'done';
				task.save();
				return res.send(task);
			} else {
				task.status = 'todo';
				task.save();
				return res.send(task);
			}
		}
		// if (string === 'change') {
		// 	if (task.status === 'backlog') {
		// 		task.status = 'todo';
		// 		task.save();
		// 		return res.send(task);
		// 	} else if (task.status === 'todo') {
		// 		task.status = 'doing';
		// 		task.save();
		// 		return res.send(task);
		// 	} else if (task.status === 'doing') {
		// 		task.status = 'done';
		// 		task.save();
		// 		return res.send(task);
		// 	}
		// } else {
		// 	if (task.status === 'done') {
		// 		task.status = 'doing';
		// 		task.save();
		// 		return res.send(task);
		// 	} else if (task.status === 'doing') {
		// 		task.status = 'todo';
		// 		task.save();
		// 		return res.send(task);
		// 	} else if (task.status === 'todo') {
		// 		task.status = 'backlog';
		// 		task.save();
		// 		return res.send(task);
		// 	}
		// }
	} catch (error) {}
};

const deleteTask = async (req, res) => {
	const { id } = req.params;
	try {
		let response = await Task.findByIdAndDelete(id);
		return res.status(200).send(response);
	} catch (error) {
		return res.status(400).send('deleteFailed');
	}
};

const deleteAllTask = async (req, res) => {
	const { createdBy } = req.params;
	try {
		let response = await Task.deleteMany({ createdBy });
		return res.status(200).send(response);
	} catch (error) {
		return res.status(400).send('deleteAllFailed');
	}
};


module.exports = {
	addTask,
	getAllTasks,
	editTask,
	statusChange,
	deleteTask,
	deleteAllTask,
};