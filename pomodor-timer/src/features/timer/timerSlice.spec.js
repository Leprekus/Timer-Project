import timerReducer, { 
    increaseTime,
    decreaseTime,
    startTimer
} from './timerSlice' 

describe('timer reducer', () => {
    const initialState = {
        value: 25,
        update: false
    }
    it('should handle initial state', () => {
        expect(timerReducer(undefined, { type: 'unknown' })).toEqual({
            value: 25,
            update: false,
          });
    })
    it('should handle increment', () => {
        const actual = timerReducer(initialState, increaseTime());
        expect(actual.value).toEqual(50);
      });
    it('should handle decrement', () => {
    const actual = timerReducer(initialState, decreaseTime());
    expect(actual.value).toEqual(0);
    });

    it('should not go below 0', () => {
        const edgeCaseState = {
            value: 0,
            isActive: false
        }
        const actual = timerReducer(edgeCaseState, decreaseTime());
        expect(actual.value).toEqual(0);
        });
        it('should update time', () => {
            const edgeCaseState = {
                value: 0,
                isActive: false
            }
            const actual = timerReducer(edgeCaseState, decreaseTime());
            expect(actual.value).toEqual(0);
            });
})