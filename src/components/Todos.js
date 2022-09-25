import '../App.css'
import './Todos.css'
import React, { useEffect, useReducer, useRef } from 'react'
import * as CONSTANT from './const'

let indexChange = null
const setIndexChange = () => {
   indexChange = null
}

const setJob = payload => {
   return {
      type: CONSTANT.SETJ,
      payload
   }
}

const addJob = payload => {
   return {
      type: CONSTANT.ADDJ,
      payload
   }
}

const deleteJob = payload => {
   return {
      type: CONSTANT.DELETEJ,
      payload
   }
}

const changeJob = (work, index) => {
   return {
      type: CONSTANT.CHANGEJ,
      work,
      index
   }
}

const doneJob = payload => {
   return {
      type: CONSTANT.DONEJ,
      payload,
   }
}

const valJob = payload => {
   return {
      work: payload,
      isDone: false
   }
}

function reducer(state, action) {
   switch (action.type) {
      case CONSTANT.SETJ:
         return {
            ...state,
            job: action.payload
         }
      case CONSTANT.ADDJ:

         if (action.payload === '') {
            return {
               ...state
            }
         }

         if (indexChange != null) {
            const newJob = {
               work: action.payload,
               isDone: false
            }
            const newJobs = [...state.jobs]
            newJobs.splice(indexChange, 1, newJob)
            return {
               ...state,
               jobs: newJobs
            }
         }

         const newJob = valJob(action.payload)
         return {
            ...state,
            jobs: [newJob, ...state.jobs]
         }
      case CONSTANT.DELETEJ:
         const newJobs = [...state.jobs]
         newJobs.splice(action.payload, 1)
         return {
            ...state,
            jobs: newJobs
         }
      case CONSTANT.CHANGEJ:
         indexChange = action.index
         return {
            ...state,
            job: action.work
         }
      case CONSTANT.DONEJ:
         const done = state.jobs[action.payload].isDone
         const newjob = {
            work: state.jobs[action.payload].work,
            isDone: !done
         }
         const newjobs = [...state.jobs]
         newjobs.splice(action.payload, 1, newjob)
         return {
            ...state,
            jobs: newjobs
         }
      default:
         throw new Error(`Loi...............!`)
   }
}

function Todos() {

   const [state, dispatch] = useReducer(reducer, {
      job: '',
      jobs: []
   })

   const job = state.job
   const jobs = state.jobs

   const inputRef = useRef()

   const handleAddWork = async () => {
      await dispatch(addJob(job))
      await setIndexChange()
      await dispatch(setJob(''))
      inputRef.current.focus()
   }

   const handleChange = (work, index) => {
      dispatch(changeJob(work, index))
   }

   useEffect(() => {
      console.log(state.jobs)
   }, [state.jobs])

   return (
      <div id='todo-scope'>
         <header id='header-todo'>Todos</header>

         <div id='input-scope'>
            <div id='container-input'>
               <input
                  id='input-job'
                  value={job}
                  ref={inputRef}
                  placeholder='Enter yor work'
                  onChange={(e) => dispatch(setJob(e.target.value))}
               />

               <button onClick={handleAddWork}>Add</button></div>
         </div>

         <div id='list-scope'>
            <ul>
               {jobs.map((job, index) => (
                  <li
                     key={index}
                  >
                     <span
                        className={`${job.isDone ? "done" : null} work`}
                     >
                        {job.work}
                     </span>

                     <span
                        className={`m-left btn`}
                        onClick={() => dispatch(doneJob(index))}
                     >
                        <i className="fa-solid fa-check"></i>
                     </span>

                     <span
                        className='m-left btn'
                        onClick={() => handleChange(job.work, index)}
                     >
                        <i className="fa-solid fa-pen"></i>
                     </span>

                     <span
                        className='m-left btn'
                        onClick={() => dispatch(deleteJob(index))}
                     >
                        <i className="fa-solid fa-xmark"></i>
                     </span>
                  </li>
               ))}
            </ul>
         </div>
      </div>
   )
}

export default Todos
