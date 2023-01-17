import React, { useState } from "react"
import { useDispatch, useSelector } from "react-redux"
import { editTask, selectTasks } from "./taskSlice"

export const Task = ({ id, title, description }) => {

    const dispatch = useDispatch()
    const tasks = useSelector(selectTasks)
    const task = tasks[id]
   
    const handleEditTask = () => {
        //set task state to current's 
       dispatch(editTask(task))
    }

    return (
        <>
        <button className="taskButton" onClick={handleEditTask}>edit</button>
        <div className="taskContainer">
            <h3>{title}</h3>
            <p>{description}</p>
        </div>
        </>
    )}