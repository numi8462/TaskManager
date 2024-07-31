import React from 'react';
import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getAllTasks } from '../../redux/taskSlice';
import './TaskList.scss'
import ListCard from './ListCard';

const TaskList = () => {
    const auth= useSelector((state) => state.auth);
    const {currentUser} = auth;
    const tasks = useSelector((state) => state.task);
    const { AllTasks } = tasks;
    const [editingItemId, setEditingItemId] = useState(null);

    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(getAllTasks(currentUser.token,currentUser.id));
    }, [dispatch, currentUser.token, currentUser._id]);
    
    return ( 
        <div className='taskList'>
            {Object.values(AllTasks).map((item) => {
                return <ListCard key={item._id} item={item} isEditing={editingItemId === item._id} 
                setEditingItemId={setEditingItemId} />;
            })}
        </div>
     );
}
 
export default TaskList;