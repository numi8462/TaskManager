import './AddTask.scss';
import { useState, useRef, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { addTask, deleteAllItems } from '../../redux/taskSlice';

const AddTask = () => {
    const dispatch = useDispatch();
    const { auth } = useSelector((state) => ({...state}));
    const { currentUser } = auth;
    const [state, setState] = useState({
        task: '',
    })
    const taskInputRef = useRef(null);

    useEffect(() => {
        taskInputRef.current.focus(); // On page load set the focus to input field.
    }, []);

    const handleChange = (e) => {
        setState({
            ...state,
            [e.target.name]: e.target.value,
        })
    }

    const handleSubmit = (e) => {
        e.preventDefault();
        dispatch(
            addTask(state.task,currentUser.id)
        );
        setState({
            task: '',
        })
    }

    const handleDeleteAllTasks = (createdBy) => {
        dispatch(deleteAllItems(createdBy));
    }

    return ( 
        <div className='addtask'>
            <form action="" onSubmit={handleSubmit}>
                <input 
                    type="text" 
                    name='task'
                    placeholder='새 일정'
                    onChange={handleChange}
                    value={state.task}
                    ref={taskInputRef}
                />
                <button className='add_button'>추가하기</button>
                <div className='deleteAll_button' onClick={() => handleDeleteAllTasks(currentUser.id)}>모두 삭제</div>
            </form>

        </div>
     );
}
 
export default AddTask;