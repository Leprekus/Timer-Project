import tasksReducer, {
    addTask, editTask, saveChanges
  } from './taskSlice';
  import { v4 as uuidv4 } from "uuid";
  
  describe('tasks reducer', () => {
    const initialState = {
      "tasks": {},
      "taskToEdit": {},
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
    it('should edit task', () => {

      const newTask = {
        id: 123,
        title: 'Test Title',
        description: 'Test Description'
      }

      const editedTask = {
        id: 123,
        title: 'This task was edited',
        description: 'Nothing to see here'
      }
      tasksReducer(initialState, addTask(newTask));
      tasksReducer(initialState, editTask(editedTask))
      
      const actual = tasksReducer(initialState, saveChanges(editedTask))
      expect(actual.tasks[123]).toEqual({
        id: 123,
        title: 'This task was edited',
        description: 'Nothing to see here'
      });
      
    });

    it('should leave task to edit as empty object', () => {
      const newTask = {
        id: 123,
        title: 'Test Title',
        description: 'Test Description'
      }
  
      const editedTask = {
        id: 123,
        title: 'This task was edited',
        description: 'Nothing to see here'
      }
      tasksReducer(initialState, addTask(newTask));
      tasksReducer(initialState, editTask(editedTask))
      tasksReducer(initialState, saveChanges(editedTask))
      const actual = tasksReducer(initialState, editTask({}))
      expect(actual.taskToEdit).toEqual({})


    })
  
  });

  
  