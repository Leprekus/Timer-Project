import timerReducer, { 
    increaseTime,
    decreaseTime,
    startTimer,
    updateMinutes,
    updateSeconds
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
    it('should handle increment', () => {
        const actual = timerReducer(initialState, increaseTime());
        expect(actual.minutes).toEqual('50');
      });
    it('should handle decrement', () => {
    const actual = timerReducer(initialState, decreaseTime());
    expect(actual.minutes).toEqual('0');
    });

    it('minutes should not go below 0', () => {
        const state = {
            minutes: '00',
            seconds: '00',
            update: false,
            popupTrigger: false
        }
        const actual = timerReducer(state, decreaseTime());
        expect(actual.minutes).toEqual('0');
        });
        it('should update minutes', () => {
            
            const actual = timerReducer(initialState, updateMinutes());
            expect(actual.minutes).toEqual('24');
            });
        it('should update seconds', () => {
            const state = {
                minutes: '25',
                seconds: '25',
                update: false,
                popupTrigger: false
            }
            const actual = timerReducer(state, updateSeconds());
            expect(actual.seconds).toEqual('24');
            });
})