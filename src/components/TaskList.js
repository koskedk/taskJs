import React, { useState } from 'react';
import { observer } from 'mobx-react';
import TaskView from './TaskView';

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
            {store.isLoading && <h5>loading...</h5>}
            <h4>{store.showStatus}</h4>
            <ul>
                {tasks.map(task => (<TaskView key={task.id} task={task}/>))}
            </ul>
            <label>Task <input type="text" value={todo} onChange={onTextChange}/></label>
            <button onClick={onAdd} disabled={!todo}>Add</button>
        </div>
    );
};

export default observer(TaskList);
