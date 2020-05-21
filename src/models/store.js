import { types, destroy, flow, applySnapshot, getParent } from 'mobx-state-tree';

export const Task = types
    .model({
        id: types.identifier,
        todo: types.string,
        done: types.boolean
    })
    .actions(self => ({
        changeTodo(todo) {
            self.todo = todo;
        },
        markStatus() {
            self.done = !self.done;
            getParent(self, 2).updateTask(self);
        },
        remove() {
            getParent(self, 2).deleteTask(self);
        },
        update() {
            getParent(self, 2).updateTask(self);
        }
    }));

export const TaskStore = types
    .model({
        isLoading: types.optional(types.boolean, true),
        tasks: types.array(Task)
    })
    .actions(self => ({
        afterCreate() {
            self.load();
        },
        load: flow(function* load() {
                const response = yield window.fetch(`http://localhost:3004/tasks`);
                const data = yield response.json();
                applySnapshot(self.tasks, data);
                self.isLoading = false;
            }
        ),
        deleteTask: flow(function* post(task) {
                console.log('deleting ...', task);
                self.isLoading = true;
                const response = yield window.fetch(`http://localhost:3004/tasks/${task.id}`, {
                    method: 'DELETE'
                });
                self.load();
            }
        ),
        addTask: flow(function* post(task) {
                console.log('adding...');
                self.isLoading = true;
                const response = yield window.fetch('http://localhost:3004/tasks', {
                    method: 'POST', // or 'PUT'
                    headers: {
                        'Content-Type': 'application/json'
                    },
                    body: JSON.stringify({
                        'id': `${Math.floor((Math.random() * 100) + 1)}`,
                        'todo': `${task}`,
                        'done': false
                    })
                });
                self.load();
            }
        ),
        updateTask: flow(function* post(task) {
                console.log('adding...');
                self.isLoading = true;
                const response = yield window.fetch(`http://localhost:3004/tasks/${task.id}`, {
                    method: 'PUT', // or 'PUT'
                    headers: {
                        'Content-Type': 'application/json'
                    },
                    body: JSON.stringify(task)
                });
                self.load();
            }
        )
    }))
    .views(self => ({
        get showStatus() {
            const total = self.tasks.length;
            const complete = self.tasks.filter(t => t.done).length;
            return total > 0 ? `${((complete / total) * 100)} % Complete` : 'No tasks';
        }
    }));
;
