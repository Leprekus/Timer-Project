import tasksReducer, {
    addTask
  } from './taskSlice';
  import { v4 as uuidv4 } from "uuid";
  
  describe('tasks reducer', () => {
    const initialState = {};
    it('should handle initial state', () => {
      expect(tasksReducer(undefined, { type: 'unknown' })).toEqual({
        "tasks": {},
        });
    it('should add new tasks', () => {

    })
    });
  
  });
  