import { createSlice } from "@reduxjs/toolkit"

// task {
//     id: {
//         title,
//         description,
//         id
//     }
// }
const initialState = {
    tasks: {}
}
const taskSlice = createSlice({
    name: 'tasks',
    initialState,
    reducers: {
        addTask(state, { payload }) {
            state.tasks = {
                ...state.tasks,
                [payload.id]: payload
            }

            
        }
    }
})

export const { addTask } = taskSlice.actions
export const selectTasks = state => state.tasks.tasks

export default taskSlice.reducer