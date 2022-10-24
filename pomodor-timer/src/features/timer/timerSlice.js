import { createSlice } from '@reduxjs/toolkit' 

const initialState ={
    value: 25,
    isActive: false
}
const timerSlice = createSlice({
    name: 'timer',
    initialState,
    // The `reducers` field lets us define reducers and generate associated actions
    reducers: {
        increaseTime(state) {
            state.value += 25
            
        },
        decreaseTime(state){
            const check = state.value - 25 >= 0 ? state.value -= 25: 0
            state.value = check
        },
        startTimer(state){}
    },
  
})

export const { increaseTime, decreaseTime, startTimer } = timerSlice.actions
export const selectTime = state => state.timer.value

export default timerSlice.reducer