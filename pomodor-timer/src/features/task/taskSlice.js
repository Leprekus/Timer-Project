import { createSlice } from "@reduxjs/toolkit"

// task {
//     id: {
//         title,
//         description,
//         id
//     }
// }

//     task to edit structure
//      {
//         title,
//         description,
//         id
//     }
const initialState = {
    tasks: {},
    taskToEdit: {}

}
const taskSlice = createSlice({
    name: 'tasks',
    initialState,
    reducers: {

        editTask(state, { payload }) {
            state.taskToEdit = payload            
        },

        saveChanges(state, { payload }) {
            state.tasks[payload.id] = payload
    
        },
        addTask(state, { payload }) {
            state.tasks = {
                ...state.tasks,
                [payload.id]: payload
            }
        },
    }
})

export const { addTask, editTask, saveChanges, isEditable } = taskSlice.actions
export const selectTasks = state => state.tasks.tasks
export const selectTaskToEdit = state => state.tasks.taskToEdit



export default taskSlice.reducer