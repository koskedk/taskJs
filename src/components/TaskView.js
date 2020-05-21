import React, { useState } from 'react';
import { observer } from 'mobx-react';

const TaskView = ({ task }) => {
    const [todo, setTodo] = useState(task.todo);
    const [editMode, setEditMode] = useState({
        isEditing: false,
        buttonText: 'Edit'
    });

    const onEdit = () => {
        if (editMode.isEditing) {
            onSave();
            return;
        }
        setEditMode({
            isEditing: true,
            buttonText: 'Save'
        });
    };

    const onEditTodo = (event) => {
        setTodo(event.target.value);
    };

    const onSave = () => {
        task.changeTodo(todo);
        task.update();
        setEditMode({
            isEditing: false,
            buttonText: 'Edit'
        });
    };

    const onCancel = () => {
        setEditMode({
            isEditing: false,
            buttonText: 'Edit'
        });
    };
    return (
        <div>
            <li>
                {!editMode.isEditing && task.todo}
                {editMode.isEditing && <input type="text" value={todo} onChange={onEditTodo}/>}
                <input checked={task.done} onChange={task.markStatus} type="checkbox" disabled={editMode.isEditing}/>
                <button onClick={onEdit}>{editMode.buttonText}</button>
                {editMode.isEditing && <button onClick={onCancel}>Cancel</button>}
                {!editMode.isEditing && <button onClick={task.remove}>Delete</button>}
            </li>
        </div>
    );
};

export default observer(TaskView);
