import React,{useContext} from 'react'
import noteContext from '../../contex/notes/noteContext';

const TodayItem = (props) => {
  const {obj} = props
  let status = obj.state
  let colour 
  let bgrndcolour
  if(status == "Not started" ){
    colour = "#c0c0c0"
    bgrndcolour ="#9f9f9f"
      }else if(status == "In Progress"){
        colour = "#b3e4dd"
        bgrndcolour ="#79bfb5"
        // bgrndcolour ="#fd9f09"
      }else if(status == "Done"){
        colour = "#b1f0b4"
        bgrndcolour = "#6fc874"
      }
      const tryjudge = (status)=>{
        if(status == "Not started" ){
           return  <i className="mx-3 fa-solid fa-xmark"></i>
        }else if(status == "In Progress"){
          return  <i className="mx-3 fa-regular fa-clock"></i>
        }else if(status == "Done"){
          return <i className="mx-3 fa-solid fa-check-double"></i>
        }
      }
      
      const context = useContext(noteContext)
      const { DeleteTodo,updateTodo} = context;


      const handleClick =(state)=>{
             console.log( state+"this state is confirmed in the todo list "+obj._id)
      }
      // Update Todo
      // const handleSelectModal = (state)=>{
      //   console.log(obj._id)
      //   // updateTodo(state,obj._id)
      //   // updateTodo(state,obj._id)
      // }
     
      const handleProgressTodo = ()=>{
        updateTodo('In Progress',obj._id)
      }
      const handleDoneTodo = ()=>{
        updateTodo('Done',obj._id)
      }
      const handleNotTodo = ()=>{
        updateTodo('Not started',obj._id)
      }
      const handleDeleteTodo = ()=>{
        DeleteTodo(obj._id)
      }
  return (
    <>
     <div style={{backgroundColor:colour}} className="todoitem flex">
        <div className=" work">
            {tryjudge(status)}
            {obj.work}
        </div>
        <div className="flex info">
            {obj.state}
            <div className=" d-flex date">
            <i onClick = {handleNotTodo} style={{cursor:"pointer"}} className="mx-2 fa-solid fa-xmark"></i>
            <i onClick = {handleProgressTodo} style={{cursor:"pointer"}} className="mx-2 fa-solid fa-pen-nib"></i>
            <i onClick = {handleDoneTodo} style={{cursor:"pointer"}} className="fa-solid fa-check mx-2"></i>
            <i onClick = {handleDeleteTodo} style={{cursor:"pointer"}} className=" mx-2 fa-solid fa-trash"></i>
            </div>
        </div>
    </div>
    </>
  )
}

export default TodayItem