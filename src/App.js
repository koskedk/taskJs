import React from 'react';
import './App.css';
import TaskList from './components/TaskList';
import { inject, observer } from 'mobx-react';

const App = inject('store')(
    ({ store }) => {
        return (
            <>
                <TaskList store={store}/>
            </>
        );
    }
);

export default observer(App);
