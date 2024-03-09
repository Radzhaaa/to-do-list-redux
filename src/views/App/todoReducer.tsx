import {generateId} from './helpers.ts';
interface Task {
    id: string;
    title: string;
    createAt: number;
}

interface ToDoState {
    tasks: Task[];
}

export interface createTask {
    type: 'CREATE_TASK'
    title: string;
}

export interface updateTask {
    type: 'UPDATE_TASK';
    id: string;
    title: string;
}

export interface removeTask {
    type: 'REMOVE_TASK';
    id: string;
}

type ToDoAction = createTask | updateTask | removeTask;

const initialiState: ToDoState = {
    tasks: []
};

const todoReducer = (state: ToDoState = initialiState, action: ToDoAction): ToDoState => {
    switch(action.type) {
        case "CREATE_TASK":
            return {
                tasks: [
                    {
                        id: generateId(),
                        title: action.title,
                        createAt: Date.now()
                    },
                    ...state.tasks
                ]
            };
        case "UPDATE_TASK":
            return {
                tasks: state.tasks.map((task) =>
                    task.id === action.id ? { ...task,title: action.title } : task
                )
            };
        case "REMOVE_TASK":
            return {
                tasks: state.tasks.filter((task) =>
                    task.id !== action.id
                )
            };
        default:
            return state;
    }
}

export type RootState = ReturnType<typeof todoReducer>;