import { createSlice, createAsyncThunk } from '@reduxjs/toolkit' 
import { selectCount } from '../counter/counterSlice'

const initialState = {
    minutes: '25',
    seconds: '00',
    time: {
        pomodoro: {
            minutes: '25',
            seconds: '00'
        },
        shortBreak: {
            minutes: '5',
            seconds: '00'
        },
        longBreak: {
            minutes: '15',
            seconds: '00'
        }
    },
    update: false,
    popupTrigger: false
}

const timerSlice = createSlice({
    name: 'timer',
    initialState,
    // The `reducers` field lets us define reducers and generate associated actions
    reducers: {
        increaseTime(state, { payload }) {
            const { section, timeUnit } = payload 

            let minutes = parseInt(state.time[section][timeUnit])
            minutes += 25
            console.log(minutes)
            state.time[section][timeUnit] = minutes.toString()
            
        },
        decreaseTime(state){
            let minutes = parseInt(state.minutes)
            const check = minutes - 25 >= 0 ? minutes -= 25: 0
            state.minutes = check.toString()
        }, 
        changeUpdate(state) {
            state.update = !state.update
        },
        updateMinutes(state) {
            let minutes = parseInt(state.minutes)
            minutes -= 1
            if(minutes <= 9) {
                minutes = `0${minutes}`
            } 
            state.minutes = minutes.toString()
        },
        updateSeconds(state) {
            let seconds = parseInt(state.seconds)
            seconds -= 1
            if(seconds <= 9) {
                seconds = `0${seconds}`
            } 
            state.seconds = seconds.toString()
        },
        resetSeconds(state) {
            state.seconds = '60'
        },
        resetTimer(state) {
            state.minutes = '25'
            state.seconds = '00'
            state.update = false
        },
        changePopupTrigger(state) {
            state.popupTrigger = !state.popupTrigger
        }
    },
  
})

export const { increaseTime, decreaseTime, changeUpdate, updateMinutes, updateSeconds, resetSeconds, resetTimer, 
                changePopupTrigger} = timerSlice.actions
export const selectTimeSection = state => state.timer.time
export const selectSeconds = state => state.timer.seconds
export const selectUpdate = state => state.timer.update

export const selectPopupTrigger = state => state.timer.popupTrigger

let intervalId;

export const startTimer = () => (dispatch, getState) => {
    intervalId = setInterval(() => {
       const minutes = selectTimeSection(getState());
       const seconds = selectSeconds(getState())
       //stop when it reaches 00:00
       if(minutes <= 0 && seconds <= 0)  {
           return (
           clearInterval(intervalId),
           dispatch(changeUpdate())
           )
       }
       //reduce minutes and reset seconds to 59
       if(seconds <= 0){
        dispatch(updateMinutes())
        dispatch(resetSeconds())
       }
       dispatch(updateSeconds())
   },1000)
   
 };
 export const stopTimer = () => (dispatch, getState) => {
    const update = selectUpdate(getState())
    if(update === false) clearInterval(intervalId)
   
 };

export default timerSlice.reducer