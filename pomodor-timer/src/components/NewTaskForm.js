import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { stringify, v4 as uuidv4 } from "uuid";

import { addTask, editTask, saveChanges, selectTaskToEdit } from "../features/task/taskSlice";

export const NewTaskForm = (props) => { 
   const [title, setTitle] = useState('')
   const [description, setDescription] = useState('')
   
    const dispatch = useDispatch()
    const taskToEdit = useSelector(selectTaskToEdit)
    useEffect(()=>{
        if(props.taskId) {
            setTitle(props.title)
            setDescription(props.description)
        }
    
        console.log(taskToEdit)
    },[props.taskId, props.title, props.description, taskToEdit])
    

    const handleForm = ( e ) => {
        e.preventDefault()
    
        dispatch(addTask({
            id: uuidv4(),
            title,
            description,
        }))

        //cleanup
        setTitle('')
        setDescription('')
    
    }

    const handleSaveChanges = ( e ) => {
        e.preventDefault()
        dispatch(saveChanges({
            id: taskToEdit.id,
            title,
            description,
        }))
        dispatch(editTask({}))
        
    }

    return (
    <form onSubmit={taskToEdit.id ? handleSaveChanges : handleForm} className="task">
            <button className="taskButton">{taskToEdit.id ? 'save' : '+' }</button>
            <div className="taskContainer">
                <input onChange={({ target }) => setTitle(target.value)} className="fields" placeholder='Title' value={title}/>
                <textarea onChange={({ target }) => setDescription(target.value)} className="fields" placeholder='Notes...' value={description}></textarea>
            </div>
        </form>
        )
}