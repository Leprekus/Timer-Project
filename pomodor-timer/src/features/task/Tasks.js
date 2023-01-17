import React, { useState } from "react"
import './task.css'
import { useSelector } from "react-redux"
import { selectTasks, selectTaskToEdit } from "./taskSlice"

import { Task } from "./Task"
import { NewTaskForm } from '../../components/NewTaskForm'
export const Tasks = () => {

    const taskToEdit = useSelector(selectTaskToEdit)
    const tasks = useSelector(selectTasks);//replace with useSelector(selectTasks)
   

    return ( 
        <>
        {Object.values(tasks).map(task =>{ 
        if(taskToEdit.id === task.id) return (
            <li className="task"key={task.id}>
            <NewTaskForm title={task.title} description={task.description} taskId={task.id}/>     
            </li>
        )
        return (
            <li className="task"key={task.id}>
            <Task  id={task.id} title={task.title} description={task.description}/>     
            </li>
        )})} 
        <NewTaskForm/>
        </>
     )
}
