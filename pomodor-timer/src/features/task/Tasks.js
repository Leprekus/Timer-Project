import React, { useState } from "react"
import './task.css'
import { useDispatch, useSelector } from "react-redux"
import { addTask, selectTasks } from "./taskSlice"
import { v4 as uuidv4 } from "uuid";
import { isAsyncThunkAction } from "@reduxjs/toolkit";
export const Tasks = () => {
    const [taskId, setTaskId] = useState(uuidv4())
    const tasks = useSelector(selectTasks);//replace with useSelector(selectTasks)
    const dispatch = useDispatch()
    console.log(tasks)
    const handleCreateTask = () => {
        setTaskId(uuidv4())
        const taskObject = {
            title: '',
            description: '',
            id: taskId,
        }
        dispatch(addTask(taskObject))
    }

    return ( 
        <>
        {Object.values(tasks).map(task => (
            <li className="task" key={task.id}>
                <button onClick={handleCreateTask} className="taskButton edit"> edit </button>
                <div className="taskContainer">
                    <h3>{task.title}</h3>
                    <p>{task.description}</p>
                </div>
            </li>
        ))}
        <li className="task">
            <button onClick={handleCreateTask} className="taskButton add"> + </button>
            <div className="taskContainer"></div>
        </li>
        </>
     )
}