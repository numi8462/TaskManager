import './TaskManager.scss';
import Sidebar from '../../components/sidebar/Sidebar';
import AddTask from '../../components/taskmanager/AddTask';
import TaskList from '../../components/taskmanager/TaskList';

const TaskManager = () => {
    return ( 
        <>
            <div className="taskmanager">
                <div className="taskmanager__left">
                    <Sidebar />
                </div>
                <div className="taskmanager__right">
                    <h1>TODO</h1>

                    <div className="taskmanager__addtask">
                        <AddTask />
                    </div>
                    <div className="taskmanager__tasklist">
                        <TaskList />
                    </div>
                </div>
            </div>
        </>
     );
}
 
export default TaskManager;