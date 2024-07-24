import Sidebar from "../../components/sidebar/Sidebar";
import { Link } from "react-router-dom";
import './dashboard.scss';
import '../../styles/components/_button.scss';

const Dashboard = () => {
    return ( <>
        <div className="dashboard">
            <div className="dashboard__left">
                <Sidebar/>
            </div>
            <div className="dashboard__right">
                <div className="dashboard__right__content">
                    <h2>Task Dashboard</h2>
                    <div className="taskcount">
                        <div className="todo box">todo</div>
                        <div className="doing box">doing</div>
                        <div className="done box">done</div>
                    </div>
                    <div className="createButton">
                        <Link to='/taskmanager'>
                            <button className="create-button">Create Task</button>
                        </Link>
                    </div>
                </div>
            </div>
        </div>
    </> );
}
  
 export default Dashboard;