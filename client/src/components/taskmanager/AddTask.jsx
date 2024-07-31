import './AddTask.scss';
import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { addTask } from '../../redux/taskSlice';

const AddTask = () => {
    const dispatch = useDispatch();
    const { auth } = useSelector((state) => ({...state}));
    const { currentUser } = auth;
    const [state, setState] = useState({
        task: '',
    })

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

    return ( 
        <div className='addtask'>
            <form action="" onSubmit={handleSubmit}>
                <input 
                    type="text" 
                    name='task'
                    placeholder='새 일정'
                    onChange={handleChange}
                    value={state.task}
                />
                <button className='add_button'>추가하기</button>
            </form>
        </div>
     );
}
 
export default AddTask;