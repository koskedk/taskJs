import React, { useState } from 'react';
import { observer } from 'mobx-react';
import TaskView from './TaskView';
import { ActionButton } from 'office-ui-fabric-react';
import { TextField } from 'office-ui-fabric-react/lib/TextField';

const TaskList = ({ store }) => {
    const [todo, setTodo] = useState('');
    const { tasks } = store;

    const onTextChange = (event) => {
        setTodo(event.target.value);
    };
    const onAdd = () => {
        store.addTask(todo);
        setTodo('');
    };

    return (
        <div>
            <h4>{store.showStatus}</h4>
            <ul>
                {tasks.map(task => (<TaskView key={task.id} task={task}/>))}
            </ul>
            <TextField label="Task " value={todo} onChange={onTextChange} required />
           <ActionButton iconProps={{ iconName: 'Add' }} onClick={onAdd} disabled={!todo}>Add Task</ActionButton>
        </div>
    );
};

export default observer(TaskList);
