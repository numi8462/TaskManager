import React, { useState, useEffect } from 'react';
import { useDispatch } from 'react-redux';
import './ListCard.scss';
import { MdEdit, MdDelete, MdOutlineCheckBoxOutlineBlank, MdOutlineCheckBox } from "react-icons/md";
import { FaSave } from "react-icons/fa";
import { checkboxClick, deleteItem, editItem } from '../../redux/taskSlice';

const ListCard = ({ item, isEditing, setEditingItemId }) => {
    const dispatch = useDispatch();
    const [editedTask, setEditedTask] = useState(item.task);
    const inputRef = React.useRef(null);

    useEffect(() => {
        if (isEditing && inputRef.current) {
            inputRef.current.focus();
            inputRef.current.select();
        }
    }, [isEditing]);

    const handleCheckboxClick = (string) => {
        dispatch(checkboxClick(item, string));
    };

    const handleDelete = () => {
        dispatch(deleteItem(item._id));
    };

    const handleEdit = () => {
        dispatch(editItem(item, editedTask));
        setEditingItemId(null);
    };

    return (
        <div className="listcard">
            <ul className='menu'>
                <li className='menu_list'>
                    <div className='actions'>
                        <div className='icon__checkbox' onClick={() => handleCheckboxClick('done')}>
                            {item.status === 'done' ? <MdOutlineCheckBox /> : <MdOutlineCheckBoxOutlineBlank />}
                        </div>
                    </div>
                    {isEditing ? (
                        <div>
                            <input
                                type="text"
                                value={editedTask}
                                onChange={(e) => setEditedTask(e.target.value)}
                                className='edit_form'
                                ref={inputRef}
                            />
                        </div>
                    ) : (
                        item.status === 'todo' ? (
                            <div>
                                <h4>{item.task}</h4>
                            </div>
                        ) : (
                            <div className='task_done'>
                                <h4>{item.task}</h4>
                            </div>
                        )
                    )}
                </li>
                <li className='menu_list'>
                    <div className='actions'>
                        {
                            isEditing ? (
                                <div onClick={handleEdit} className='icon__save'>
                                    <FaSave/>
                                </div>

                            ) : (
                                <div className='icon__edit' onClick={() => setEditingItemId(item._id)}>
                                    <MdEdit />
                                </div>
                            )
                        }
                        <div className='icon__delete' onClick={handleDelete}>
                            <MdDelete />
                        </div>
                    </div>
                </li>
            </ul>
        </div>
    );
};

export default ListCard;
