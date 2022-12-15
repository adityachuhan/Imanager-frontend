import React,{useState,useContext} from 'react'
import noteContext from '../../contex/notes/noteContext'
const NoteFile = (props) => {
    const{fileinfo} =props
    const fontdecider=(type)=>{
        if(type=="application/pdf"){
            return <i className="fa-regular fa-file-pdf"></i>
        }else if(type=="application/zip"){
            return <i className="fa-regular fa-file-zipper"></i>
        }
    }

    const context = useContext(noteContext)
    const {deleteFile} = context
   const handleDelete = ()=>{
     deleteFile(fileinfo._id)
     window.location.reload();
   }
   
   const [display, setdisplay] = useState('none')
   const mousehover=()=>{
       setdisplay('block')
   }
   const mouseleave = ()=>{
    setdisplay('none')
   }
 
  return (
    <div className='mx-4'>
      <div id='card' className="card filehover my-2" onMouseOut={mouseleave} onMouseOver={mousehover} style={{width: "18rem",backgroundColor:" #adc9c1"}}>
        <a style={{textDecoration:"none",color:"black",cursor:"default"}}  target="_blank" href = {`https://imanager-api-z2gy.onrender.com/api/file/fileview/${fileinfo.filename}`}>
          <div className="card-body">
              <div className='d-flex justify-content-between'>
                {fontdecider(fileinfo.contentType)}
              </div>
              <div>
                {fileinfo.filename}
              </div>
              <div>
                {fileinfo.uploadDate.slice(0,10)}
              </div>
          </div>
        </a>
      <i id="trash" className="fa-solid fa-trash-can "  onClick={handleDelete} style={{cursor:"pointer",margin:' 3px 15px',display:`${display}`}}></i>
      </div>
     </div>
  )
}

export default NoteFile