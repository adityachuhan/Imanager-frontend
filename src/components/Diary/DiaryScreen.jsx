import React,{useContext,useRef,useState}  from 'react'
import noteContext from '../../contex/notes/noteContext'
const DiaryScreen = () => {
    const context = useContext(noteContext)
    const {diaryUpdate,addDiaryNote, currentdiary,setcurrentdiary}=context
    const handleChange = (e)=>{
        setcurrentdiary({
            id:currentdiary.id,
            diaryNote:e.target.value,
            
        })
    }
     
    const [diaryNote, setdiaryNote] = useState("Please write your day's happening")
    const ref = useRef(null)
    const addNewDiary = ()=>{
      ref.current.click()
    }

    const handleNoteChange=(e)=>{
           setdiaryNote(e.target.value)
    }
    const ref1=useRef(null)
    const HandleNoteSubmit = ()=>{
      ref1.current.click()
      addDiaryNote(diaryNote)
      setdiaryNote("Please write your day's happening")
    }

  return (
    <div className="diarydisplay">
    <div className="form-floating container">
     <textarea className="form-control my-3" onChange={handleChange}  value = {currentdiary.diaryNote}  id="floatingTextarea2" style={{height: "74vh"}}></textarea>
    </div>
   <nav className="navbar d-flex justify-content-between navbar-expand-lg bg-light">
      <button type="button" onClick={diaryUpdate} className="btn mx-3 btn-info">Update</button>
      <button type="button" onClick={addNewDiary} className="btn btn-secondary">Add New Diary Note</button>
   </nav>
      <button type="button" ref={ref} className="btn  d-none btn-primary" data-bs-toggle="modal" data-bs-target="#exampleModal">
        Add new Diary
      </button>

      <div className="modal fade" id="exampleModal" tabIndex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
        <div className="modal-dialog">
          <div className="modal-content">
            <div className="modal-header">
              <h1 className="modal-title fs-5" id="exampleModalLabel">Add new Diary</h1>
              <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
            </div>
            <div className="modal-body">
              {/* text area for adding note */}
              <div className="form-floating">
                <textarea className="form-control" onChange={handleNoteChange} value={diaryNote} style={{height: '400px'}} placeholder="Leave a comment here" id="floatingTextarea"></textarea>
              </div>
            </div>
            <div className="modal-footer">
            <button type="button" ref={ref1} className="btn d-none btn-secondary" data-bs-dismiss="modal">Close</button>
              <button type="button" onClick={HandleNoteSubmit} className="btn btn-primary">Add</button>
            </div>
          </div>
        </div>
      </div>
  </div>
  )
}

export default DiaryScreen