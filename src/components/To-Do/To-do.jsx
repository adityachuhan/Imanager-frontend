import React, { useContext ,useRef , useState,useEffect } from 'react'
import noteContext from '../../contex/notes/noteContext';
import Todayitem from './Todayitem';


const Todo = () => {
  const authtoken = localStorage.getItem("token")
let user= false
 if(authtoken){
  user = true
 }

  const context = useContext(noteContext)
  const {fetchTodo,AddTodo,maindata} = context;
//  need to set the date
const [Todo, setTodo] = useState({work:" ",date:"2022-12-16"})
const onChange = (e)=>{
  setTodo({...Todo, [e.target.name]: e.target.value})
}
const ref = useRef(null)
// iteration to stop previous date todos
const handleClick = (e)=>{
  e.preventDefault();
  AddTodo(Todo)
  setTodo({work:" "})
  ref.current.click()
}

useEffect(() => {
  fetchTodo()
    // eslint-disable-next-line
  }, [])
  if(user){
  return (

    <div style={{margin:"16px"}}>
      <div style={{margin:"6px 0px"}}>
       <h2 className={`text-center ${(maindata.todaytodo.length === 0 )? "d-none":" "} my-4`}>Today</h2>
       {maindata.todaytodo.map((l)=>{
        return <Todayitem key={l._id} obj = {l}/>
       })}
      </div>
      
      <div style={{margin:"6px 0px"}}>
      <h2 className={`text-center ${(maindata.tommorowtodo.length === 0 )? "d-none":" "} my-4`}>Tommorow</h2>
       {maindata.tommorowtodo.map((e)=>{
        return <Todayitem key={e._id} obj = {e}/>
       })}
      </div>

      <div style={{margin:"6px 0px"}}>
      <h2 className={`text-center ${(maindata.extratodo.length === 0 )? "d-none":" "} my-4`}>Upcoming Todos</h2>
       {maindata.extratodo.map((k)=>{
        return <Todayitem key={k._id} obj = {k}/>
       })}
      </div>
      {/* modal starts here for creating todo */}
        <button type="button" className="btn add btn-primary" data-bs-toggle="modal" data-bs-target="#exampleModal">
        Add New To-Do
        </button>

        <div className="modal fade" id="exampleModal" tabIndex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
          <div className="modal-dialog">
            <div className="modal-content">
              <div className="modal-header">
                <h1 className="modal-title fs-5" id="exampleModalLabel">Add new To-Do</h1>
                <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
              </div>
              <div className="modal-body">
                <form>
                  <div className="mb-3">
                    <label htmlFor="exampleInputEmail1" className="form-label">Work</label>
                    <input type="text" name='work' value = {Todo.work} className="form-control"onChange={onChange} id="exampleInputEmail1" aria-describedby="emailHelp"/>
                  </div>
                  <div className="mb-3">
                    <label htmlFor="exampleInputDate" className="form-label">Date</label>
                    <input type="date" name='date' value = {Todo.date} className="form-control"onChange={onChange} id="exampleInputDate"/>
                  </div>
                  <button type="submit" onClick = {handleClick} className="btn btn-primary">Submit</button>   
                </form>
              </div>
              <div className="modal-footer">
                <button type="button" ref = {ref} className="btn d-none btn-secondary" data-bs-dismiss="modal">Close</button>
              </div>
            </div>
          </div>
        </div>
       
    </div>
  )
      }
      else{
        return(
          <>
          please log in or sign up
          </>
        )
      }
}

export default Todo