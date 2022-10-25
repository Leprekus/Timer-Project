import tasksReducer, {
    addTask
  } from './taskSlice';
  import { v4 as uuidv4 } from "uuid";
  
  describe('tasks reducer', () => {
    const initialState = {
      "tasks": {},
      };
    it('should handle initial state', () => {
      expect(tasksReducer(undefined, { type: 'unknown' })).toEqual(initialState);
    })
    it('should add task', () => {

      const newTask = {
        id: 123,
        title: 'Test Title',
        description: 'Test Description'
      }
      const actual = tasksReducer(initialState, addTask(newTask));
      expect(actual.tasks).toEqual({ 123: newTask });
    });
  
  });
  