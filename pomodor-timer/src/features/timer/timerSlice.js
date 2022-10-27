import { createSlice, createAsyncThunk } from '@reduxjs/toolkit' 
import { selectCount } from '../counter/counterSlice'

const initialState ={
    value: 25,
    update: false
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

        setTime(state) {
            state.value -= 1
        },
        changeUpdate(state) {
            state.update = !state.update
        }
    },
  
})

export const { increaseTime, decreaseTime, setTime, changeUpdate } = timerSlice.actions
export const selectTime = state => state.timer.value
export const selectUpdate = state => state.timer.update

export const startTimer = () => (dispatch, getState) => {
    const intervalId = setInterval(() => {
        const time = selectTime(getState());
        if(time <= 0)  {
            return (
            clearInterval(intervalId),
            dispatch(changeUpdate())
            )
        }
        dispatch(setTime())
    },300)
    
  };

export default timerSlice.reducer