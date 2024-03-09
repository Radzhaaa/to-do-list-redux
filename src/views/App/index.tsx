import React from "react";
import styles from './index.module.scss'
import { useDispatch, useSelector } from 'react-redux';
import {createTask, updateTask, removeTask, RootState} from "./todoReducer";
import {InputPlus} from "./components/InputPlus";
import {InputTask} from "./components/InputTask";

export const App: React.FC = () => {
    const tasks = useSelector((state: RootState) => state.tasks);
    const dispatch = useDispatch();

    const handleCreateTask = (title: string) => {
        dispatch(createTask(title));
    };

    const handleUpdateTask = (id: string, title: string) => {
        dispatch(updateTask(id, title));
    };

    const handleRemoveTask = (id: string) => {
        dispatch(removeTask(id));
    };



    return (
        <article className={styles.article}>
            <h1 className={styles.articleTitle}>To Do List</h1>
            <section className={styles.articleSection}>
                <InputPlus
                    onAdd={(title) => {
                        if(title) {
                            handleCreateTask(title)
                        }
                    }}
                />
            </section>
            <section className={styles.articleSection}>
                {!tasks.length && (
                    <p className={styles.articleText}>There is no one task</p>
                )}
                {tasks.map((task) => (
                    <InputTask
                        key={task.id}
                        id={task.id}
                        title={task.title}
                        onDone={handleRemoveTask}
                        onEdited={handleUpdateTask}
                        onRemoved={handleRemoveTask}
                    />
                ))}
            </section>
        </article>
    )
}