import timerReducer, { 
    increaseTime,
    decreaseTime,
    startTimer,
    updateMinutes,
    updateSeconds,
    changeUpdate,
    resetSeconds,
    resetTimer,
    changePopupTrigger
} from './timerSlice' 

describe('timer reducer', () => {
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

    const stateAtZero = {
        minutes: '25',
        seconds: '00',
        time: {
            pomodoro: {
                minutes: '00',
                seconds: '00'
            },
            shortBreak: {
                minutes: '00',
                seconds: '00'
            },
            longBreak: {
                minutes: '00',
                seconds: '00'
            }
        },
        update: false,
        popupTrigger: false
    }

    const stateStartingMinute = {
        minutes: '25',
        seconds: '59',
        time: {
            pomodoro: {
                minutes: '25',
                seconds: '59'
            },
            shortBreak: {
                minutes: '5',
                seconds: '59'
            },
            longBreak: {
                minutes: '15',
                seconds: '59'
            }
        },
        update: false,
        popupTrigger: false
    }
    it('should handle initial state', () => {
        expect(timerReducer(undefined, { type: 'unknown' })).toEqual({
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
        });
    })
    it('should change popup trigger', () => {
        const actual = timerReducer(initialState, changePopupTrigger());
        expect(actual.popupTrigger).toEqual(true)
    })

    it('should change update to true', () => {
        const actualIsTrue = timerReducer(initialState, changeUpdate())
        expect(actualIsTrue.update).toEqual(true)
    })
    it('should handle pomodoro time increment', () => {
        const actual = timerReducer(initialState, increaseTime({ section: 'pomodoro'}));
        expect(actual.time.pomodoro.minutes).toEqual('50');
      });
    it('should handle pomodoro time decrement', () => {
    const actual = timerReducer(initialState, decreaseTime({ section: 'pomodoro'}));
    expect(actual.time.pomodoro.minutes).toEqual('0');
    });

    it('pomodoro minutes should not go below 0', () => {
        const actual = timerReducer(stateAtZero, decreaseTime({ section: 'pomodoro'}));
        expect(actual.time.pomodoro.minutes).toEqual('0');
        });
    it('should update pomodoro minutes', () => {
        
        const actual = timerReducer(initialState, updateMinutes({ section: 'pomodoro' }));
        expect(actual.time.pomodoro.minutes).toEqual('24');
        });

    it('should update pomodoro seconds', () => {
        const actual = timerReducer(stateStartingMinute, updateSeconds({ section: 'pomodoro' }));
        expect(actual.time.pomodoro.seconds).toEqual('58');
        });

    it('should reset pomodoro seconds', () => {
        const actual = timerReducer(initialState, resetSeconds({section: 'pomodoro'}))
        expect(actual.time.pomodoro.seconds).toEqual('60')
    })
    it('should reset pomodoro timer', () => {
    
        const actual = timerReducer(stateStartingMinute, resetTimer({ section: 'pomodoro'}))
        expect(actual.time.pomodoro).toEqual({
            minutes: '25',
            seconds: '00'
        })
        
    })

    


        it('should handle short break time increment', () => {
            const actual = timerReducer(initialState, increaseTime({ section: 'pomodoro'}));
            expect(actual.time.pomodoro.minutes).toEqual('50');
          });
        // it('should handle pomodoro time decrement', () => {
        // const actual = timerReducer(initialState, decreaseTime({ section: 'pomodoro'}));
        // expect(actual.time.pomodoro.minutes).toEqual('0');
        // });
    
        // it('pomodoro minutes should not go below 0', () => {
        //     const actual = timerReducer(stateAtZero, decreaseTime({ section: 'pomodoro'}));
        //     expect(actual.time.pomodoro.minutes).toEqual('0');
        //     });
        // it('should update pomodoro minutes', () => {
            
        //     const actual = timerReducer(initialState, updateMinutes({ section: 'pomodoro' }));
        //     expect(actual.time.pomodoro.minutes).toEqual('24');
        //     });
    
        // it('should update pomodoro seconds', () => {
        //     const actual = timerReducer(stateStartingMinute, updateSeconds({ section: 'pomodoro' }));
        //     expect(actual.time.pomodoro.seconds).toEqual('58');
        //     });
    
})