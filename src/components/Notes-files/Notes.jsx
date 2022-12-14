import React from 'react'
import { useContext,useEffect } from 'react'
import noteContext from '../../contex/notes/noteContext'
import NoteFile from './NoteFile'
import axios from 'axios'

const Notes = () => {

  const authtoken = localStorage.getItem("token")
  let user= false
   if(authtoken){
    user = true
   }
  
   const context = useContext(noteContext)
   const {file,fetchfileinfo} = context
   useEffect(() => {
    fetchfileinfo()
      // eslint-disable-next-line
    }, [])
    const UploadFileClick= async(e)=>{
      e.preventDefault();
     const uploadfile = document.getElementById('file').files[0];
     const filedata = new FormData()
     filedata.append('file',uploadfile)
    console.log(uploadfile)
    const reaponse = await axios({
      url:'http://localhost:5000/api/file/addfile',
      method:"POST",
      headers:{
        'Content-Type': 'application/json',
            'auth-token':authtoken
      }
    })
   }
   if(user){
    
  return (
    <>
    <div className="container d-flex flex-wrap ">
    {file.map((e)=>{
       return(<NoteFile key = {e._id} fileinfo = {e}/>)
    })}
    </div>
    <div className="addfile">
      <button type="button" className="btn add btn-primary" data-bs-toggle="modal" data-bs-target="#exampleModal">
        Add new file
      </button>

      <div className="modal fade" id="exampleModal" tabIndex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
        <div className="modal-dialog">
          <div className="modal-content">
            <div className="modal-header">
              <h1 className="modal-title fs-5" id="exampleModalLabel">Add new file</h1>
              <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
            </div>
            <div className="modal-body">
              <form method="post" action= {`http://localhost:5000/api/file/addfile/${authtoken}`}  id="formFile"  encType="multipart/form-data">
                <input type="file" name="file" id="file"/>
                <input className="my-2"  type="submit" value="submit"/>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
    </>
  )
}else{
  return(
    <>
       please login or sinup
    </>
  )
}

}

export default Notes