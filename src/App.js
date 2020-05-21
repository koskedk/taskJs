import React from 'react';
import './App.css';
import TaskList from './components/TaskList';
import { inject, observer } from 'mobx-react';
import AppStatus from './components/AppStatus';
import Header from './components/Header';
import Footer from './components/Footer';

const App = inject('store')(
    ({ store }) => {
        return (
            <>
                <Header/>
                <AppStatus store={store}/>
                <TaskList store={store}/>
                <Footer/>
            </>
        );
    }
);

export default observer(App);
