import React ,{useContext} from 'react'
import noteContext from '../../contex/notes/noteContext'

const Diarybutton = (props) => {
    const {note} = props
    const context = useContext(noteContext)
    const {setcurrentdiary,deleteDiary}=context
   const handleClick=()=>{
         setcurrentdiary({
            diaryNote: note.diaryNote,
            id:note._id
         })
   }

   const handleDeleteClick = ()=>{
    deleteDiary(note._id)
   }
  return (
    <div className='lifthover '>
        <div className='fs-5  d-flex justify-content-between px-3 py-1' onClick={handleClick} style={{background: '#416262', border: "white solid",color: 'white',boxShadow:"2px 2px #a39797"}}>
           <span>{note.date.slice(0,10)} </span> 
           <i className="fa-solid fa-trash-can" onClick={handleDeleteClick} style={{cursor:"pointer"}}></i>
           </div>
    </div>
  )
}

export default Diarybutton